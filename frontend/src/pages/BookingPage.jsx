import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000";

function BookingPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const dateParam = searchParams.get("date");
  const timeSlot = searchParams.get("time");

  const date = new Date(dateParam);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      alert("All fields required");
      return;
    }

    try {
      await axios.post(`${API}/bookings`, {
        expertId: id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: date.toISOString(),
        timeSlot,
        notes: formData.notes
      });

      // Show success message
      setSuccess(true);

      // Redirect after 1.5 sec
      setTimeout(() => {
        navigate(`/expert/${id}`);
      }, 1500);

    } catch (error) {
      if (error.response?.status === 400) {
        alert(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Book Slot</h2>

        <p>
          <b>{date.toDateString()}</b> - <b>{timeSlot}</b>
        </p>

        {success && (
          <p style={{ color: "green", fontWeight: "bold" }}>
            Slot Booked Successfully! Redirecting...
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <br /><br />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <br /><br />

          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <br /><br />

          <textarea
            placeholder="Notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />
          <br /><br />

          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;