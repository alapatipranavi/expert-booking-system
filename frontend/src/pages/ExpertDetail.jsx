import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000";

function ExpertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expert, setExpert] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Generate next 7 days
  const generateNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(new Date(date));
    }
    return days;
  };

  // Category based slots
  const getSlotsByCategory = (category, day) => {
    const dayName = day.toLocaleDateString("en-US", { weekday: "long" });

    if (category === "Fitness" && dayName === "Sunday") {
      return [];
    }

    const slots = {
      Career: ["10:00 AM", "11:00 AM", "5:00 PM"],
      Fitness: ["6:00 AM", "7:00 AM", "6:00 PM"],
      Finance: ["3:00 PM", "4:00 PM"]
    };

    return slots[category] || [];
  };

  // Check booked
  const isSlotBooked = (date, timeSlot) => {
    return bookings.some((b) => {
      const bookingDate = new Date(b.date);
      return (
        bookingDate.toDateString() === date.toDateString() &&
        b.timeSlot === timeSlot
      );
    });
  };

  // Check expired (today past time)
  const isSlotExpired = (date, timeSlot) => {
    const now = new Date();
    const slotDateTime = new Date(date);

    const timeParts = timeSlot.match(/(\d+):(\d+) (\w+)/);

    if (timeParts) {
      let hours = parseInt(timeParts[1]);
      const minutes = parseInt(timeParts[2]);
      const period = timeParts[3];

      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      slotDateTime.setHours(hours);
      slotDateTime.setMinutes(minutes);
      slotDateTime.setSeconds(0);
    }

    return slotDateTime < now;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expertRes = await axios.get(`${API}/experts/${id}`);
        setExpert(expertRes.data);

        const bookingRes = await axios.get(`${API}/bookings/expert/${id}`);
        setBookings(bookingRes.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!expert) return <div className="container"><p>Expert Not Found</p></div>;

  const next7Days = generateNext7Days();

  return (
    <div className="container">
      <h2>{expert.name}</h2>

      <div className="card">
        <p>Category: {expert.category}</p>
        <p>Experience: {expert.experience} years</p>
        <p>Rating: ⭐ {expert.rating}</p>
      </div>

      <h3>Available Slots (Next 7 Days)</h3>

      {next7Days.map((day, index) => {
        const slots = getSlotsByCategory(expert.category, day);

        return (
          <div key={index} className="card">
            <h4>{day.toDateString()}</h4>

            {slots.length === 0 ? (
              <p>No slots available</p>
            ) : (
              <div className="slot-container">
                {slots.map((slot) => {
                  const booked = isSlotBooked(day, slot);
                  const expired = isSlotExpired(day, slot);

                  return (
                    <button
                      key={slot}
                      className={`slot-button ${
                        booked || expired ? "slot-booked" : ""
                      }`}
                      disabled={booked || expired}
                      onClick={() =>
                        navigate(
                          `/expert/${id}/book?date=${day.toISOString()}&time=${slot}`
                        )
                      }
                    >
                      {slot}
                      {booked && " ✓ Booked"}
                      {!booked && expired && " ⏰ Expired"}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ExpertDetail;