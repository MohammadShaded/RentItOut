import database from "../config/db.js";
import { v4 as uuid } from "uuid";

export async function createCategory(category) {
  const id = uuid();
  try {
    if (await existCategory(category.name)) {
      return "already exist";
    }
    const [rows] = await database.query(
      `INSERT INTO Category (category_id, name, description) VALUES (?, ?, ?)`,
      [id, category.name, category.description]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
}

export async function existCategory(name) {
  try {
    const [rows] = await database.query(
      `SELECT * FROM Category WHERE name = ?`,
      [name]
    );
    return rows.length > 0 ? true : false;
  } catch (error) {
    throw error;
  }
}
export async function getCategories() {
    try {
      const [rows] = await database.query("SELECT * FROM Category");
      return rows;
    } catch (error) {
      throw error;
    }
}

export async function getCategory(id) {
    try {
      const [rows] = await database.query(
        `SELECT * FROM Category WHERE category_id =?`,
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
}
