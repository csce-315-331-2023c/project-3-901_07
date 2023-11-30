import "./styles.css";
import defaultDrinkImage from "../../../../assets/images/drinks/defaultdrinkimage.png";

function DrinkCard({toggleModal,drinkProperties}) {
    // console.log(`${drinkProperties.name.toLowerCase()}.png`);
    function getDrinkImage() {
            try {
                const imagePath = require(`../../../../assets/images/drinks/${drinkProperties.name.toLowerCase()}.png`);
                return imagePath;
            } catch (err) {
                return defaultDrinkImage;
            }
  
    }


    return(
        <div className = "drinkcard" onClick={toggleModal}>
            <img className="drinkcard-image" src={getDrinkImage()} alt="Default Drink" />
            <div className = "drinkcard-name">
                {drinkProperties.name}
            </div>
            <div className = "drinkcard-price">
                ${drinkProperties.price}
            </div>

        </div>
    );

}

export default DrinkCard;