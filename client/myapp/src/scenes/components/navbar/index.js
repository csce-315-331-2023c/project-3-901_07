import "./styles.css";
import shareTeaLogo from "../../../assets/images/sharetealogo.png";

function navBar() {
  return (
    <nav>
      <div id="circle">
      <img className="logo" src={shareTeaLogo} alt="Share Tea Logo" />
      </div>
      <div className="nav-wrapper">
        <div className="nav-wrapper-left-section">
          <ul>
            <li><button className = "signin-button">Accessibility</button></li>
          </ul>
        </div>
        <div className="nav-wrapper-right-section">
          <ul>
            <li><button className = "signin-button">Employee Sign In</button></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default navBar;