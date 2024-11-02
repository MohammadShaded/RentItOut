import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getItemsBasedOnCategory,
} from "../models/category.js";

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

export const getCategoriesController = async (request, response) => {
  try {
    const categories = await getCategories();
    response.json(categories);
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
};
export const getCategoryController = async (request, response) => {
  try {
    const id = request.params.id;
    const category = await getCategory(id);
    if (!category) response.status(404).json({ message: "Category not found" });
    else response.json(category);
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
};

export const updateCategoryController = async (request, response) => {
  try {
    const id = request.params.id;
    const updatedCategory = request.body;
    const res = await getCategory(id);
    if (!res) response.status(404).json({ message: "Category not found" });
    else {
      await updateCategory(id, updatedCategory);
      response.json({ message: "Category updated successfully" });
    }
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
};
export const deleteCategoryController = async (request, response) => {
  try {
    const id = request.params.id;
    const res = await getCategory(id);
    if (!res) response.status(404).json({ message: "Category not found" });
    else {
      await deleteCategory(id);
      response.json({ message: "Category deleted successfully" });
    }
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
};

export const getItemsBasedOnCategoryController = async (request, response) => {
try{
    const categoryId = request.params.categoryId;
    const items = await getItemsBasedOnCategory(categoryId);
    if (!items) response.status(404).json({ message: "Items not found" });
    else response.status(200).json(items);
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
}

}