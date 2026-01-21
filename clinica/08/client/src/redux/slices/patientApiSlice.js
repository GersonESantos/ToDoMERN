import { apiSlice } from "./apiSlice";

export const patientApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPatients: builder.query({
            query: () => "/patient",
            providesTags: ["Patient"],
        }),
        seedPatients: builder.mutation({
            query: (data) => ({
                url: "/patient/seed",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Patient"],
        }),
        createPatient: builder.mutation({
            query: (data) => ({
                url: "/patient",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Patient"],
        }),
        updatePatient: builder.mutation({
            query: ({ id, data }) => ({
                url: `/patient/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Patient"],
        }),
        deletePatient: builder.mutation({
            query: (id) => ({
                url: `/patient/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Patient"],
        }),
    }),
});

export const {
    useGetPatientsQuery,
    useSeedPatientsMutation,
    useCreatePatientMutation,
    useUpdatePatientMutation,
    useDeletePatientMutation,
} = patientApiSlice;
