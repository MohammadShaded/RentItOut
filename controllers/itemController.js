import {
  addItem,
  getItem,
  updateItem,
  deleteItem,
  getItems,
  getTrendingItems,
} from "../models/item.js";
import database from "../config/db.js";
import axios from "axios";
import { getLocationDetails } from "../models/location.js";

export const createItemController = async (request, response) => {
  try {
    const role = request.user.role;
    if (role == "Owner") {
      const item = request.body;
      await addItem(item);
      response.status(201).json(item);
    } else response.status(403).json({ message: "Forbidden Access" });
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
    const role = request.user.role;
    if (role == "Owner") {
      console.log(request.body);
      const itemId = request.params.id;
      const updatedItem = request.body;
      await updateItem(itemId, updatedItem, request.body.owner_id);
      response.status(200).json(updatedItem);
    } else response.status(403).json({ message: "Forbidden Access" });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

export const deleteItemController = async (request, response) => {
  try {
    const role = request.user.role;
    if (role == "Owner") {
      const itemId = request.params.id;
      await deleteItem(itemId, request.user.user_id);
      response.status(200).json({ message: "Item deleted successfully" });
    } else response.status(403).json({ message: "Forbidden Access" });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

export const filterItemsController = async (request, response) => {
  try {
    const { category_id, location_id, price_min, price_max, availability } =
      request.query;
    console.log("Filter items with params:", {
      category_id,
      location_id,
      price_min,
      price_max,
      availability,
    });

    const [rows] = await getLocationDetails(location_id);

    if (rows.length === 0) {
      console.log("Location not found for ID:", location_id);
      return response.status(404).json({ message: "Location not found" });
    }

    const location = rows[0];
    console.log("Found location:", location);

    const items = await getItems({
      category_id,
      price_min,
      price_max,
      availability,
    });

    if (items.length === 0) {
      console.log("No items found with the specified criteria");
      return response.json([]);
    }

    const distances = [];
    let i = 0;
    for (const item of items) {
      const [itemLocation] = await getLocationDetails(item.location_id);

      const locationFormat = [
        [location.longitude, location.latitude],
        [itemLocation[0].longitude, itemLocation[0].latitude],
      ];
      console.log("Computing distance between locations:", locationFormat);
      const requestBody = {
        locations: locationFormat,
      };
      try {
        const distanceResponse = await axios.post(
          "https://api.openrouteservice.org/v2/matrix/driving-car",
          requestBody,
          {
            headers: {
              Authorization:
                "5b3ce3597851110001cf6248bfa9c95e8cd4431da85da5aa32602483",
              "Content-Type": "application/json",
            },
          }
        );
        distances.push(distanceResponse.data.sources[0].snapped_distance);
      } catch (error) {
        console.error("Error fetching distance:", error);
        return response.status(500).json({ error: "Error fetching distances" });
      }
    }

    let closestItem = null;
    let minDistance = Infinity;

    items.forEach((item, index) => {
      const distance = distances[index];
      if (distance !== null && distance < minDistance) {
        minDistance = distance;
        closestItem = item;
      }
    });
    console.log("Closest item found:", closestItem);
    response.status(200).json({
      items,
      closestItem: closestItem || null,
    });
  } catch (error) {
    console.error("Error in processing:", error);
    return response.status(500).json({ error: "An error occurred" });
  }
};
export const getTrendingItemsController = async (request, response) => {
  try {
    const trendingItems = await getTrendingItems();
    response.status(200).json(trendingItems);
  } catch (error) {
    response.status(500).json({ message: "Error fetching trending items" });
  }
};
