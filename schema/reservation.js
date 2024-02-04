import * as Yup from 'yup';

export const reservationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full Name is required')
    .min(3, 'Full name must be at least 3 characters'),
  phoneNumber: Yup.string()
    .required('Phone Number is required')
    .min(10, 'Phone number must be at least 10 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  numberOfPersons: Yup.number()
    .required('Number of Persons is required')
    .min(1, 'Number of persons must be at least 1'),
  reservationDate: Yup.string().required('Reservation Date is required'),
  specialRequests: Yup.string().max(500, 'Special requests must be at most 500 characters'),
});
