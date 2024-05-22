import { Link } from "react-router-dom";

export function OrganizerDashboard() {
  return (
    <>
      <h1>Organizer Dashboard</h1>
      <p>This is the organizer dashboard.</p>
      <p>You can manage your events here.</p>

      <h2>Actions</h2>
      <div className="d-flex gap-3">
        <button className="btn btn-primary">
          <Link to="/events" className="text-white">
            View Events
          </Link>
        </button>
        <button className="btn btn-primary">
          <Link to="/create-event" className="text-white">
            Create Event
          </Link>
        </button>
      </div>
    </>
  );
}
