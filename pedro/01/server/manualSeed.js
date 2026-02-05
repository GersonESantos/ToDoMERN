import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/clinica';

console.log('Attempting to connect to:', uri);

mongoose.connect(uri)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

const PatientSchema = new mongoose.Schema({
    id: Number,
    name: String,
    age: Number,
    contact: String,
    email: String,
    lastVisit: String,
    status: String,
    anamnesis: Array,
    treatments: Array,
    odontogram: Array,
});

const PatientModel = mongoose.model('Patient', PatientSchema);

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
            { type: "Bleeding Gums", value: "Occasionally" }
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
    // Outros pacientes...
];

// Clean existing data to avoid duplicates if needed, or just insert
// PatientModel.deleteMany({}).then(() => ... ) 
// But following user instruction strictly:

PatientModel.insertMany(patientsData)
    .then(() => {
        console.log('Dados inseridos com sucesso!');
        mongoose.connection.close();
    })
    .catch(err => console.error('Erro ao inserir dados:', err));
