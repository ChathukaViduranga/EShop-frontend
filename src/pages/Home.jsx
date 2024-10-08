import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Home() {
  const navigate = useNavigate();
  const checkUser = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <div className="container vh-100 d-flex align-items-center">
      <div className="row w-100">
        <div className="col-md-6 d-flex justify-content-center">
          <img
            src="Home.png"
            className="img-fluid"
            style={{ width: "100%" }}
            alt="Home"
          />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <blockquote className="blockquote">
            <p className="mb-0 display-4 ">
              " The only way to do great work is to love what you do."
            </p>
            <footer className="blockquote-footer mt-4">
              <cite title="Source Title">Steve Jobs</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default Home;
