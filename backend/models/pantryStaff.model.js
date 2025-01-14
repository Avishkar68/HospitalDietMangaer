import mongoose from "mongoose";

const pantryStaffSchema = new mongoose.Schema({
    name: String,
    contactInfo: String,
    location: String,
});

const PantryStaff = mongoose.model("PantryStaff", pantryStaffSchema);
export default PantryStaff;
