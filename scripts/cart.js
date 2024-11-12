console.clear();
async function fetchProducts() {
    try {
      const response = await fetch("./jsons/product.json");
      const products = await response.json();
      renderProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }


if (localStorage.getItem("cartCounter") >= 0) {
  let counter = localStorage.getItem("cartCounter");
  document.getElementById("badge").innerHTML = counter;
}

let cartContainer = document.getElementById("cartContainer");

let boxContainerDiv = document.createElement("div");
boxContainerDiv.id = "boxContainer";

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob, itemCounter) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";
  boxContainerDiv.appendChild(boxDiv);

  let boxImg = document.createElement("img");
  boxImg.src = ob.preview;
  boxDiv.appendChild(boxImg);

  let boxh3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name + " × " + itemCounter);
  // let h3Text = document.createTextNode(ob.name)
  boxh3.appendChild(h3Text);
  boxDiv.appendChild(boxh3);

  let boxh4 = document.createElement("h4");
  let h4Text = document.createTextNode("Amount: Price" + ob.price);
  boxh4.appendChild(h4Text);
  boxDiv.appendChild(boxh4);

  // console.log(boxContainerDiv);

  buttonLink.appendChild(buttonText);
  cartContainer.appendChild(boxContainerDiv);
  cartContainer.appendChild(totalContainerDiv);
  let cartMain = document.getElementById("cartMainContainer");
  cartMain.appendChild(totalContainerDiv);

  return cartContainer;
}

let totalContainerDiv = document.createElement("div");
totalContainerDiv.id = "totalContainer";

let totalDiv = document.createElement("div");
totalDiv.id = "total";
totalContainerDiv.appendChild(totalDiv);

let totalh2 = document.createElement("h2");
let h2Text = document.createTextNode("Total Amount");
totalh2.appendChild(h2Text);
totalDiv.appendChild(totalh2);

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount) {
  let totalh4 = document.createElement("h4");
  // let totalh4Text = document.createTextNode(amount)
  let totalh4Text = document.createTextNode("Amount: price " + amount);
  totalh4Text.id = "toth4";
  totalh4.appendChild(totalh4Text);
  totalDiv.appendChild(totalh4);
  totalDiv.appendChild(buttonDiv);
  console.log(totalh4);
}

let buttonDiv = document.createElement("div");
buttonDiv.id = "button";
totalDiv.appendChild(buttonDiv);

let buttonTag = document.createElement("button");
buttonDiv.appendChild(buttonTag);

let buttonLink = document.createElement("a");
buttonLink.href = "orderPlace.html?";
buttonTag.appendChild(buttonLink);

buttonText = document.createTextNode("Place Order");
buttonTag.onclick = function () {
  console.log("clicked");
};
//dynamicCartSection()
// console.log(dynamicCartSection());

// BACKEND CALL

function renderProducts(products) {
let totalAmount = 0;
    if (products) {
      // console.log('call successful');
      contentTitle = products;

      let counter = Number(localStorage.getItem("cartCounter") || "0");
      document.getElementById("totalItem").innerHTML = "Total Items: " + counter;

      let item = JSON.parse(localStorage.getItem("orderList") || "[]");
      console.log(counter);
      console.log(item);
      console.log(item[0]);

      let i;
      let totalAmount = 0;
      for (i = 0; i < counter; i++) {
        let itemCounter = 1;
        for (let j = i + 1; j < counter; j++) {
          if (Number(item[j]) == Number(item[i])) {
            console.log(item[i]);
            itemCounter += 1;
          }
        }
        totalAmount += Number.parseInt(contentTitle[item[i] - 1].price) * itemCounter;
        dynamicCartSection(contentTitle[item[i] - 1], itemCounter);
        i += itemCounter - 1;
      }
      amountUpdate(totalAmount);
    }
    else {
        console.log("call failed!");
    }
}

// Fetch and render the products when the page loads
document.addEventListener("DOMContentLoaded", fetchProducts);
