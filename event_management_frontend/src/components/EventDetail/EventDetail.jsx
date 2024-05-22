import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/events/${id}/`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setEvent(response.data);
      })
      .catch((error) => {
        console.log("Failed to fetch event", error);
      });
  }, [id]);

  if (!event) return <p>Loading...</p>;
  return (
    <div className="container mt-5">
      <h2 className="mb-4">{event.name}</h2>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleString()}</p>
      <p>
        <strong>Location: </strong> {event.location}
      </p>
      <p>Organizer: {event.created_by}</p>
      <p>Capacity: {event.capacity}</p>

      <button className="btn btn-primary">
        <Link to={`/booking/`} className="text-white">
          {" "}
          Book Now
        </Link>
      </button>
    </div>
  );
}
