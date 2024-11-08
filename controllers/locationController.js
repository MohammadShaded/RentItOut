import database from "../config/db.js";
import { getLocations,createLocation,updateLocation,deleteLocation } from "../models/location.js";

export const  getLocationsController = async(req, res) => {
try{
    
    const locationId=req.params.id;
    const location = await getLocations(locationId);
    if(location)
    res.status(200).json(location);
  else  res.status(404).json({message: "location not found"});

}catch(err){
    res.status(500).json({message: err.message});
}

}
export const createLocationController = async(req, res) => {
try{
    const newLocation = req.body;
    await createLocation(newLocation)
    res.status(201).json({message: "location created"});
    

}catch(err) {
    res.status(500).json({message: err.message});
}
}

export const updateLocationController = async(req, res) => {
    try{
        const updatedLocation = req.body;
        const locationId=req.params.id;
        const result=await updateLocation(locationId,updatedLocation)
        res.status(200).json({message: "location updated"});
    
    }catch(err){
        res.status(500).json({message: err.message});
    }
    }
export const deleteLocationController = async(req, res) => {
try{
    const locationId=req.params.id;
    const result=await deleteLocation(locationId);
    if(result.affectedRows===0)
        res.status(404).json({message: "location not found"});
    else
    res.status(200).json({message: "location deleted"});
}catch(error) {
    res.status(500).json({message: error.message});
}
}