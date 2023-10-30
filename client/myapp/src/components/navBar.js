import "./navbar.css";
import shareTeaLogo from "../assets/images/sharetealogo.png";

function navBar() {
  return (
    <nav>
        <div id="circle"></div>
      <img className="logo" src={shareTeaLogo} alt="Share Tea Logo" />
      <div className="nav-wrapper">
        <ul>
          <li>
            <button>Employee Sign In</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default navBar;