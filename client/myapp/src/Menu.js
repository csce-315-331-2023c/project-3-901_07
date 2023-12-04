import React, { useEffect, useState } from "react";
import './Menu.css';
import shareTeaLogo from './assets/images/sharetealogo.png';
import LandingNav from "./scenes/Home/components/LandingNav/index.js";


//creama
import creamaImage from "./assets/images/drinks/coffee creama.png";
import mangoCreama from "./assets/images/drinks/mango creama.png";
import teaCreama from "./assets/images/drinks/tea.png";
import wintermelonCreama from "./assets/images/drinks/wintermelon creama.png";
import matchaCreama from "./assets/images/drinks/matcha creama.png";

//fresh milk
import handmadeTaro from "./assets/images/drinks/handmade taro with fresh milk.png";
import freshMilkTea from "./assets/images/drinks/fresh milk tea.png";
import wintermelonFreshMilk from "./assets/images/drinks/wintermelon with fresh milk.png";
import cocoaLoverFreshMilk from "./assets/images/drinks/cocoa lover with fresh milk.png";
import freshMilkFamily from "./assets/images/drinks/fresh milk family.png";

//fruit tea
import mangoFruitTea from "./assets/images/drinks/mango green tea.png";
import honeyLemonade from "./assets/images/drinks/honey lemonade.png";
import strawberryTea from "./assets/images/drinks/strawberry tea.png";
import peachKiwiTea from "./assets/images/drinks/peach kiwi tea.png";
import wintermelonLemonade from "./assets/images/drinks/wintermelon lemonade.png";

//ice blended
import milkTeaIceBlended from "./assets/images/drinks/milk tea ice blended.png";
import matchaRedBeanIceBlended from "./assets/images/drinks/matcha red bean ice blended.png";
import strawberryIceBlended from "./assets/images/drinks/strawberry ice blended.png";
import taroIceBlended from "./assets/images/drinks/taro ice blended.png";
import oreoIceBlended from "./assets/images/drinks/oreo ice blended.png";

//milk tea
import thaiMilkTea from "./assets/images/drinks/thai milk tea.png";
import taroMilkTea from "./assets/images/drinks/taro milk tea.png";
import matchaRedBeanMilkTea from "./assets/images/drinks/matcha red bean milk tea.png";
import honeyMilkTea from "./assets/images/drinks/honey milk tea.png";
import mangoGreenMilkTea from "./assets/images/drinks/mango green milk tea.png";

//mojito
import limeMojito from "./assets/images/drinks/lime mojito.png";
import peachMojito from "./assets/images/drinks/peach mojito.png";
import tajinLatte from "./assets/images/drinks/defaultdrinkimage.png";
import mangoMojito from "./assets/images/drinks/mango mojito.png";
import strawberryMojito from "./assets/images/drinks/strawberry mojito.png";




function Menu() {
  const [currView, setCurrView] = useState("customer");
  const [drinkAndToppingData, setdrinkAndToppingData] = useState(false);
  const webServerAddress = process.env.REACT_APP_WEB_SERVER_ADDRESS;
  useEffect(() => {
    async function fetchData() {
      try {
        const response_drink = await fetch(webServerAddress + "/menu_item", {
          mode: "cors",
        });
        console.log(response_drink);
        const drink_data = await response_drink.json();

        const response_topping = await fetch(webServerAddress + "/topping", {
          mode: "cors",
        });
        const topping_data = await response_topping.json();

        const formattedData = {
          menu_items: drink_data,
          toppings: topping_data,
        };
        setdrinkAndToppingData(formattedData);
      } catch {
        //console.log("error");
      }
    }
    fetchData();
  }, [webServerAddress]);


  const creamaDrinksInfo = [
    {
      name: 'Wintermelon Creama',
      image: wintermelonCreama,
      description: 'A sweet and refreshing taste of wintermelon topped with a creamy layer.'
    },
    {
      name: 'Coffee Creama',
      image: creamaImage,
      description: 'A perfect blend of bold coffee and smooth cream foam.'
    },
    {
      name: 'Mango Creama',
      image: mangoCreama,
      description: 'Tropical mango goodness finished with a velvety cream.'
    },
    {
      name: 'Matcha Creama',
      image: matchaCreama,
      description: 'Rich and earthy matcha balanced with a creamy froth.'
    },
    {
      name: 'Tea Creama',
      image: teaCreama,
      description: 'Classic brewed tea with a twist of creamy froth on top.'
    },
  ];

  const freshMilkDrinksInfo = [
    {
      name: "Handmade Taro with Fresh Milk",
      image: handmadeTaro,
      description: "A rich and creamy delight, our handmade taro blend offers a sweet and nutty flavor combined with fresh milk."
    },
    {
      name: "Fresh Milk Tea",
      image: freshMilkTea,
      description: "The classic milk tea, made with freshly brewed tea leaves and topped with a generous amount of creamy milk."
    },
    {
      name: "Wintermelon with Fresh Milk",
      image: wintermelonFreshMilk,
      description: "Enjoy the unique, refreshing taste of wintermelon perfectly complemented by the richness of fresh milk."
    },
    {
      name: "Cocoa Lover with Fresh Milk",
      image: cocoaLoverFreshMilk,
      description: "For chocolate lovers, a heavenly mix of rich cocoa with smooth fresh milk."
    },
    {
      name: "Fresh Milk Family",
      image: freshMilkFamily,
      description: "A family favorite, featuring the simple goodness of fresh milk in a comforting and familiar taste."
    }
  ];
  const fruitTeaDrinksInfo = [
    {
      name: "Mango Green Tea",
      image: mangoFruitTea,
      description: "Refreshing green tea balanced with the sweetness of ripe mango."
    },
    {
      name: "Honey Lemonade",
      image: honeyLemonade,
      description: "Sweet and tangy lemonade sweetened with natural honey."
    },
    {
      name: "Strawberry Tea",
      image: strawberryTea,
      description: "A delightful tea infused with the flavor of fresh strawberries."
    },
    {
      name: "Peach Kiwi Tea",
      image: peachKiwiTea,
      description: "A tropical mix of peach and kiwi flavors, blended into a delightful tea."
    },
    {
      name: "Wintermelon Lemonade",
      image: wintermelonLemonade,
      description: "A unique twist on lemonade with the addition of wintermelon for an extra refreshing taste."
    }
  ];


  const iceBlendDrinksInfo = [
    {
      name: "Milk Tea Ice Blended",
      image: milkTeaIceBlended,
      description: "Classic milk tea flavor with a refreshing icy twist."
    },
    {
      name: "Matcha Red Bean Ice Blended",
      image: matchaRedBeanIceBlended,
      description: "Rich matcha and sweet red beans blended into a frosty treat."
    },
    {
      name: "Strawberry Ice Blended",
      image: strawberryIceBlended,
      description: "Frozen strawberries blended smooth for a sweet, cool beverage."
    },
    {
      name: "Taro Ice Blended",
      image: taroIceBlended,
      description: "Creamy taro flavor meets icy refreshment."
    },
    {
      name: "Oreo Ice Blended",
      image: oreoIceBlended,
      description: "Crumbled Oreo cookies in a creamy, ice-cold blend."
    }
  ];


  const milkTeaDrinksInfo = [
    {
      name: "Thai Milk Tea",
      image: thaiMilkTea,
      description: "Aromatic Thai tea with a creamy swirl."
    },
    {
      name: "Taro Milk Tea",
      image: taroMilkTea,
      description: "Sweet and creamy taro flavor in a smooth milk tea."
    },
    {
      name: "Matcha Red Bean Milk Tea",
      image: matchaRedBeanMilkTea,
      description: "Green matcha and sweet red beans in a comforting milk tea."
    },
    {
      name: "Honey Milk Tea",
      image: honeyMilkTea,
      description: "Sweet honey perfectly blended with classic milk tea."
    },
    {
      name: "Mango Green Milk Tea",
      image: mangoGreenMilkTea,
      description: "Fresh mango flavor paired with delicate green tea."
    }
  ];

  const mojitoDrinksInfo = [
    {
      name: "Lime Mojito",
      image: limeMojito,
      description: "Refreshing mint and zesty lime combined in a classic mojito."
    },
    {
      name: "Peach Mojito",
      image: peachMojito,
      description: "Juicy peach flavors adding a sweet twist to the traditional mojito."
    },
    {
      name: "Tajin Latte",
      image: tajinLatte,
      description: "A unique latte experience spiced with Tajin for an extra kick."
    },
    {
      name: "Mango Mojito",
      image: mangoMojito,
      description: "Tropical mango with a hint of mint for a fruity mojito variation."
    },
    {
      name: "Strawberry Mojito",
      image: strawberryMojito,
      description: "Fresh strawberries muddled with mint for a berry delicious mojito."
    }
  ];
  

  return (
    <>
      {/* Top bar with logo and decorative element */}
      <LandingNav currView={currView} setCurrView={setCurrView} />

      <div className="menu-board">
        {drinkAndToppingData &&
        Object.entries(drinkAndToppingData.menu_items).map(([category, items]) => {
          const isCreamaCategory = category.toLowerCase() === 'creama';
          const isFreshMilkCategory = category.toLowerCase() === 'fresh milk';
          const isFruitTeaCategory = category.toLowerCase() === 'fruit tea';
          const isIceBlendCategory = category.toLowerCase() === 'ice blend';
          const isMilkTeaCategory = category.toLowerCase() === 'milk tea';
          const isMojitoCategory = category.toLowerCase() === 'mojito';
          return (
            <div className="menu-category" id={category.replace(/\s+/g, '-').toLowerCase()} key={category}>
              <h3>{category}</h3>
              {/* If the category is Creama, display the image */}
              <div className="menu-category-items">
                {items.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">${item.price}</div>
                  </div>
                ))}
                {isCreamaCategory && (
                  <div className="creama-drinks-grid">
                    {creamaDrinksInfo.map((drink, index) => (
                      <div key={index} className="creama-drink-container">
                        <img src={drink.image} alt={drink.name} className="creama-image" />
                        <div className="creama-drink-info">
                          <p className="creama-drink-name">{drink.name}</p>
                          <p className="creama-drink-description">{drink.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {isFreshMilkCategory && (
                    <div className="fresh-milk-drinks-grid">
                      {freshMilkDrinksInfo.map((drink, index) => (
                        <div key={index} className="fresh-milk-drink-container">
                          <img src={drink.image} alt={drink.name} className="fresh-milk-image" />
                          <div className="fresh-milk-drink-info">
                            <p className="fresh-milk-drink-name">{drink.name}</p>
                            <p className="fresh-milk-drink-description">{drink.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                )}
                {isFruitTeaCategory && (
                  <div className="fruit-tea-drinks-grid">
                    {fruitTeaDrinksInfo.map((drink, index) => (
                      <div key={index} className="fruit-tea-drink-container">
                        <img src={drink.image} alt={drink.name} className="fruit-tea-image" />
                        <div className="fruit-tea-drink-info">
                          <p className="fruit-tea-drink-name">{drink.name}</p>
                          <p className="fruit-tea-drink-description">{drink.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {isIceBlendCategory && (
                  <div className="ice-blend-drinks-grid">
                    {iceBlendDrinksInfo.map((drink, index) => (
                      <div key={index} className="ice-blend-drink-container">
                        <img src={drink.image} alt={drink.name} className="ice-blend-image" />
                        <div className="ice-blend-drink-info">
                          <p className="ice-blend-drink-name">{drink.name}</p>
                          <p className="ice-blend-drink-description">{drink.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {isMilkTeaCategory && (
                  <div className="milk-tea-drinks-grid">
                    {milkTeaDrinksInfo.map((drink, index) => (
                      <div key={index} className="milk-tea-drink-container">
                        <img src={drink.image} alt={drink.name} className="milk-tea-image" />
                        <div className="milk-tea-drink-info">
                          <p className="milk-tea-drink-name">{drink.name}</p>
                          <p className="milk-tea-drink-description">{drink.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {isMojitoCategory && (
                  <div className="mojito-drinks-grid">
                    {mojitoDrinksInfo.map((drink, index) => (
                      <div key={index} className="mojito-drink-container">
                        <img src={drink.image} alt={drink.name} className="mojito-image" />
                        <div className="mojito-drink-info">
                          <p className="mojito-drink-name">{drink.name}</p>
                          <p className="mojito-drink-description">{drink.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>

  );
}

export default Menu;