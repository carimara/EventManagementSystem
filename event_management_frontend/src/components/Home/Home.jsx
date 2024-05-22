import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Home() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="home">
      <header className="jumbotron jumbotron-fluid text-center">
        <div className="container">
          <h1 className="display-4"> Eventify</h1>
          <p className="lead">Plan and manage your events with ease.</p>
          <div className=" d-flex justify-content-center gap-3">
            <Link to="/events" className="btn btn-primary btn-lg mt-3">
              Explore Events
            </Link>
            {user && user.profile.role === "organizer" ? (
              <Link to="/organizer" className="btn btn-light btn-lg mt-3">
                Organize Event
              </Link>
            ) : (
              <Link to="/register" className="btn btn-light btn-lg mt-3">
                Organize Event
              </Link>
            )}
          </div>
        </div>
      </header>
      <section className="features py-5 text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-4 align-self-center">
              <i className="fas fa-calendar-alt fa-3x mb-3"></i>
              <h3>Easy Event Planning</h3>
              <p>Plan your events effortlessly with out intuitive interface.</p>
            </div>
            <div className="col-md-8">
              <img
                className="img-fluid mb-3 mb-md-0"
                src={"/event-planning.svg"}
                alt="Event Planning"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <img src={"/organizing-event.svg"} alt="Organizing Event" />
            </div>
            <div className="col-lg-4 align-self-center">
              <i className="fas fa-users fa-3x mb-3"></i>
              <h3>Organize your events</h3>
              <p>Create and manage your events with ease.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 align-self-center">
              <i className="fas fa-chart-line fa-3x mb-3"></i>
              <h3>Analyze Your Events</h3>
              <p>Get insight and analytics on your event performance.</p>
            </div>
            <div className="col-md-8">
              <img src={"/analyze-amico.svg"} alt="Analyze your events" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
