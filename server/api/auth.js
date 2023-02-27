const router = require('express').Router()
const {User, Order, LineItem, Product} = require('../db')

const requireToken = async(req,res,next)=>{
    try{
        const token = await req.headers.authorization
        const user = await User.byToken(token)
        req.user = user
        next()
    }catch(error){next(error)}
}

router.post('/', async (req,res,next)=>{
    try{
        const user = await User.authenticate(req.body)
        if(!user) res.sendStatus(404)
        const token = await user.generateToken()
        res.send(token)
    }catch(ex){next(ex)}
})

router.get('/', requireToken, async(req,res,next)=>{
    if(req.user){
        res.send(req.user)
    }else{
        res.send('not a valid login')
    }
})

router.get(`/:id/user`, requireToken, async(req,res,next)=>{
    try {
        const user = await User.findByPk(req.params.id,{
            include: [
                {model: Order, include:[{model:LineItem, include: Product
                }]}
            ]
        })
        res.send(user)
    }catch(error){next(error)}
})

router.put('/:id', requireToken, async(req,res,next)=>{
    try{
        const user = await User.findByPk(req.params.id)
        await user.update(req.body)
        const updatedUser = await User.findByPk(req.params.id)
        res.send(updatedUser)
    }catch(error){next(error)}
})

router.put('/:id/changePassword', async(req,res,next)=>{
    try{
        let credentials = {username: req.body.username, password: req.body.currentPassword}
        const user = await User.authenticate(credentials)
        const updatedUser = await user.update({password:req.body.password})
        res.send(updatedUser)

    }catch(error){next(error)}
})

module.exports = router
