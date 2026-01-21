import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";
import Button from "../Button";

const EditAnamnesis = ({ open, setOpen, anamnesisData, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            allergies: "",
            medications: "",
            medicalHistory: "",
            smoker: "",
            bleedingGums: "",
        },
    });

    useEffect(() => {
        if (anamnesisData) {
            reset({
                allergies: anamnesisData.allergies || "",
                medications: anamnesisData.medications || "",
                medicalHistory: anamnesisData.medicalHistory || "",
                smoker: anamnesisData.smoker || "",
                bleedingGums: anamnesisData.bleedingGums || "",
            });
        }
    }, [anamnesisData, open, reset]);

    const handleFormSubmit = (data) => {
        onSubmit(data);
        setOpen(false);
    };

    return (
        <ModalWrapper open={open} setOpen={setOpen}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className='w-full'>
                <Dialog.Title
                    as='h2'
                    className='text-base font-bold leading-6 text-gray-900 mb-4'
                >
                    EDIT ANAMNESIS
                </Dialog.Title>
                <div className='mt-2 flex flex-col gap-6'>
                    <Textbox
                        placeholder='Allergies'
                        type='text'
                        name='allergies'
                        label='Allergies'
                        className='w-full rounded'
                        register={register("allergies")}
                    />
                    <Textbox
                        placeholder='Medications'
                        type='text'
                        name='medications'
                        label='Medications'
                        className='w-full rounded'
                        register={register("medications")}
                    />
                    <Textbox
                        placeholder='Medical History'
                        type='text'
                        name='medicalHistory'
                        label='Medical History'
                        className='w-full rounded'
                        register={register("medicalHistory")}
                    />
                    <Textbox
                        placeholder='Smoker (Yes/No)'
                        type='text'
                        name='smoker'
                        label='Smoker'
                        className='w-full rounded'
                        register={register("smoker")}
                    />
                    <Textbox
                        placeholder='Bleeding Gums'
                        type='text'
                        name='bleedingGums'
                        label='Bleeding Gums'
                        className='w-full rounded'
                        register={register("bleedingGums")}
                    />
                </div>

                <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                    <Button
                        type='submit'
                        className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto'
                        label='Update'
                    />

                    <Button
                        type='button'
                        className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                        onClick={() => setOpen(false)}
                        label='Cancel'
                    />
                </div>
            </form>
        </ModalWrapper>
    );
};

export default EditAnamnesis;
