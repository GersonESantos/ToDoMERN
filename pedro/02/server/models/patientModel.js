import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
    {
        id: { type: Number, unique: true }, // Keeping existing ID for compatibility, but MongoDB uses _id
        name: { type: String, required: true },
        age: { type: Number },
        contact: { type: String },
        email: { type: String },
        lastVisit: { type: String }, // Storing as string to match mockData
        status: { type: String, default: "Active" },
        anamnesis: [
            {
                type: { type: String }, // Mongoose might complain about 'type' as a field name if not careful, but inside an array of objects it's usually fine if defined like this or using a sub-schema with `{ typeKey: '$type' }` if needed. Let's try simple object first.
                value: { type: String },
            },
        ],
        treatments: [
            {
                date: { type: String },
                procedure: { type: String },
                notes: { type: String },
                profissional: { type: String },
            },
        ],
        odontogram: [
            {
                tooth: { type: Number },
                status: { type: String },
            },
        ],
    },
    { timestamps: true }
);

const Patient = mongoose.model("Patient", PatientSchema);

export default Patient;
