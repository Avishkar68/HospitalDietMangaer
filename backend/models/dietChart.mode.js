import mongoose from "mongoose";

const dietChartSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    morningMeal: { meal: String, ingredients: [String], instructions: String },
    eveningMeal: { meal: String, ingredients: [String], instructions: String },
    nightMeal: { meal: String, ingredients: [String], instructions: String },
});

const DietChart = mongoose.model("DietChart", dietChartSchema);
export default DietChart;
