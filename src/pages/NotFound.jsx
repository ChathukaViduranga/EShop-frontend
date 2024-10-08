//Not Found Page

import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div>
      <h1>The page you are looking for does not exist.</h1>
      <p>
        please navigate to <Link to={"/"}>home</Link> page
      </p>
    </div>
  );
}

export default NotFound;
