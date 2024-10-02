const express = require('express');
const router = express.Router();

const formIntakeController = new (require('./../Controllers/form'))();

router.route('/list').get(formIntakeController.list);
router.route('/details').post(formIntakeController.details);
router.route('/form').post(formIntakeController.add);
module.exports = router
