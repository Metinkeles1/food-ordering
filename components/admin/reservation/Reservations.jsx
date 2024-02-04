import { useState, useEffect } from "react";
import Title from "../../ui/Title";
import axios from "axios";
import React from "react";

const Reservations = () => {
    const [reservationData, setReservationData] = useState([]);
    const [reservationStatus, setReservationStatus] = useState([
      "Pending",
      "Confirmed",
      "Completed",
      "Cancelled",
    ]);
    const [currentStatus, setCurrentStatus] = useState(0);
  
    const getReservations = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/reservations/`
        );
        setReservationData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
  
    useEffect(() => {
      getReservations();
    }, []);
  
    const handleStatus = async (id) => {
      const currentReservation = reservationData.find(
        (reservation) => reservation._id === id
      );
  
      if (!currentReservation) {
        console.error("Reservation not found");
        return;
      }
  
      const currentStatusIndex = currentReservation.status;
      const nextStatusIndex = currentStatusIndex + 1;
  
      try {
        if (nextStatusIndex < reservationStatus.length) {
          const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/reservations/${id}`,
            {
              status: nextStatusIndex,
            }
          );
  
          const updatedReservations = reservationData.map((reservation) => {
            if (reservation._id === id) {
              return {
                ...reservation,
                status: nextStatusIndex,
              };
            }
            return reservation;
          });
  
          setReservationData(updatedReservations);
        } else {
          console.error("Invalid status transition");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div className='flex-1 lg:mt-0 mt-5 lg:p-8 w-full'>
        <Title addClass='text-[40px]'>Reservations</Title>
        <div className='overflow-x-auto max-h-[450px] w-full mt-5'>
          <table className='w-full  text-sm text-center text-gray-secondary  '>
            <thead className='text-xs text-gray-200 uppercase bg-gray-700 '>
              <tr>
                <th scope='col' className='py-3 px-6'>
                  Reservation ID
                </th>
                <th scope='col' className='py-3 px-6'>
                  Full Name
                </th>
                <th scope='col' className='py-3 px-6'>
                  Email
                </th>
                <th scope='col' className='py-3 px-6'>
                  Date
                </th>
                <th scope='col' className='py-3 px-6'>
                  Guests
                </th>
                <th scope='col' className='py-3 px-6'>
                  Special Request
                </th>
                <th scope='col' className='py-3 px-6'>
                  Status
                </th>
                <th scope='col' className='py-3 px-6'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reservationData.length > 0 &&
                reservationData
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((reservation) => (
                    <tr
                      key={reservation._id}
                      className='border-b bg-[#fff] border-gray-700 hover:bg-primary hover:text-[#fff] transition-all'
                    >
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        {reservation._id.substring(0, 5)}...
                      </td>
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        {reservation.fullName}
                      </td>
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        {reservation.email}
                      </td>
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        {reservation.reservationDate}
                      </td>
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        {reservation.numberOfPersons}
                      </td>
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        {reservation.specialRequests}
                      </td>
                      <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-secondary'>
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                          {reservationStatus[reservation?.status]}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <button
                          className='btn-primary !bg-success'
                          onClick={() => handleStatus(reservation?._id)}
                          disabled={reservation?.status > 2}
                        >
                          Next Stage
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
}

export default Reservations