const Router = require('express');
const router = new Router();
const personController = require('../controller/person.controller');

router.post('/registrate', personController.registratePerson);
router.get('/authorize', personController.authorizePerson);

module.exports = router;