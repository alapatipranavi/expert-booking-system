import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function MyBookings() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${API}/bookings?email=${email}`);
      setBookings(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getAutoStatus = (booking) => {
    const now = new Date();
    const bookingDateTime = new Date(booking.date);

    // Parse timeSlot (e.g. "10:00 AM")
    const timeParts = booking.timeSlot.match(/(\d+):(\d+) (\w+)/);

    if (timeParts) {
      let hours = parseInt(timeParts[1]);
      const minutes = parseInt(timeParts[2]);
      const period = timeParts[3];

      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      bookingDateTime.setHours(hours);
      bookingDateTime.setMinutes(minutes);
      bookingDateTime.setSeconds(0);
    }

    // 🔵 Completed if session time passed
    if (bookingDateTime < now) {
      return "Completed";
    }

    // 🟢 Confirmed after 5 seconds
    const createdAt = new Date(booking.createdAt);
    const diffInSeconds = (now - createdAt) / 1000;

    if (diffInSeconds > 5) {
      return "Confirmed";
    }

    // 🟡 Default
    return "Pending";
  };

  return (
    <div className="container">
      <h2>My Bookings</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={fetchBookings}>Search</button>

      <br /><br />

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((booking) => {
          const status = getAutoStatus(booking);

          return (
            <div key={booking._id} className="card">
              <h3>{booking.expert?.name}</h3>
              <p>Date: {new Date(booking.date).toDateString()}</p>
              <p>Time: {booking.timeSlot}</p>
              <p className={`status-${status.toLowerCase()}`}>
  Status: {status}
</p>            </div>
          );
        })
      )}
    </div>
  );
}

export default MyBookings;