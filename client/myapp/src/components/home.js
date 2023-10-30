import "./home.css";
import NavBar from './navBar';
import LeftPanel from './leftPanel';
import DrinkPanel from './drinkPanel';
function home() {
  return (
    <div className = "box">
        <NavBar />
        <div className = "row content">
            <LeftPanel />
            <span className = "divider"></span>
            <DrinkPanel />
        </div>
    </div>

  );
}

export default home;
