import database from "../config/db.js";
import { v4 as uuid } from "uuid";

export async function addItem(item) {
  const id = uuid();
  try {
    const [rows] = await database.query(
      `insert into Item (item_id,owner_id,title,description,category_id,price_per_day,deposit,location_id,status,damage_protection_required,
        rating) values (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        id,
        item.owner_id,
        item.title,
        item.description,
        item.category_id,
        item.price_per_day,
        item.deposit,
        item.location_id,
        item.status,
        item.damage_protection_required,
        item.rating,
      ]
    );
  } catch (error) {
    throw error;
  }
}

export async function getItem(id) {
  try {
    const [rows] = await database.query("select * from Item where item_id =?", [
      id,
    ]);
    if (!rows[0]) {
      throw new Error("Item not found");
    }
    return rows[0];
  } catch (error) {
    throw error;
  }
}

export async function updateItem(id, updatedItem,owner_id) {
  try {
    const [rows] = await database.query(
      `UPDATE Item SET  title = ?, description = ?, category_id = ?, price_per_day = ?
      , deposit = ?, location_id = ?, status = ?, damage_protection_required = ?, rating = ? 
      WHERE item_id = ? and owner_id = ?`,
      [
        updatedItem.title,
        updatedItem.description,
        updatedItem.category_id,
        updatedItem.price_per_day,
        updatedItem.deposit,
        updatedItem.location_id,
        updatedItem.status,
        updatedItem.damage_protection_required,
        updatedItem.rating,
        id,
       owner_id
      ]
    );
    if (rows.affectedRows == 0) {
      throw new Error("Item not found or no changes were made");
    }
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteItem(id,owner_id) {
  try {
    console.log(id);
    console.log(owner_id);
    const [rows] = await database.query(
      "UPDATE Item SET status= 'rented' WHERE item_id = ? and owner_id=?",
      [id,owner_id]
    );
    if (rows.affectedRows == 0) {
      throw new Error("Item not found");
    }
  } catch (err) {
    throw err;
  }
}
export async function filterItems(items) {}
export async function getItems({ category_id, price_min, price_max, status }) {
  try {
    let query = "SELECT * FROM Item WHERE 1=1";
    const queryParams = [];

    if (category_id) {
      query += " AND category_id = ?";
      queryParams.push(category_id);
    }

    if (price_min !== undefined) {
      query += " AND price_per_day >= ?";
      queryParams.push(price_min);
    }

    if (price_max !== undefined) {
      query += " AND price_per_day <= ?";
      queryParams.push(price_max);
    }

    if (status !== undefined) {
      query += " AND status = ?";
      queryParams.push(status);
    }
    const [rows] = await database.query(query, queryParams);
    return rows;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

export async function getTrendingItems() {
  try {
    const [rows] = await database.query(
      `SELECT * FROM Item 
     WHERE status = 'available' 
     ORDER BY rating DESC 
     LIMIT 10`
    );

    if (!rows) {
      throw new Error("No trending items found");
    }
    return rows;
  } catch (error) {
    throw new Error("Error fetching trending items:", error);
  }
}
