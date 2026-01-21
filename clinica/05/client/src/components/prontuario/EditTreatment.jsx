import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";
import Button from "../Button";

const EditTreatment = ({ open, setOpen, treatmentData, onSubmit, initialItem }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        if (initialItem) {
            reset({
                date: initialItem.date,
                procedure: initialItem.procedure,
                notes: initialItem.notes,
                dentist: initialItem.dentist
            });
        } else {
            reset({ date: new Date().toISOString().split('T')[0], procedure: "", notes: "", dentist: "" });
        }
    }, [initialItem, open, reset]);

    const handleFormSubmit = (data) => {
        onSubmit(data, initialItem);
        setOpen(false);
    };

    return (
        <ModalWrapper open={open} setOpen={setOpen}>
            <div className='w-full'>
                <Dialog.Title
                    as='h2'
                    className='text-base font-bold leading-6 text-gray-900 mb-4'
                >
                    {initialItem ? "EDIT TREATMENT" : "ADD TREATMENT"}
                </Dialog.Title>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
                    <Textbox
                        placeholder='Date'
                        type='date'
                        name='date'
                        label='Date'
                        className='w-full rounded'
                        register={register("date", { required: "Date is required" })}
                        error={errors.date ? errors.date.message : ""}
                    />
                    <Textbox
                        placeholder='Procedure'
                        type='text'
                        name='procedure'
                        label='Procedure'
                        className='w-full rounded'
                        register={register("procedure", { required: "Procedure is required" })}
                        error={errors.procedure ? errors.procedure.message : ""}
                    />
                    <div className='flex flex-col gap-1'>
                        <label className='text-slate-800 dark:text-gray-400 text-sm font-semibold'>Notes</label>
                        <textarea
                            {...register("notes")}
                            className='bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-400 text-gray-900 dark:text-white outline-none text-base focus:ring-2 ring-blue-300 rounded-md resize-none'
                            rows={3}
                            placeholder="Treatment notes..."
                        ></textarea>
                    </div>
                    <Textbox
                        placeholder='Dentist'
                        type='text'
                        name='dentist'
                        label='Dentist'
                        className='w-full rounded'
                        register={register("dentist", { required: "Dentist name is required" })}
                        error={errors.dentist ? errors.dentist.message : ""}
                    />

                    <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                        <Button
                            type='submit'
                            className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto'
                            label={initialItem ? "Update" : "Add"}
                        />

                        <Button
                            type='button'
                            className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                            onClick={() => setOpen(false)}
                            label='Cancel'
                        />
                    </div>
                </form>
            </div>
        </ModalWrapper>
    );
};

export default EditTreatment;
