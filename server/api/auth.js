const router = require('express').Router()
const {User} = require('../db')

const requireToken = async(req,res,next)=>{
    try{
        const token = await req.header.authorization
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

