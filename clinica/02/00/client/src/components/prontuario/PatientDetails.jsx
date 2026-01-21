import React from "react";
import { Tab } from "@headlessui/react";
import Tabs from "../Tabs"; // Adjust path as needed
import { FaUser, FaNotesMedical, FaTooth, FaHistory } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import Button from "../Button";
import clsx from "clsx";

const PatientDetails = ({ patient, onEdit, onDelete, onEditAnamnesis }) => {
    if (!patient) {
        return (
            <div className='flex-1 flex items-center justify-center h-full text-gray-400'>
                Select a patient to view details
            </div>
        );
    }

    const tabs = [
        { title: "Info", icon: <FaUser /> },
        { title: "Anamnesis", icon: <FaNotesMedical /> },
        { title: "Odontogram", icon: <FaTooth /> },
        { title: "Treatments", icon: <FaHistory /> },
    ];

    return (
        <div className='flex-1 bg-gray-50 dark:bg-[#0d0d0df] h-full flex flex-col p-4 overflow-y-auto'>
            <div className='mb-6 flex justify-between items-start'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>
                        {patient.name}
                    </h1>
                    <p className='text-gray-500 dark:text-gray-400'>
                        Age: {patient.age} | Contact: {patient.contact} | Last Visit: {patient.lastVisit}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={() => onEdit(patient)}
                        label="Edit"
                        icon={<MdEdit />}
                        className="flex items-center gap-1 bg-blue-600 text-white rounded-md py-1 px-3 text-sm"
                    />
                    <Button
                        onClick={() => onDelete(patient)}
                        label="Delete"
                        icon={<MdDelete />}
                        className="flex items-center gap-1 bg-red-600 text-white rounded-md py-1 px-3 text-sm hover:bg-red-700"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-[#1f1f1f] rounded-xl shadow-sm p-4 flex-1">
                <Tabs tabs={tabs}>
                    <Tab.Panels>
                        <Tab.Panel className="py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem label="Email" value={patient.email} />
                                <InfoItem label="Phone" value={patient.contact} />
                                <InfoItem label="Age" value={patient.age} />
                                <InfoItem label="Status" value={patient.status} />
                                <InfoItem label="Last Visit" value={patient.lastVisit} />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel className="py-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold dark:text-white">Medical History</h3>
                                <Button
                                    onClick={() => onEditAnamnesis(patient)}
                                    label="Edit"
                                    icon={<MdEdit />}
                                    className="flex items-center gap-1 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md py-1 px-3 text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem label="Allergies" value={patient.anamnesis.allergies} />
                                <InfoItem label="Medications" value={patient.anamnesis.medications} />
                                <InfoItem label="Medical History" value={patient.anamnesis.medicalHistory} />
                                <InfoItem label="Smoker" value={patient.anamnesis.smoker} />
                                <InfoItem label="Bleeding Gums" value={patient.anamnesis.bleedingGums} />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel className="py-4">
                            <h3 className="text-lg font-semibold dark:text-white mb-4">Odontogram Status</h3>
                            {patient.odontogram.length > 0 ? (
                                <ul className="space-y-2">
                                    {patient.odontogram.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                            <FaTooth className="text-blue-500" />
                                            <span className="font-medium dark:text-gray-200">Tooth {item.tooth}:</span>
                                            <span className="dark:text-gray-400">{item.status}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No odontogram data available.</p>
                            )}
                        </Tab.Panel>
                        <Tab.Panel className="py-4">
                            <h3 className="text-lg font-semibold dark:text-white mb-4">Treatment History</h3>
                            {patient.treatments.length > 0 ? (
                                <div className="space-y-4">
                                    {patient.treatments.map((t, idx) => (
                                        <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-bold text-gray-700 dark:text-gray-200">{t.procedure}</span>
                                                <span className="text-sm text-gray-500">{t.date}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.notes}</p>
                                            <p className="text-xs text-blue-600 font-medium">Performed by: {t.dentist}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No treatments recorded.</p>
                            )}
                        </Tab.Panel>
                    </Tab.Panels>
                </Tabs>
            </div>
        </div>
    );
};

const InfoItem = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-xs text-gray-500 uppercase font-semibold tracking-wide">{label}</span>
        <span className="text-gray-800 dark:text-gray-200">{value || "-"}</span>
    </div>
);

export default PatientDetails;
