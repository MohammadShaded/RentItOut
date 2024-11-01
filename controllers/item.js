import  {addItem}  from "../models/item.js";

export const createItem = async (request, response) => {
  try {
    const item = request.body;
    await addItem(item);
    response.status(201).json(item);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};
