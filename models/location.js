import database from "../config/db.js";
import { v4 as uuid } from "uuid";



export async function getLocations(id) {
 try{
    const [rows] = await database.query(
     `SELECT * from Location where location_id=?`,
     [id]
   );
   return rows[0];
 }catch(err) {
   console.error(err);
   throw err;
 }

}

export async function createLocation(location) {
  try {
    const [rows] = await database.query(
      `INSERT INTO Location (location_id, city, latitude, longitude) VALUES (?, ?, ?, ?)`,
      [uuid(), location.city, location.latitude, location.longitude]
    );

  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateLocation(location_id, location) {
try{
  const [rows] = await database.query(
    `UPDATE Location SET city=?, latitude=?, longitude=? WHERE location_id=?`,
    [location.city, location.latitude, location.longitude, location_id]
  );
  return rows[0];
}catch(error){
  throw error;
}
}
export async function deleteLocation(locationId) {
  try {
    const rows = await database.query(
      `DELETE FROM Location WHERE location_id=?`,
      [locationId]
    );
   return rows;
  } catch (error) {
    throw error;
  }
}

export async function getLocationDetails(id) {
  const details=await database.query(
    "SELECT latitude, longitude FROM Location WHERE location_id = ?",
    [id]
  );
  return details;
}