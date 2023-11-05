
import "./styles.css";

function LeftPanel({ isClicked, handleLinkClick }) {

  return (
    <div className="leftpanel">
      <div className="leftpanel-category-component">
        <ul>
          <div className="leftpanel-category header">Categories</div>
          <li>
            <a onClick={() => handleLinkClick("milktea")} href="#milktea">
              <div
                className={
                  isClicked === "milktea"
                    ? "leftpanel-category item active"
                    : "leftpanel-category item"
                }
              >
                Milk Tea
              </div>
            </a>
          </li>
          <li>
          <a onClick={() => handleLinkClick("thaitea")} href="#thaitea">
              <div
                className={
                  isClicked === "thaitea"
                    ? "leftpanel-category item active"
                    : "leftpanel-category item"
                }
              >
                Thai Tea
              </div>
            </a>
          </li>
          <li>
            <div className="leftpanel-category item">Coffee</div>
          </li>
        </ul>
      </div>
      <div className="leftpanel-order-component"></div>
      <button className="leftpanel-checkout-button">Checkout</button>
    </div>
  );
}

export default LeftPanel;
