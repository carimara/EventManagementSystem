import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    event: "",
    count: 1,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/bookings/", formData)
      .then((response) => {
        console.log(response.data);
        navigate("/booking-success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mt-5 p-5 ">
      <h2 className="mb-4">Booking</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="event">Event</label>
          <input
            type="text"
            className="form-control"
            id="event"
            value={formData.event}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="event">Count</label>
          <input
            type="text"
            className="form-control"
            id="event"
            value={formData.count}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary  btn-lg">
          Book Now
        </button>
      </form>
    </div>
  );
}
