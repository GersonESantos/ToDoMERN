import React, { useState } from "react";
import PatientList from "../components/prontuario/PatientList";
import PatientDetails from "../components/prontuario/PatientDetails";
import AddPatient from "../components/prontuario/AddPatient";
import EditAnamnesis from "../components/prontuario/EditAnamnesis";
import EditOdontogram from "../components/prontuario/EditOdontogram";
import EditTreatment from "../components/prontuario/EditTreatment";
import ConfirmationDialog from "../components/ConfirmationDialog";
import {
    useCreatePatientMutation,
    useDeletePatientMutation,
    useGetPatientsQuery,
    useUpdatePatientMutation,
} from "../redux/slices/patientApiSlice";
import { toast } from "sonner";

const Prontuario = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const { data: patients = [], isLoading, error } = useGetPatientsQuery();

    console.log("Prontuario Rendering");
    console.log("Is Loading:", isLoading);
    console.log("Error:", error);
    console.log("Patients Data:", patients);
    const [createPatient] = useCreatePatientMutation();
    const [updatePatient] = useUpdatePatientMutation();
    const [deletePatient] = useDeletePatientMutation();

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isAnamnesisEditOpen, setIsAnamnesisEditOpen] = useState(false);
    const [anamnesisItemToEdit, setAnamnesisItemToEdit] = useState(null);
    const [isOdontogramEditOpen, setIsOdontogramEditOpen] = useState(false);
    const [patientToEdit, setPatientToEdit] = useState(null);
    const [odontogramItemToEdit, setOdontogramItemToEdit] = useState(null);
    const [isTreatmentEditOpen, setIsTreatmentEditOpen] = useState(false);
    const [treatmentToEdit, setTreatmentToEdit] = useState(null);
    const [treatmentIndexToEdit, setTreatmentIndexToEdit] = useState(null);
    const [patientToDelete, setPatientToDelete] = useState(null);

    const handleAddPatient = async (data) => {
        const newPatient = {
            ...data,
            lastVisit: new Date().toISOString().split("T")[0],
            status: "Active",
            anamnesis: [],
            treatments: [],
            odontogram: [],
        };
        try {
            const res = await createPatient(newPatient).unwrap();
            toast.success("Patient added successfully");
            if (!selectedPatient) setSelectedPatient(res);
            setIsAddOpen(false);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const handleUpdatePatient = async (data) => {
        try {
            const id = patientToEdit._id || patientToEdit.id;
            await updatePatient({ id, data }).unwrap();
            // Also update selected patient if it's the one currently being viewed
            const selectedId = selectedPatient?._id || selectedPatient?.id;
            if (selectedPatient && selectedId === id) {
                setSelectedPatient({ ...selectedPatient, ...data });
            }

            setIsEditOpen(false);
            setPatientToEdit(null);
            toast.success("Patient updated successfully");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const handleUpdateAnamnesis = async (data) => {
        try {
            const id = patientToEdit._id || patientToEdit.id;
            await updatePatient({ id, data: { anamnesis: data } }).unwrap();

            const selectedId = selectedPatient?._id || selectedPatient?.id;
            if (selectedPatient && selectedId === id) {
                setSelectedPatient({ ...selectedPatient, anamnesis: data });
            }

            setIsAnamnesisEditOpen(false);
            setPatientToEdit(null);
            setAnamnesisItemToEdit(null);
            toast.success("Anamnesis updated successfully");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const handleUpdateOdontogram = async (data) => {
        try {
            const id = patientToEdit._id || patientToEdit.id;
            await updatePatient({ id, data: { odontogram: data } }).unwrap();
            const selectedId = selectedPatient?._id || selectedPatient?.id;
            if (selectedPatient && selectedId === id) {
                setSelectedPatient({ ...selectedPatient, odontogram: data });
            }

            setIsOdontogramEditOpen(false);
            setPatientToEdit(null);
            setOdontogramItemToEdit(null);
            toast.success("Odontogram updated successfully");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const handleUpdateTreatment = async (data, initialItem) => {
        let updatedTreatments;
        if (initialItem) {
            // Update existing
            updatedTreatments = [...patientToEdit.treatments];
            updatedTreatments[treatmentIndexToEdit] = data;
        } else {
            // Add new
            updatedTreatments = [...patientToEdit.treatments, data];
        }

        try {
            const id = patientToEdit._id || patientToEdit.id;
            await updatePatient({ id, data: { treatments: updatedTreatments } }).unwrap();
            const selectedId = selectedPatient?._id || selectedPatient?.id;
            if (selectedPatient && selectedId === id) {
                setSelectedPatient({ ...selectedPatient, treatments: updatedTreatments });
            }

            setIsTreatmentEditOpen(false);
            setPatientToEdit(null);
            setTreatmentToEdit(null);
            setTreatmentIndexToEdit(null);
            toast.success("Treatment updated successfully");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const handleDeletePatient = async () => {
        try {
            const id = patientToDelete._id || patientToDelete.id;
            await deletePatient(id).unwrap();
            const selectedId = selectedPatient?._id || selectedPatient?.id;
            if (selectedPatient && selectedId === id) {
                setSelectedPatient(null);
            }

            setIsDeleteOpen(false);
            setPatientToDelete(null);
            toast.success("Patient deleted successfully");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const openEditModal = (patient) => {
        setPatientToEdit(patient);
        setIsEditOpen(true);
    };

    const openDeleteModal = (patient) => {
        setPatientToDelete(patient);
        setIsDeleteOpen(true);
    }

    const openAnamnesisEditModal = (patient, item = null) => {
        setPatientToEdit(patient);
        setAnamnesisItemToEdit(item);
        setIsAnamnesisEditOpen(true);
    }

    const openOdontogramEditModal = (patient, item = null) => {
        setPatientToEdit(patient);
        setOdontogramItemToEdit(item);
        setIsOdontogramEditOpen(true);
    }

    const openTreatmentEditModal = (patient, item = null, index = null) => {
        setPatientToEdit(patient);
        setTreatmentToEdit(item);
        setTreatmentIndexToEdit(index);
        setIsTreatmentEditOpen(true);
    }

    return (
        <div className='w-full h-[calc(100vh-100px)] flex flex-col md:flex-row bg-white dark:bg-[#1f1f1f] rounded-xl shadow-md overflow-hidden'>
            <PatientList
                patients={patients}
                onSelectPatient={setSelectedPatient}
                selectedPatientId={selectedPatient?._id || selectedPatient?.id}
                onAddPatient={() => setIsAddOpen(true)}
            />
            <PatientDetails
                patient={selectedPatient}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                onEditAnamnesis={openAnamnesisEditModal}
                onEditOdontogram={openOdontogramEditModal}
                onEditTreatment={openTreatmentEditModal}
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
                initialItem={anamnesisItemToEdit}
                onSubmit={handleUpdateAnamnesis}
            />

            <EditOdontogram
                open={isOdontogramEditOpen}
                setOpen={setIsOdontogramEditOpen}
                odontogramData={patientToEdit?.odontogram}
                initialItem={odontogramItemToEdit}
                onSubmit={handleUpdateOdontogram}
            />

            <EditTreatment
                open={isTreatmentEditOpen}
                setOpen={setIsTreatmentEditOpen}
                treatmentData={patientToEdit?.treatments}
                initialItem={treatmentToEdit}
                onSubmit={handleUpdateTreatment}
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
