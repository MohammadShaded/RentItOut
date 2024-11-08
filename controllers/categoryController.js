import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getItemsBasedOnCategory,
  getCategoryBasedOnName,
} from "../models/category.js";

export const createCategoryController = async (request, response) => {
  try {
    const role = request.user.role;
    if (role === "Admin") {
      const category = request.body;
      const res = await createCategory(category);
      if (res === "already exist")
        response.status(409).json({ message: "Category already exists" });
      else response.status(201).json({ message: "Added successfully" });
    } else response.status(403).json({ message: "Forbidden Access" });
  } catch (error) {
    response.status(500).json({ message: error.message });
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
    const role = request.user.role;
    if (role === "Admin") {
      const id = request.params.id;
      const updatedCategory = request.body;
      const res = await getCategory(id);
      if (!res) response.status(404).json({ message: "Category not found" });
      else {
        await updateCategory(id, updatedCategory);
        response.json({ message: "Category updated successfully" });
      }
    } else response.status(403).json({ message: "Forbidden Access" });
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
};
export const deleteCategoryController = async (request, response) => {
  try {
    const role = request.user.role;
    if (role === "Admin") {
      const id = request.params.id;
      const res = await getCategory(id);
      if (!res) response.status(404).json({ message: "Category not found" });
      else {
        await deleteCategory(id);
        response.json({ message: "Category deleted successfully" });
      }
    } else response.status(403).json({ message: "Forbidden Access" });
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
};

export const getItemsBasedOnCategoryController = async (request, response) => {
  try {
    const categoryId = request.params.categoryId;
    const items = await getItemsBasedOnCategory(categoryId);
    if (!items) response.status(404).json({ message: "Items not found" });
    else response.status(200).json(items);
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
};

export const getCategoryBasedOnNameController = async (request, response) => {
  try {
    const name = request.query.categoryName;
    const category = await getCategoryBasedOnName(name);
    if (!category) response.status(404).json({ message: "Category not found" });
    else response.status(200).json(category);
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
};
