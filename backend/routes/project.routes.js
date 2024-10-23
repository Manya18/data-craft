const Router = require('express');
const router = new Router();
const projectController = require('../controller/project.controller');

router.get('/project/:id', projectController.getProject);

module.exports = router;