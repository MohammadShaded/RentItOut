import  {addItem}  from "../models/item.js";

export const createItem = (request, response) => {
  try {
    const item = request.body;
    addItem(item);
    response.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
