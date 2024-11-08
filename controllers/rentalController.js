// controllers/rentalController.js

import Rental from "../models/rentalModel.js";

import { v4 as uuidv4 } from "uuid";

const rentalController = {

createRental : async (req, res) => {
    const userId = req.user.user_id;


    try {
      const [userRows] = await Rental.getUserById(userId);
      if (userRows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const userRole = userRows[0].role;
      if (userRole !== "Owner") {
        return res
          .status(403)
          .json({
            userRole: userRole,
            message:
              "You do not have permission to create a rental. Only owners can create rentals.",
          });
      }
      const rental_id = uuidv4();
      const [result] = await Rental.createRental(req.body, rental_id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Rental not created" });
      }
      res.status(201).json({ rentalId: rental_id, ...req.body });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


getAllRentals : async (req, res) => {
    const userId = req.user.user_id;

    try {
      const [userRows] = await Rental.getUserById(userId);
      if (userRows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      const userRole = userRows[0].role;
      if (userRole == "Admin") {
        const [rentals] = await Rental.getAllRentals();
        res.status(200).json(rentals);
      } else {
        return res
          .status(401)
          .json({
            message: "You do not have permission to delete this rental.",
          });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRentalById: async (req, res) => {
    const rentalId = req.params.rental_id;

    const userId = req.user.user_id;


    try {
      const [rentalRows] = await Rental.getRentalById(rentalId);
      if (rentalRows.length === 0) {
        return res.status(404).json({ message: "Rental not found" });
      }

      const itemId = rentalRows[0].item_id;

      const [itemRows] = await Rental.getItemById(itemId);
      if (itemRows.length === 0) {
        return res.status(404).json({ message: "Item not found" });
      }

      const ownerId = itemRows[0].owner_id;

      const [userRows] = await Rental.getUserById(userId);
      if (userRows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      const userRole = userRows[0].role;

      if (
        userRole === "Admin" ||
        rentalRows[0].renter_id ===userId ||
        ownerId === userId
      ) {
        res.status(200).json({ userRole: userRole, Rental: rentalRows[0] });
      } else {
        return res
          .status(403)
          .json({
            message: "You do not have permission to access this rental.",
          });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },



updateRental : async (req, res) => {
    const userId = req.user.user_id;

    const rentalId = req.params.rental_id;

    try {
      const [userRows] = await Rental.getUserById(userId);
      if (userRows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const [rentalRows] = await Rental.getRentalById(rentalId);
      if (rentalRows.length === 0) {
        return res.status(404).json({ message: "Rental not found" });
      }

      const rental = rentalRows[0];
      const [itemRows] = await Rental.getItemById(rental.item_id);
      if (itemRows.length === 0) {
        return res.status(404).json({ message: "Item not found" });
      }
      const ownerId = itemRows[0].owner_id;

      if (userId !== ownerId) {
        return res
          .status(401)
          .json({
            message: "You do not have permission to update this rental.",
          });
      }

      await Rental.updateRental(rentalId, req.body);
      res.status(200).json({ Rental: req.body, message: "Rental updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },



updateRentalStatus : async (req, res) => {
    const userId = req.user.user_id;


    try {
      const [userRows] = await Rental.getUserById(userId);
      if (userRows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const [rentalRows] = await Rental.getRentalById(req.params.rental_id);
      if (rentalRows.length === 0) {
        return res.status(404).json({ message: "Rental not found" });
      }

      const rental = rentalRows[0];
      const itemId = rental.item_id;

      const [itemRows] = await Rental.getItemById(itemId);
      if (itemRows.length === 0) {
        return res.status(404).json({ message: "Item not found" });
      }

      const ownerId = itemRows[0].owner_id;

      if (userId !== ownerId) {
        return res
          .status(401)
          .json({
            userId: ownerId,
            message: "You do not have permission to update this rental.",
          });
      }

      const status = req.body.status;
      if (["active", "completed", "canceled"].includes(status)) {
        await Rental.updateRentalStatus(req.params.rental_id, status);
        return res.status(200).json({
          status: status,
          message: "Rental status updated successfully",
        });
      } else {
        return res.status(400).json({
          error: `The status ${status} is not allowed. The status must be one of the following: active, completed, canceled.`,
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },



cancelRental : async (req, res) => {
    const userId = req.user.user_id;

    const rentalId = req.params.rental_id;

    try {
      const [userRows] = await Rental.getUserById(userId);
      if (userRows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const [rentalRows] = await Rental.getRentalById(rentalId);
      if (rentalRows.length === 0) {
        return res.status(404).json({ message: "Rental not found" });
      }

      const rental = rentalRows[0];
      const [itemRows] = await Rental.getItemById(rental.item_id);
      if (itemRows.length === 0) {
        return res.status(404).json({ message: "Item not found" });
      }

      const ownerId = itemRows[0].owner_id;

      if (userId !== ownerId) {
        return res
          .status(401)
          .json({
            message: "You do not have permission to cancel this rental.",
          });
      }

      const currentDate = new Date();
      const startDate = new Date(rental.start_date);

      if (currentDate >= startDate) {
        return res
          .status(400)
          .json({ message: "Cannot cancel rental after the start date." });
      }

      await Rental.updateRentalStatus(rentalId, "canceled");
      res.status(200).json({ message: "Rental canceled successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


};
export default rentalController;
