import express from 'express';
const router = express.Router();
import {createItemController,getItemController,updateItemController,deleteItemController,filterItemsController} from '../controllers/itemController.js';

router.get('/filter', filterItemsController);
router.post('/',createItemController);
router.get('/:id', getItemController);
router.put('/:id', updateItemController);
router.delete('/:id',deleteItemController);


export default router;