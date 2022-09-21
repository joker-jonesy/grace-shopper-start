const router = require('express').Router()
const {User} = require('../db')

router.post('/', async (req,res,next)=>{
    try{
        const newUser = await User.create(req.body)
        res.status(201).send(newUser)
    }catch(ex){next(ex)}
})

module.exports = router