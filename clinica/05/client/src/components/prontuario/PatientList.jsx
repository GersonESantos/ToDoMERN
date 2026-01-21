
import React, { useState } from "react";
import clsx from "clsx";
import Textbox from "../Textbox"; // Adjust path as needed
import Button from "../Button";   // Adjust path as needed
import { MdSearch, MdAdd } from "react-icons/md";

const PatientList = ({ patients, onSelectPatient, selectedPatientId, onAddPatient }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='w-full lg:w-1/3 bg-white dark:bg-[#1f1f1f] h-full flex flex-col border-r border-gray-200 dark:border-gray-700'>
            <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
                <div className="flex justify-between items-center mb-4">
                    <h2 className='text-xl font-bold text-gray-800 dark:text-white'>
                        Patients
                    </h2>
                    <Button
                        onClick={onAddPatient}
                        label="Add"
                        icon={<MdAdd className="text-lg" />}
                        className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-1 px-2 text-sm"
                    />
                </div>

                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Search patient...'
                        className='w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className='flex-1 overflow-y-auto'>
                {filteredPatients.map((patient) => (
                    <div
                        key={patient.id}
                        onClick={() => onSelectPatient(patient)}
                        className={clsx(
                            "p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
                            selectedPatientId === patient.id
                                ? "bg-blue-50 dark:bg-gray-800 border-l-4 border-l-blue-600"
                                : ""
                        )}
                    >
                        <h3 className='font-semibold text-gray-800 dark:text-white'>
                            {patient.name}
                        </h3>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                            Age: {patient.age}
                        </p>
                    </div>
                ))}
                {filteredPatients.length === 0 && (
                    <div className="p-4 text-center text-gray-500">
                        No patients found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientList;
