import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 15,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    numberOfPersons: {
      type: Number,
      required: true,
      min: 1,
    },
    reservationDate: {
      type: Date,
      required: true,
    },
    specialRequests: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    status:{
        type: Number,
        default: 0
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema);

export default Reservation;
