import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:5000";

function ExpertList() {
  const [experts, setExperts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchExperts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/experts?search=${search}&category=${category}&page=${page}&limit=6`
      );

      setExperts(res.data.experts);
      setTotalPages(res.data.totalPages);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, [search, category, page]);

  return (
    <div className="container">
      <h2>Expert Listing</h2>

      {/* Search & Filter */}
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Career">Career</option>
        <option value="Fitness">Fitness</option>
        <option value="Finance">Finance</option>
      </select>

      <br /><br />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {experts.map((expert) => (
            <div key={expert._id} className="card">
              <h3>{expert.name}</h3>
              <p><strong>Category:</strong> {expert.category}</p>
              <p><strong>Experience:</strong> {expert.experience} years</p>
              <p><strong>Rating:</strong> ⭐ {expert.rating}</p>

              <Link to={`/expert/${expert._id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}

      <br />

      {/* Pagination */}
      <div>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ExpertList;