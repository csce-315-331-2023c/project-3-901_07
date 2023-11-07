import "./styles.css";
import defaultToppingImage from "../../../../assets/images/boba.png";

function ToppingCard({topping, toppingClick}) {
    return(
        <div className = "toppingcard" onClick={toppingClick}>
            <img className="toppingcard-image" src={defaultToppingImage} alt="Default Topping" />
            <div className = "topingcard-name">
                {topping.name}
            </div>
            <div className = "toppingcard-price">
                ${topping.price}
            </div>

        </div>
    );

}

export default ToppingCard;