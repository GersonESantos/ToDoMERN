import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";
import Button from "../Button";
import { MdDelete } from "react-icons/md";

const EditOdontogram = ({ open, setOpen, odontogramData, onSubmit, initialItem }) => {
    const [localOdontogram, setLocalOdontogram] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    const watchedTooth = watch("tooth");
    const isUpdate = localOdontogram.some(item => item.tooth === parseInt(watchedTooth));


    useEffect(() => {
        if (odontogramData) {
            setLocalOdontogram([...odontogramData]);
        } else {
            setLocalOdontogram([]);
        }
    }, [odontogramData, open]);

    useEffect(() => {
        if (initialItem) {
            reset({
                tooth: initialItem.tooth,
                status: initialItem.status
            });
        } else {
            reset({ tooth: "", status: "" });
        }
    }, [initialItem, open, reset]);

    const addToothStatus = (data) => {
        const newEntry = { tooth: parseInt(data.tooth), status: data.status };
        // simple validation to prevent duplicate entries for same tooth, or replace? 
        // For now let's just add or replace if exists
        const existingIndex = localOdontogram.findIndex(item => item.tooth === newEntry.tooth);

        let updated;
        if (existingIndex >= 0) {
            updated = [...localOdontogram];
            updated[existingIndex] = newEntry;
        } else {
            updated = [...localOdontogram, newEntry];
        }

        setLocalOdontogram(updated.sort((a, b) => a.tooth - b.tooth));
        reset();
    };

    const removeToothStatus = (tooth) => {
        const updated = localOdontogram.filter(item => item.tooth !== tooth);
        setLocalOdontogram(updated);
    };

    const handleSave = () => {
        onSubmit(localOdontogram);
        setOpen(false);
    };

    return (
        <ModalWrapper open={open} setOpen={setOpen}>
            <div className='w-full'>
                <Dialog.Title
                    as='h2'
                    className='text-base font-bold leading-6 text-gray-900 mb-4'
                >
                    EDIT ODONTOGRAM
                </Dialog.Title>

                {/* Form to add new status */}
                <form onSubmit={handleSubmit(addToothStatus)} className="flex gap-2 items-end mb-6 border-b pb-4">
                    <Textbox
                        placeholder='Tooth #'
                        type='number'
                        name='tooth'
                        label='Tooth'
                        className='w-20 rounded'
                        register={register("tooth", { required: true })}
                    />
                    <Textbox
                        placeholder='Status (e.g., Healthy, Caries)'
                        type='text'
                        name='status'
                        label='Status'
                        className='flex-1 rounded'
                        register={register("status", { required: true })}
                    />
                    <Button
                        type='submit'
                        className={`${isUpdate ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'} px-4 py-2 text-sm font-semibold text-white rounded h-[46px]`}
                        label={isUpdate ? 'Update' : 'Add'}
                    />
                </form>

                {/* List of current status */}
                <div className="max-h-60 overflow-y-auto space-y-2 mb-4">
                    {localOdontogram.length === 0 && <p className="text-gray-500 text-center">No data recorded.</p>}
                    {localOdontogram.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                            <div>
                                <span className="font-bold text-gray-700 mr-2">Tooth {item.tooth}:</span>
                                <span className="text-gray-600">{item.status}</span>
                            </div>
                            <button
                                onClick={() => removeToothStatus(item.tooth)}
                                className="text-red-500 hover:text-red-700 p-1"
                            >
                                <MdDelete />
                            </button>
                        </div>
                    ))}
                </div>

                <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                    <Button
                        type='button'
                        className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto'
                        onClick={handleSave}
                        label='Save Changes'
                    />

                    <Button
                        type='button'
                        className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                        onClick={() => setOpen(false)}
                        label='Cancel'
                    />
                </div>
            </div>
        </ModalWrapper>
    );
};

export default EditOdontogram;
