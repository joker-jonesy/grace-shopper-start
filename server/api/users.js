const router = require('express').Router();
const { Order, User, LineItem, Product } = require('../db');

const requireToken = async(req,res,next)=>{
    try{
        const token = await req.headers.authorization
        const user = await User.byToken(token)
        req.user = user
        next()
    }catch(error){next(error)}
}

router.get('/', requireToken, async (req,res,next)=>{
    try{
        const users = await User.findAll({
            include: [
                {model: Order, include:[{model:LineItem, include: Product
                }]}
            ]
        })
    res.send(users)

    }catch(error){next(error)}
})

router.delete('/:id', requireToken, async (req,res,next)=>{
    try{
        const user = await User.findByPk((req.params.id))
        await user.destroy()
        res.send(user)
    }catch(error){next(error)}
})

module.exports = router