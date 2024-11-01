import express from 'express';
const router = express.Router();
import {createItemController,getItemController,updateItemController,deleteItemController} from '../controllers/item.js';


router.post('/',createItemController);
router.get('/:id', getItemController);
router.put('/:id', updateItemController);
router.delete('/:id',deleteItemController);
//  router.get('/filter', filterItems);

export default router;