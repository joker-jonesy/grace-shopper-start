const router = require('express').Router()
const {User, Order, LineItem} = require('../db')

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
                {model: Order, include:LineItem}
            ]
        })
        res.send(user)
    }catch(error){next(error)}
})

module.exports = router
