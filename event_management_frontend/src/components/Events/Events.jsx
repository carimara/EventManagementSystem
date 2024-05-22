import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function Events() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/events/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log("Failed to fetch events", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Upcoming Events</h2>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4 mb-4" key={event.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.description}</p>
                <Link to={`/events/${event.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
