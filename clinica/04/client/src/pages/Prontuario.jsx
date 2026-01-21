import React, { useState } from "react";
import PatientList from "../components/prontuario/PatientList";
import PatientDetails from "../components/prontuario/PatientDetails";
import AddPatient from "../components/prontuario/AddPatient";
import EditAnamnesis from "../components/prontuario/EditAnamnesis";
import EditOdontogram from "../components/prontuario/EditOdontogram";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { patientsData } from "../utils/mockData";
import { toast } from "sonner";

const Prontuario = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patients, setPatients] = useState(patientsData);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isAnamnesisEditOpen, setIsAnamnesisEditOpen] = useState(false);
    const [isOdontogramEditOpen, setIsOdontogramEditOpen] = useState(false);
    const [patientToEdit, setPatientToEdit] = useState(null);
    const [odontogramItemToEdit, setOdontogramItemToEdit] = useState(null);
    const [patientToDelete, setPatientToDelete] = useState(null);

    const handleAddPatient = (data) => {
        const newPatient = {
            id: Math.max(...patients.map((p) => p.id), 0) + 1,
            ...data,
            lastVisit: new Date().toISOString().split("T")[0],
            status: "Active",
            anamnesis: {
                allergies: "None",
                medications: "None",
                medicalHistory: "None",
                smoker: "No",
                bleedingGums: "No",
            },
            treatments: [],
            odontogram: [],
        };
        setPatients([...patients, newPatient]);
        toast.success("Patient added successfully");
        if (!selectedPatient) setSelectedPatient(newPatient);
    };

    const handleUpdatePatient = (data) => {
        const updatedPatients = patients.map((p) =>
            p.id === patientToEdit.id ? { ...p, ...data } : p
        );
        setPatients(updatedPatients);

        // Also update selected patient if it's the one currently being viewed
        if (selectedPatient && selectedPatient.id === patientToEdit.id) {
            setSelectedPatient({ ...selectedPatient, ...data });
        }

        setIsEditOpen(false);
        setPatientToEdit(null);
        toast.success("Patient updated successfully");
    };

    const handleUpdateAnamnesis = (data) => {
        const updatedPatients = patients.map((p) =>
            p.id === patientToEdit.id ? { ...p, anamnesis: { ...p.anamnesis, ...data } } : p
        );
        setPatients(updatedPatients);

        if (selectedPatient && selectedPatient.id === patientToEdit.id) {
            setSelectedPatient({ ...selectedPatient, anamnesis: { ...selectedPatient.anamnesis, ...data } });
        }

        setIsAnamnesisEditOpen(false);
        setPatientToEdit(null);
        toast.success("Anamnesis updated successfully");
        toast.success("Anamnesis updated successfully");
    };

    const handleUpdateOdontogram = (data) => {
        const updatedPatients = patients.map((p) =>
            p.id === patientToEdit.id ? { ...p, odontogram: data } : p
        );
        setPatients(updatedPatients);

        if (selectedPatient && selectedPatient.id === patientToEdit.id) {
            setSelectedPatient({ ...selectedPatient, odontogram: data });
        }

        setIsOdontogramEditOpen(false);
        setPatientToEdit(null);
        setOdontogramItemToEdit(null);
        toast.success("Odontogram updated successfully");
    };

    const handleDeletePatient = () => {
        const filteredPatients = patients.filter(p => p.id !== patientToDelete.id);
        setPatients(filteredPatients);

        if (selectedPatient && selectedPatient.id === patientToDelete.id) {
            setSelectedPatient(null);
        }

        setIsDeleteOpen(false);
        setPatientToDelete(null);
        toast.success("Patient deleted successfully");
    };

    const openEditModal = (patient) => {
        setPatientToEdit(patient);
        setIsEditOpen(true);
    };

    const openDeleteModal = (patient) => {
        setPatientToDelete(patient);
        setIsDeleteOpen(true);
    }

    const openAnamnesisEditModal = (patient) => {
        setPatientToEdit(patient);
        setIsAnamnesisEditOpen(true);
    }

    const openOdontogramEditModal = (patient, item = null) => {
        setPatientToEdit(patient);
        setOdontogramItemToEdit(item);
        setIsOdontogramEditOpen(true);
    }

    return (
        <div className='w-full h-[calc(100vh-100px)] flex flex-col md:flex-row bg-white dark:bg-[#1f1f1f] rounded-xl shadow-md overflow-hidden'>
            <PatientList
                patients={patients}
                onSelectPatient={setSelectedPatient}
                selectedPatientId={selectedPatient?.id}
                onAddPatient={() => setIsAddOpen(true)}
            />
            <PatientDetails
                patient={selectedPatient}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                onEditAnamnesis={openAnamnesisEditModal}
                onEditOdontogram={openOdontogramEditModal}
            />

            <AddPatient
                open={isAddOpen}
                setOpen={setIsAddOpen}
                onSubmit={handleAddPatient}
            />

            <AddPatient
                open={isEditOpen}
                setOpen={setIsEditOpen}
                userData={patientToEdit}
                onSubmit={handleUpdatePatient}
            />

            <EditAnamnesis
                open={isAnamnesisEditOpen}
                setOpen={setIsAnamnesisEditOpen}
                anamnesisData={patientToEdit?.anamnesis}
                onSubmit={handleUpdateAnamnesis}
            />

            <EditOdontogram
                open={isOdontogramEditOpen}
                setOpen={setIsOdontogramEditOpen}
                odontogramData={patientToEdit?.odontogram}
                initialItem={odontogramItemToEdit}
                onSubmit={handleUpdateOdontogram}
            />

            <ConfirmationDialog
                open={isDeleteOpen}
                setOpen={setIsDeleteOpen}
                msg={`Are you sure you want to delete patient ${patientToDelete?.name}?`}
                onClick={handleDeletePatient}
            />
        </div>
    );
};

export default Prontuario;
