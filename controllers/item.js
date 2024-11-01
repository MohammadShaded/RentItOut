import { addItem, getItem, updateItem, deleteItem } from "../models/item.js";

export const createItemController = async (request, response) => {
  try {
    const item = request.body;
    await addItem(item);
    response.status(201).json(item);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

export const getItemController = async (request, response) => {
  try {
    const itemId = request.params.id;
    const item = await getItem(itemId);
    response.status(200).json(item);
  } catch (error) {
    response.status(404).json({ message: "Item not found" });
  }
};

export const updateItemController = async (request, response) => {
  try {
    const itemId = request.params.id;
    const updatedItem = request.body;
    await updateItem(itemId, updatedItem);
    response.status(200).json(updatedItem);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

export const deleteItemController = async (request, response) => {
  try {
    const itemId = request.params.id;
    await deleteItem(itemId);
    response.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};
