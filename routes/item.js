import express from 'express';
const router = express.Router();
import {createItem} from '../controllers/item.js';


router.post('/',createItem);
// router.get('/:id', getItem);
// router.put('/:id', itemController.updateItem);
// router.delete('/:id', itemController.deleteItem);
// router.get('/items', itemController.filterItems);

export default router;