import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: String,
    diseases: [String],
    allergies: [String],
    roomNumber: String,
    bedNumber: String,
    floorNumber: String,
    age: Number,
    gender: String,
    contactInfo: String,
    emergencyContact: String,
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
