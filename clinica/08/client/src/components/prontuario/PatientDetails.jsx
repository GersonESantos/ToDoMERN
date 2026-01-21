import React from "react";
import { Tab } from "@headlessui/react";
import Tabs from "../Tabs"; // Adjust path as needed
import { FaUser, FaNotesMedical, FaTooth, FaHistory } from "react-icons/fa";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import Button from "../Button";
import clsx from "clsx";

const PatientDetails = ({ patient, onEdit, onDelete, onEditAnamnesis, onEditOdontogram, onEditTreatment }) => {
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
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold dark:text-white">Medical History</h3>
                                <Button
                                    onClick={() => onEditAnamnesis(patient)}
                                    label="ADD +"
                                    icon={<MdAdd />}
                                    className="flex items-center gap-1 bg-green-600 text-white hover:bg-green-700 rounded-md py-1 px-3 text-sm"
                                />
                            </div>
                            {patient.anamnesis && patient.anamnesis.length > 0 ? (
                                <div className="space-y-2">
                                    {patient.anamnesis.map((item, idx) => (
                                        <AnamnesisItem
                                            key={idx}
                                            label={item.type}
                                            value={item.value}
                                            onEdit={() => onEditAnamnesis(patient, item)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No medical history recorded.</p>
                            )}
                        </Tab.Panel>
                        <Tab.Panel className="py-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold dark:text-white">Odontogram Status</h3>
                                <Button
                                    onClick={() => onEditOdontogram(patient)}
                                    label="ADD +"
                                    icon={<MdAdd />}
                                    className="flex items-center gap-1 bg-green-600 text-white hover:bg-green-700 rounded-md py-1 px-3 text-sm"
                                />
                            </div>
                            {patient.odontogram.length > 0 ? (
                                <ul className="space-y-2">
                                    {patient.odontogram.map((item, idx) => (
                                        <li key={idx} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                            <div className="flex items-center gap-2">
                                                <FaTooth className="text-blue-500" />
                                                <span className="font-medium dark:text-gray-200">Tooth {item.tooth}:</span>
                                                <span className="dark:text-gray-400">{item.status}</span>
                                            </div>
                                            <Button
                                                onClick={() => onEditOdontogram(patient, item)}
                                                label=""
                                                icon={<MdEdit />}
                                                className="text-gray-500 hover:text-blue-600"
                                            />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No odontogram data available.</p>
                            )}
                        </Tab.Panel>
                        <Tab.Panel className="py-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold dark:text-white">Treatment History</h3>
                                <Button
                                    onClick={() => onEditTreatment(patient)}
                                    label="ADD +"
                                    icon={<MdAdd />}
                                    className="flex items-center gap-1 bg-green-600 text-white hover:bg-green-700 rounded-md py-1 px-3 text-sm"
                                />
                            </div>
                            {patient.treatments.length > 0 ? (
                                <div className="space-y-4">
                                    {patient.treatments.map((t, idx) => (
                                        <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 relative">
                                            <div className="absolute top-3 right-3">
                                                <Button
                                                    onClick={() => onEditTreatment(patient, t, idx)}
                                                    label=""
                                                    icon={<MdEdit />}
                                                    className="text-gray-500 hover:text-blue-600"
                                                />
                                            </div>
                                            <div className="flex justify-between items-start mb-2 pr-8">
                                                <span className="font-bold text-gray-700 dark:text-gray-200">{t.procedure}</span>
                                                <span className="text-sm text-gray-500">{t.date}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.notes}</p>
                                            <p className="text-xs text-blue-600 font-medium">Performed by: {t.profissional}</p>
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

const AnamnesisItem = ({ label, value, onEdit }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">{label}</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">{value || "-"}</span>
        </div>
        <Button
            onClick={onEdit}
            label=""
            icon={<MdEdit />}
            className="text-gray-400 hover:text-blue-600 p-1"
        />
    </div>
);

export default PatientDetails;
