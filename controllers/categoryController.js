import { createCategory } from "../models/category.js";

export const createCategoryController = async (request, response) => {
  try {
    const category = request.body;
    const res = await createCategory(category);
    if (res === "already exist")
      response.status(409).json({ message: "Category already exists" });
    else response.status(201).json(res);
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
};
