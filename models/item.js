import database from "../config/database.js";
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
}catch (error) {
  throw error;
}
}

export async function getItem(id) {
  const [rows] = await database.query("select * from Item where item_id =?", [id]);
  return rows[0];
}