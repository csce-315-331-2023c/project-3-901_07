import "./styles.css";

function DrinkModal({toggleModal}) {

    return(
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Custom Drink</h2>
            <p>
              
            </p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
    );

}

export default DrinkModal;