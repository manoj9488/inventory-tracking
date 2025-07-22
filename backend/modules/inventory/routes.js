const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { verifyToken } = require('../../middlewares/auth.middleware');


router.post('/', verifyToken, controller.createItem);
router.get('/', verifyToken, controller.getAllItems);
router.get('/:id', verifyToken, controller.getItemById);
router.put('/:id', verifyToken, controller.updateItem);
router.delete('/:id', verifyToken, controller.deleteItem);

module.exports = router;
