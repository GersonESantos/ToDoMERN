import React from 'react';
import { useGetPatientsQuery } from '../redux/slices/patientApiSlice';

const Prontuario = () => {
    const { data: patients, isLoading, error } = useGetPatientsQuery();

    if (isLoading) return <div>Loading patients...</div>;

    if (error) {
        return (
            <div>
                <h1>Error loading patients</h1>
                <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
        );
    }

    return (
        <div className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white">
            <h1 className="text-2xl font-bold mb-4">Patients List (Debug)</h1>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded mb-4 overflow-auto max-h-60">
                {JSON.stringify(patients, null, 2)}
            </pre>
            <ul>
                {patients?.map((patient) => (
                    <li key={patient.id || patient._id} className="border-b py-2">
                        <strong>{patient.name}</strong> - {patient.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Prontuario;
