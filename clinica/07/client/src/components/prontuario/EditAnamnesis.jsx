import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";
import Button from "../Button";
import { MdDelete } from "react-icons/md";

const EditAnamnesis = ({ open, setOpen, anamnesisData, onSubmit, initialItem }) => {
    const [localAnamnesis, setLocalAnamnesis] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    // Watch fields to determine if we are updating an existing entry in the form (by simple string match on type?) 
    // Actually, Odontogram uses the "tooth" number as ID. 
    // Here we can treat "type" as the ID or just use index if we passed it? 
    // For simplicity, let's allow duplicates or just add. 
    // To enable "Update" button style, let's see if the typed 'type' exists.
    const watchedType = watch("type");
    const isUpdate = localAnamnesis.some(item => item.type === watchedType);

    useEffect(() => {
        if (anamnesisData) {
            setLocalAnamnesis([...anamnesisData]);
        } else {
            setLocalAnamnesis([]);
        }
    }, [anamnesisData, open]);

    useEffect(() => {
        if (initialItem) {
            reset({
                type: initialItem.type,
                value: initialItem.value
            });
        } else {
            reset({ type: "", value: "" });
        }
    }, [initialItem, open, reset]);

    const addAnamnesisItem = (data) => {
        const newEntry = { type: data.type, value: data.value };

        // Check if exists to update or add
        const existingIndex = localAnamnesis.findIndex(item => item.type === newEntry.type);

        let updated;
        if (existingIndex >= 0) {
            updated = [...localAnamnesis];
            updated[existingIndex] = newEntry;
        } else {
            updated = [...localAnamnesis, newEntry];
        }

        setLocalAnamnesis(updated);
        reset();
    };

    const removeItem = (type) => {
        const updated = localAnamnesis.filter(item => item.type !== type);
        setLocalAnamnesis(updated);
    };

    const handleSave = () => {
        onSubmit(localAnamnesis);
        setOpen(false);
    };

    return (
        <ModalWrapper open={open} setOpen={setOpen}>
            <div className='w-full'>
                <Dialog.Title
                    as='h2'
                    className='text-base font-bold leading-6 text-gray-900 mb-4'
                >
                    EDIT ANAMNESIS
                </Dialog.Title>

                {/* Form to add/update item */}
                <form onSubmit={handleSubmit(addAnamnesisItem)} className="flex flex-col sm:flex-row gap-2 items-end mb-6 border-b pb-4">
                    <Textbox
                        placeholder='Type (e.g. Allergy)'
                        type='text'
                        name='type'
                        label='Type'
                        className='w-full sm:w-1/3 rounded'
                        register={register("type", { required: true })}
                    />
                    <Textbox
                        placeholder='Value (e.g. Penicillin)'
                        type='text'
                        name='value'
                        label='Value'
                        className='w-full sm:flex-1 rounded'
                        register={register("value", { required: true })}
                    />
                    <Button
                        type='submit'
                        className={`${isUpdate ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'} px-4 py-2 text-sm font-semibold text-white rounded h-[46px] w-full sm:w-auto`}
                        label={isUpdate ? 'Update' : 'Add'}
                    />
                </form>

                {/* List of current items */}
                <div className="max-h-60 overflow-y-auto space-y-2 mb-4">
                    {localAnamnesis.length === 0 && <p className="text-gray-500 text-center">No data recorded.</p>}
                    {localAnamnesis.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                            <div className="flex-1">
                                <span className="font-bold text-gray-700 mr-2">{item.type}:</span>
                                <span className="text-gray-600">{item.value}</span>
                            </div>
                            <button
                                onClick={() => removeItem(item.type)}
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

export default EditAnamnesis;
