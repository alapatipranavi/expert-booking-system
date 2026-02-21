import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h3>Expert Booking</h3>
      <div>
        <Link to="/">Experts</Link>
        <Link to="/my-bookings">My Bookings</Link>
      </div>
    </div>
  );
}

export default Navbar;