import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ConfirmationPage.css"; // Assuming the CSS file exists for styling

const ConfirmationPage = () => {
  const location = useLocation();
  const [bookingDetails, setBookingDetails] = useState(location.state || {});
  const navigate = useNavigate();

  // Fetch booking details if there's an ID (Read operation)
  useEffect(() => {
    if (!bookingDetails.id) {
      console.error("Booking ID is missing.");
      return;
    }

    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/bookings/${bookingDetails.id}`);
        setBookingDetails(response.data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBooking();
  }, [bookingDetails.id]);

  // Edit (Update) functionality
  const handleEdit = () => {
    if (!bookingDetails.id) {
      console.error("No booking ID available for editing.");
      return;
    }
  
    navigate("/edit", { state: { ...bookingDetails } });
  };
  

  // Delete functionality
  const handleDelete = async () => {
    if (!bookingDetails.id) {
      console.error("No booking ID available for deletion.");
      return;
    }
  
    try {
      await axios.delete(`http://localhost:8080/bookings/${bookingDetails.id}`);
      console.log("Booking deleted successfully.");
      
      // Navigate to homepage after deletion
      navigate("/");
    } catch (error) {
      console.error("Error deleting the booking:", error);
    }
  };
  
  

  // Create or Update functionality handled through a form
  const handleCreateOrUpdate = async (e) => {
    e.preventDefault(); // Prevent form refresh
  
    try {
      let response;
  
      if (bookingDetails.id) {
        // Update existing booking
        response = await axios.put(`http://localhost:8080/bookings/${bookingDetails.id}`, bookingDetails);
        console.log("Booking updated successfully:", response.data);
      } else {
        // Create new booking
        response = await axios.post("http://localhost:8080/bookings", bookingDetails);
        console.log("Booking created successfully:", response.data);
      }
  
      // Navigate to the confirmation page after update or creation
      navigate("/confirmation", { state: response.data });
  
    } catch (error) {
      console.error("Error creating/updating booking:", error);
    }
  };
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name.startsWith("place.")) {
      // Handle nested place object
      const placeKey = name.split(".")[1];
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        place: {
          ...prevDetails.place,
          [placeKey]: value,
        },
      }));
    } else {
      // Handle other fields
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };
  

  return (
    <div className="confirmation-page">
      <h1>Booking Confirmation</h1>
      <h2>Your Booking Details:</h2>
      <p><strong>Place:</strong> {bookingDetails.place?.name || "N/A"}</p>
      <p><strong>Location:</strong> {bookingDetails.place?.place || "N/A"}</p>
      <p><strong>Price:</strong> ${bookingDetails.place?.price || "N/A"} per night</p>
      <p><strong>Check-in Date:</strong> {bookingDetails.checkInDate || "N/A"}</p>
      <p><strong>Check-out Date:</strong> {bookingDetails.checkOutDate || "N/A"}</p>
      <p><strong>Number of Guests:</strong> {bookingDetails.numberOfGuests || "N/A"}</p>
      {bookingDetails.specialRequests && <p><strong>Special Requests:</strong> {bookingDetails.specialRequests}</p>}

      <div className="button-group">
        <button onClick={handleEdit} className="edit-btn">Edit Booking</button>
        <button onClick={handleDelete} className="delete-btn">Delete Booking</button>
      </div>

      {/* Form to update or create new booking */}
      <div className="form-section">
        <h2>{bookingDetails.id ? "Update" : "Create"} Booking</h2>
        <form onSubmit={handleCreateOrUpdate}>
          <label>
            Place Name:
            <input
              type="text"
              name="place.name"
              value={bookingDetails.place?.name || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="place.place"
              value={bookingDetails.place?.place || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Price per Night:
            <input
              type="number"
              name="place.price"
              value={bookingDetails.place?.price || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Check-in Date:
            <input
              type="date"
              name="checkInDate"
              value={bookingDetails.checkInDate || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Check-out Date:
            <input
              type="date"
              name="checkOutDate"
              value={bookingDetails.checkOutDate || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Number of Guests:
            <input
              type="number"
              name="numberOfGuests"
              value={bookingDetails.numberOfGuests || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Special Requests:
            <textarea
              name="specialRequests"
              value={bookingDetails.specialRequests || ""}
              onChange={handleChange}
            />
          </label>
          <button type="submit">
            {bookingDetails.id ? "Update Booking" : "Create Booking"}
          </button>
        </form>
      </div>

      <button onClick={() => navigate("/")} className="back-btn">Back to Home</button>
    </div>
  );
};

export default ConfirmationPage;
