import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
    mealBox: String,
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'Pending' },
    notes: String,
    timestamp: Date,
});

const Delivery = mongoose.model("Delivery", deliverySchema);
export default Delivery;
