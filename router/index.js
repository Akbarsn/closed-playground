const router = require('express').Router()
const User = require('../model/user')

router.get('/user', async (req, res) => {
    const users = await User.find()
    res.send(users)
})

router.post('/user', async(req,res)=>{
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    await user.save()
    res.send(user)
})

module.exports = router