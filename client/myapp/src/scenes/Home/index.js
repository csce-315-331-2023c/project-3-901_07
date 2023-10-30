import "./styles.css";
import NavBar from './components/navbar';
import LeftPanel from './components/leftpanel';
import DrinkPanel from './components/drinkpanel';
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
