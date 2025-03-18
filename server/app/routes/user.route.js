module.exports = app => {
    const user = require('../controllers/user.controller.js')
    const router = require('express').Router()

    router.get('/', user.findAll)
    router.post('/', user.create)
    router.post('/login', user.auth)
    router.get('/find/:username', user.findOne)
    router.post('/logout', user.logout)
    router.get('/waiting-mechanics', user.getWaitingMechanics)
    router.put('/update-status', user.updateStatus)

    app.use('/api/user', router)
}
