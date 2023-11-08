import "./styles.css";
import defaultToppingImage from "../../../../assets/images/boba.png";

function ToppingCard({topping, toppingClick}) {
    return(
        <div className = "toppingcard" onClick={toppingClick}>
            <img className="toppingcard-image" src={defaultToppingImage} alt="Default Topping" />
            <div className = "topingcard-text">
                {topping.name} <br /> ${topping.price}
            </div>

        </div>
    );

}

export default ToppingCard;