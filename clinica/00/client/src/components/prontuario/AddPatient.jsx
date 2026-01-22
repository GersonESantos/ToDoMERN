import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";
import Button from "../Button";

const AddPatient = ({ open, setOpen, userData, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: "",
            age: "",
            contact: "",
            email: "",
        },
    });

    useEffect(() => {
        if (userData) {
            reset({
                name: userData.name,
                age: userData.age,
                contact: userData.contact,
                email: userData.email,
            });
        } else {
            reset({
                name: "",
                age: "",
                contact: "",
                email: "",
            });
        }
    }, [userData, open, reset]);


    const handleFormSubmit = (data) => {
        onSubmit(data);
        setOpen(false);
        reset();
    };

    return (
        <ModalWrapper open={open} setOpen={setOpen}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className='w-full'>
                <Dialog.Title
                    as='h2'
                    className='text-base font-bold leading-6 text-gray-900 mb-4'
                >
                    {userData ? "EDIT PATIENT" : "ADD NEW PATIENT"}
                </Dialog.Title>
                <div className='mt-2 flex flex-col gap-6'>
                    <Textbox
                        placeholder='Full Name'
                        type='text'
                        name='name'
                        label='Full Name'
                        className='w-full rounded'
                        register={register("name", {
                            required: "Full name is required!",
                        })}
                        error={errors.name ? errors.name.message : ""}
                    />
                    <Textbox
                        placeholder='Age'
                        type='number'
                        name='age'
                        label='Age'
                        className='w-full rounded'
                        register={register("age", {
                            required: "Age is required!",
                        })}
                        error={errors.age ? errors.age.message : ""}
                    />
                    <Textbox
                        placeholder='Contact Number'
                        type='text'
                        name='contact'
                        label='Contact'
                        className='w-full rounded'
                        register={register("contact", {
                            required: "Contact is required!",
                        })}
                        error={errors.contact ? errors.contact.message : ""}
                    />
                    <Textbox
                        placeholder='Email Address'
                        type='email'
                        name='email'
                        label='Email'
                        className='w-full rounded'
                        register={register("email", {
                            required: "Email is required!",
                        })}
                        error={errors.email ? errors.email.message : ""}
                    />
                </div>

                <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                    <Button
                        type='submit'
                        className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto'
                        label={userData ? "Update" : "Add Patient"}
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

export default AddPatient;
