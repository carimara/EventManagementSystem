import { useState, useEffect } from "react";
import axios from "axios";

export function CreateEvent() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
    event_type: "",
  });
  const [eventTypes, setEventTypes] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/event_types/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setEventTypes(response.data);
      })
      .catch((error) => {
        console.log("Failed to fetch event types", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Получение токена из локального хранилища или другого источника
    const token = localStorage.getItem("access_token");

    axios
      .post("http://localhost:8000/api/events/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("Event created successfully!");
        // Очистить форму после успешного создания события
        setFormData({
          name: "",
          description: "",
          date: "",
          location: "",
          capacity: "",
          event_type: "",
        });
      })
      .catch((error) => {
        console.error("There was an error creating the event!", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div className="form-group">
          <label htmlFor="name">Event Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="datetime-local"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <div className="form-group">
            <label htmlFor="location">Capacity</label>
            <input
              type="number"
              className="form-control"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="event_type">Event Type</label>
            <select
              className="form-control"
              id="event_type"
              name="event_type"
              value={formData.event_type}
              onChange={handleChange}
              required
            >
              <option value="">Select Event Type</option>
              {eventTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Event
        </button>
      </form>
    </div>
  );
}
