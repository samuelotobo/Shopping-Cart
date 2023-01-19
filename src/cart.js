let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
      <div class="cart-item">
        <img width="100" src=${search.img} alt="" />
        <div class="details">

          <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
                <p class="cart-item-price">$ ${search.price}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>
          <div class="drink-options">
          <form>
          <select onChange="myFunction(this)" data-id="${id}" class="drink-selector">
            <option value="0">No Drink</option>
            <option value="5">Fanta</option>
            <option value="10">Coke</option>
          </select>
          </form>
        </div>
        <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>  
          
          <h3>$ ${item * search.price}</h3>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2 id="carttext">Cart is Empty</h2>
    <a href="shopping.html">
      <button class="HomeBtn">Back to Shopping Page</button>
    </a>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let myFunction = (select) => {
  let value = select.value;
  let id = select.getAttribute("data-id");  
  let search = basket.find((x) => x.id === id);
  search.drink = value;
  let searchPrice = shopItemsData.find((x) => x.id === id);
  searchPrice.price += parseInt(value);
  generateCartItems();
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

function adam() {
  let totalCost = basket .map((x) => {
      let { id, item } = x;
      let search = shopItemsData.find((y) => y.id === id) || [];
      return item * search.price;
    })
    .reduce((x, y) => x + y, 0);
  
  let deliveryCost = 0;
  if (totalCost < 1000) {
    deliveryCost = totalCost * 0.1;
    totalCost += deliveryCost;
  } else{
    
  };
  confirm( `The total cost of your order is $${totalCost} including $${deliveryCost} delivery cost. Do you accept the calculated total cost for payment?`);
};

function sammy() {
  var x = document.getElementById("pay");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        if((item * search.price)>1000){
        return (((item * search.price)*0.10) + (item * search.price))} else{
        return (item * search.price)}
        

      })
      .reduce((x, y) => x + y, 0);
      
      ``
    // console.log(amount);
    label.innerHTML = `
    <h2 id="carttext"> For your Total Bill Click the checkout button </h2>
    <button onclick="sammy()" class="checkout">Enter Card Info</button>
    <button id="checkout-btn1" onclick="adam()">Check Out</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
  <br>
  <div id="pay">
        <div  class="pay-cart">
            <table>
            <tr>
            <td>
                <input type="radio" id="visa" name="payment" value="visa" onclick="uncheckOther('visa')"> Visa
            </td>
            <td>
                <input type="radio" id="mastercard" name="payment" value="mastercard" onclick="uncheckOther('mastercard')"> Mastercard
            </td>
        </tr>
                <tr>
                    <td><label for=" " id="text">Name on the card</label></td>
                    <td><input type="text" placeholder="Caroline Victor Tiyah" id="cardname"  required></td>
                </tr>
                <tr>
                <td><label for=" " id="text">Card Number</label></td>
                <td><input type="number" class="exp" id="day" class="exp" maxlength="4" placeholder="0000" required>
                <input type="number" class="exp" id="month"  class="exp" maxlength="4"  placeholder="1111" required>
              <input type="number" class="exp" id="month" class="exp" maxlength="4"  placeholder="2222"  required>
                <input type="number" class="exp"  id="month" class="exp" maxlength="4"  placeholder="3333"  required></td>
                </tr>
                     <tr>
                <td><label for="" id="text">Expiry Date</label></td>
                <td> 
                Month <select><option>1</option><option>2</option><option>3</option><option>4</option>
                              <option>5</option><option>6</option><option>7</option><option>8</option><option>9</option>
                              <option>10</option><option>11</option><option>12</option>
                      </select>
                Year  <select><option>23</option><option>24</option><option>25</option><option>26</option>
                              <option>25</option><option>26</option>
                      </select>
            </tr>
            <tr>
                <td><label for="" id="text">CVV</label></td>
                <td><input type="number"  maxlength="4" id="cvv" required></td>
            </tr>        
        </div>
</div>

    

    `;
  } else return;
};


TotalAmount();
