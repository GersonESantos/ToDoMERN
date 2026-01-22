import Patient from "../models/patientModel.js";
import mongoose from "mongoose";

const patientsData = [
    {
        id: 1,
        name: "Ana Silva",
        age: 32,
        contact: "(11) 98765-4321",
        email: "ana.silva@email.com",
        lastVisit: "2023-12-10",
        status: "Active",
        anamnesis: [
            { type: "Allergies", value: "Dipirona" },
            { type: "Medications", value: "None" },
            { type: "Medical History", value: "Healthy" },
            { type: "Smoker", value: "No" },
            { type: "Bleeding Gums", value: "Occasionally" },
        ],
        treatments: [
            {
                date: "2023-12-10",
                procedure: "Prophylaxis",
                notes: "Routine cleaning. Patient advised on flossing.",
                profissional: "admin@gmail.com, Administrator",
            },
            {
                date: "2023-06-15",
                procedure: "Restoration (Tooth 36)",
                notes: "Composite resin restoration.",
                profissional: "admin@gmail.com, Administrator",
            },
        ],
        odontogram: [
            { tooth: 18, status: "Healthy" },
            { tooth: 17, status: "Healthy" },
            { tooth: 16, status: "Healthy" },
            { tooth: 36, status: "Restored" },
        ],
    },
    {
        id: 2,
        name: "Carlos Oliveira",
        age: 45,
        contact: "(11) 91234-5678",
        email: "carlos.o@email.com",
        lastVisit: "2024-01-05",
        status: "Active",
        anamnesis: [
            { type: "Allergies", value: "None" },
            { type: "Medications", value: "Losartana (Hypertension)" },
            { type: "Medical History", value: "Controlled Hypertension" },
            { type: "Smoker", value: "Yes (5 cigs/day)" },
            { type: "Bleeding Gums", value: "Yes" },
        ],
        treatments: [
            {
                date: "2024-01-05",
                procedure: "Periodontal Maintenance",
                notes: "Deep cleaning. Monitoring pocket depth.",
                profissional: "Dra. Costa",
            },
        ],
        odontogram: [
            { tooth: 46, status: "Missing" },
            { tooth: 47, status: "Implante" },
        ],
    },
    {
        id: 3,
        name: "Mariana Souza",
        age: 28,
        contact: "(21) 99887-7665",
        email: "mari.souza@email.com",
        lastVisit: "2023-11-20",
        status: "Inactive",
        anamnesis: [
            { type: "Allergies", value: "Penicillin" },
            { type: "Medications", value: "Contraceptive" },
            { type: "Medical History", value: "None" },
            { type: "Smoker", value: "No" },
            { type: "Bleeding Gums", value: "No" },
        ],
        treatments: [],
        odontogram: [],
    },
];

export const seedPatients = async (req, res) => {
    try {
        await Patient.deleteMany({});
        await Patient.insertMany(patientsData);
        res.status(201).json({ message: "Patients seeded successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find({});
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPatient = async (req, res) => {
    try {
        const lastPatient = await Patient.findOne().sort({ id: -1 });
        const nextId = lastPatient ? lastPatient.id + 1 : 1;

        const patientData = { ...req.body, id: nextId };
        const patient = await Patient.create(patientData);
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        let patient;

        if (mongoose.Types.ObjectId.isValid(id)) {
            patient = await Patient.findByIdAndUpdate(id, req.body, {
                new: true,
            });
        } else {
            patient = await Patient.findOneAndUpdate({ id: id }, req.body, {
                new: true,
            });
        }

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        let patient;

        if (mongoose.Types.ObjectId.isValid(id)) {
            patient = await Patient.findByIdAndDelete(id);
        } else {
            patient = await Patient.findOneAndDelete({ id: id });
        }

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
