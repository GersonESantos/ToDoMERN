import React, { useState } from "react";
import PatientList from "../components/prontuario/PatientList";
import PatientDetails from "../components/prontuario/PatientDetails";
import { patientsData } from "../utils/mockData";

const Prontuario = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);

    return (
        <div className='w-full h-[calc(100vh-100px)] flex flex-col md:flex-row bg-white dark:bg-[#1f1f1f] rounded-xl shadow-md overflow-hidden'>
            <PatientList
                patients={patientsData}
                onSelectPatient={setSelectedPatient}
                selectedPatientId={selectedPatient?.id}
            />
            <PatientDetails patient={selectedPatient} />
        </div>
    );
};

export default Prontuario;
