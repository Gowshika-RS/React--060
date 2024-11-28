// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import "./BookingForm.css";

// // const BookingForm = () => {
// //   const [formData, setFormData] = useState({
// //     id: null, // ID to distinguish between new and editing mode
// //     name: "",
// //     email: "",
// //     phone: "",
// //     checkIn: "",
// //     checkOut: "",
// //     guests: 1,
// //     specialRequests: "",
// //   });

// //   const [bookings, setBookings] = useState([]); // State to store bookings
// //   const [confirmationMessage, setConfirmationMessage] = useState("");

// //   // Fetch bookings when the component mounts
// //   useEffect(() => {
// //     fetchBookings();
// //   }, []);

// //   const fetchBookings = async () => {
// //     try {
// //       const response = await axios.get("http://localhost:8080/bookings");
// //       setBookings(response.data);
// //     } catch (error) {
// //       console.error("Error fetching bookings", error);
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     console.log(formData);

// //     try {
// //       if (formData.id) {
// //         // Update existing booking
// //         const response = await axios.put(`http://localhost:8080/bookings/${formData.id}`, formData);
// //         setConfirmationMessage(`Booking updated for ${response.data.name}.`);
// //       } else {
// //         // Create new booking
// //         const response = await axios.post("http://localhost:8080/bookings", formData);
// //         setConfirmationMessage(`Booking confirmed for ${response.data.name}.`);
// //       }

// //       fetchBookings(); // Refresh the bookings list
// //       clearForm(); // Clear the form after submission
// //     } catch (error) {
// //       console.error("Error submitting the form", error);
// //     }
// //   };

// //   const editBooking = (booking) => {
// //     // Pre-fill the form with selected booking data for editing
// //     setFormData({
// //       id: booking.id, // Set ID for the booking to update
// //       name: booking.name,
// //       email: booking.email,
// //       phone: booking.phone,
// //       checkIn: booking.checkIn,
// //       checkOut: booking.checkOut,
// //       guests: booking.guests,
// //       specialRequests: booking.specialRequests,
// //     });
// //   };

// //   const deleteBooking = async (id) => {
// //     try {
// //       await axios.delete(`http://localhost:8080/bookings/${id}`);
// //       setConfirmationMessage("Booking deleted successfully.");
// //       fetchBookings(); // Refresh the bookings list
// //     } catch (error) {
// //       console.error("Error deleting the booking", error);
// //     }
// //   };

// //   const clearForm = () => {
// //     setFormData({
// //       id: null, // Reset ID after form is cleared
// //       name: "",
// //       email: "",
// //       phone: "",
// //       checkIn: "",
// //       checkOut: "",
// //       guests: 1,
// //       specialRequests: "",
// //     });
// //   };

// //   return (
// //     <div className="booking-form">
// //       <div className="form-content">
// //         <h2>Booking Form</h2>
// //         <form onSubmit={handleSubmit}>
// //           <label>
// //             Name:
// //             <input
// //               type="text"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               required
// //             />
// //           </label>
// //           <label>
// //             Email:
// //             <input
// //               type="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               required
// //             />
// //           </label>
// //           <label>
// //             Phone:
// //             <input
// //               type="tel"
// //               name="phone"
// //               value={formData.phone}
// //               onChange={handleChange}
// //               required
// //             />
// //           </label>
// //           <label>
// //             Check-In Date:
// //             <input
// //               type="date"
// //               name="checkIn"
// //               value={formData.checkIn}
// //               onChange={handleChange}
// //               required
// //             />
// //           </label>
// //           <label>
// //             Check-Out Date:
// //             <input
// //               type="date"
// //               name="checkOut"
// //               value={formData.checkOut}
// //               onChange={handleChange}
// //               required
// //             />
// //           </label>
// //           <label>
// //             Number of Guests:
// //             <input
// //               type="number"
// //               name="guests"
// //               value={formData.guests}
// //               onChange={handleChange}
// //               min="1"
// //               required
// //             />
// //           </label>
// //           <label>
// //             Special Requests:
// //             <textarea
// //               name="specialRequests"
// //               value={formData.specialRequests}
// //               onChange={handleChange}
// //               rows="4"
// //               placeholder="Any special requests?"
// //             />
// //           </label>
// //           <button type="submit">{formData.id ? "Update Booking" : "Confirm Booking"}</button>
// //         </form>

// //         {confirmationMessage && (
// //           <div className="confirmation-message">
// //             {confirmationMessage}
// //           </div>
// //         )}

// //         <h3>Current Bookings</h3>
// //         <ul>
// //           {bookings.map((booking) => (
// //             <li key={booking.id}>
// //               {booking.name} from {booking.checkIn} to {booking.checkOut} for {booking.guests} guest(s)
// //               <button onClick={() => editBooking(booking)}>Edit</button>
// //               <button onClick={() => deleteBooking(booking.id)}>Delete</button>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BookingForm;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./BookingForm.css";

// const BookingForm = () => {
//   const [formData, setFormData] = useState({
//     id: null,
//     name: "",
//     email: "",
//     phone: "",
//     checkIn: "",
//     checkOut: "",
//     guests: 1,
//     specialRequests: "",
//   });

//   const [bookings, setBookings] = useState([]);
//   const [confirmationMessage, setConfirmationMessage] = useState("");

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/bookings");
//       setBookings(response.data);
//     } catch (error) {
//       console.error("Error fetching bookings", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData); // Check form data before submission

//     try {
//       if (formData.id) {
//         // Update existing booking
//         const response = await axios.put(`http://localhost:8080/bookings/${formData.id}`, formData);
//         setConfirmationMessage(`Booking updated for ${response.data.name}.`);
//       } else {
//         // Create new booking
//         const response = await axios.post("http://localhost:8080/bookings", formData);
//         setConfirmationMessage(`Booking confirmed for ${response.data.name}.`);
//       }

//       fetchBookings(); // Refresh bookings list
//       clearForm(); // Clear form after submission
//     } catch (error) {
//       console.error("Error submitting the form", error);
//     }
//   };

//   const editBooking = (booking) => {
//     console.log("Editing booking:", booking); // Debugging line
//     setFormData({
//       id: booking.id,
//       name: booking.name,
//       email: booking.email,
//       phone: booking.phone,
//       checkIn: booking.checkIn,
//       checkOut: booking.checkOut,
//       guests: booking.guests,
//       specialRequests: booking.specialRequests,
//     });
//   };

//   const deleteBooking = async (id) => {
//     console.log("Deleting booking with ID:", id); // Debugging line
//     try {
//       await axios.delete(`http://localhost:8080/bookings/${id}`);
//       setConfirmationMessage("Booking deleted successfully.");
//       fetchBookings(); // Refresh bookings list
//     } catch (error) {
//       console.error("Error deleting the booking", error);
//     }
//   };

//   const clearForm = () => {
//     setFormData({
//       id: null,
//       name: "",
//       email: "",
//       phone: "",
//       checkIn: "",
//       checkOut: "",
//       guests: 1,
//       specialRequests: "",
//     });
//   };

//   return (
//     <div className="booking-form">
//       <div className="form-content">
//         <h2>Booking Form</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Name:
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Email:
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Phone:
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Check-In Date:
//             <input
//               type="date"
//               name="checkIn"
//               value={formData.checkIn}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Check-Out Date:
//             <input
//               type="date"
//               name="checkOut"
//               value={formData.checkOut}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Number of Guests:
//             <input
//               type="number"
//               name="guests"
//               value={formData.guests}
//               onChange={handleChange}
//               min="1"
//               required
//             />
//           </label>
//           <label>
//             Special Requests:
//             <textarea
//               name="specialRequests"
//               value={formData.specialRequests}
//               onChange={handleChange}
//               rows="4"
//               placeholder="Any special requests?"
//             />
//           </label>
//           <button type="submit">{formData.id ? "Update Booking" : "Confirm Booking"}</button>
//         </form>

//         {confirmationMessage && (
//           <div className="confirmation-message">
//             {confirmationMessage}
//           </div>
//         )}

//         <h3>Current Bookings</h3>
//         <ul>
//           {bookings.map((booking) => (
//             <li key={booking.id}>
//               {booking.name} from {booking.checkIn} to {booking.checkOut} for {booking.guests} guest(s)
//               <button onClick={() => editBooking(booking)}>Edit</button>
//               <button onClick={() => deleteBooking(booking.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default BookingForm;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookingForm.css";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    specialRequests: "",
  });

  const [bookings, setBookings] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:8080/bookings");
      setBookings(response.data);
      setErrorMessage(""); // Clear error message on successful fetch
    } catch (error) {
      setErrorMessage("Error fetching bookings. Please try again.");
      console.error("Error fetching bookings", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.id) {
        // Update existing booking
        const response = await axios.put(`http://localhost:8080/bookings/${formData.id}`, formData);
        setConfirmationMessage(`Booking updated for ${response.data.name}.`);
      } else {
        // Create new booking
        const response = await axios.post("http://localhost:8080/bookings", formData);
        setConfirmationMessage(`Booking confirmed for ${response.data.name}.`);
      }

      fetchBookings(); // Refresh bookings list
      clearForm(); // Clear form after submission
      setErrorMessage(""); // Clear error message on success
    } catch (error) {
      setErrorMessage("Error submitting the form. Please check the details.");
      console.error("Error submitting the form", error);
    }
  };

  const editBooking = (booking) => {
    setFormData({
      id: booking.id,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests,
      specialRequests: booking.specialRequests,
    });
    setErrorMessage(""); // Clear error message on edit
  };

  const deleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/bookings/${id}`);
      setConfirmationMessage("Booking deleted successfully.");
      fetchBookings(); // Refresh bookings list
      setErrorMessage(""); // Clear error message on success
    } catch (error) {
      setErrorMessage("Error deleting the booking. Please try again.");
      console.error("Error deleting the booking", error);
    }
  };

  const clearForm = () => {
    setFormData({
      id: null,
      name: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
      specialRequests: "",
    });
  };

  return (
    <div className="booking-form">
      <div className="form-content">
        <h2>Booking Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Check-In Date:
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Check-Out Date:
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Number of Guests:
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              min="1"
              required
            />
          </label>
          <label>
            Special Requests:
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows="4"
              placeholder="Any special requests?"
            />
          </label>
          <button type="submit">{formData.id ? "Update Booking" : "Confirm Booking"}</button>
        </form>

        {confirmationMessage && (
          <div className="confirmation-message">
            {confirmationMessage}
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <h3>Current Bookings</h3>
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              {booking.name} from {booking.checkIn} to {booking.checkOut} for {booking.guests} guest(s)
              <button onClick={() => editBooking(booking)}>Edit</button>
              <button onClick={() => deleteBooking(booking.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingForm;
