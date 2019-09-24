// variables

const items = document.querySelector("#cosmetics-list"),
  shoppingCart = document.querySelector("#cart__content tbody"),
  clearCart = document.querySelector("#clear__cart");

// event listeners

eventListeners();

function eventListeners() {
  items.addEventListener("click", addItem);
  shoppingCart.addEventListener("click", removeFromCart);
  clearCart.addEventListener("click", removeAllItems);

  document.addEventListener('DOMContentLoaded', getFromLocalStorage);

}

// functions

function addItem(e) {
  e.preventDefault();

  if (e.target.classList.contains("add-to-cart")) {
    const item = e.target.parentElement.parentElement;
    getInfoItem(item);
  }
}

const getInfoItem = item => {
  const itemInfo = {
    image: item.querySelector("img").src,
    title: item.querySelector("h4").textContent,
    price: item.querySelector("span").innerHTML,
    id: item.querySelector("a").getAttribute("data-id")
  };

  itemsInCart(itemInfo);
};

const itemsInCart = item => {
  const inCart = document.createElement("tr");
  inCart.innerHTML = `
            <tr>
                <td class="new__item--img">
                    <img src="${item.image}">
                </td>
                <td class="new__item--text">${item.title}</td>
                <td class="new__item--price">${item.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${item.id}">X</a>
                </td>
            </tr>       
    `;
  shoppingCart.appendChild(inCart);

  saveIntoStorage(item);
};


function removeFromCart(e) {
    let item, itemId;

  if (e.target.classList.contains("remove")) {
    e.target.parentElement.parentElement.remove();
    item = e.target.parentElement.parentElement;
    itemId = item.querySelector('a').getAttribute('data-id');
  }
  removeItemLocalStorage(itemId);
}

function removeAllItems() {
  shoppingCart.textContent = "";

  clearLocalStorage();
}

function clearLocalStorage() {
    localStorage.clear();
}



function saveIntoStorage(item) {
    let items = getItemsFromStorage();

    // add the course into the array
    items.push(item);

    // convert JSON into string 
    localStorage.setItem('items', JSON.stringify(items) );

}

// get the content from storage 
function getItemsFromStorage() {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items') );
    }
    return items;

}


// remove from LS
function removeItemLocalStorage(id) {
    //get the LS data
    let itemsLS = getItemsFromStorage();

    //  loop through the array and find the index to remove 
    itemsLS.forEach(function(itemLS, index) {
        if(itemLS.id === id) {
            itemsLS.splice(index, 1);
        }
    });

    // add the rest of the array
    localStorage.setItem('items', JSON.stringify(itemsLS) );
}

function getFromLocalStorage() {
    let itemsLS = getItemsFromStorage();

    // LOOP throught the courses and prin into the cart
    itemsLS.forEach(function(item) {
        const inCart = document.createElement("tr");
            inCart.innerHTML = `
                <tr>
                    <td class="new__item--img">
                        <img src="${item.image}">
                    </td>
                    <td class="new__item--text">${item.title}</td>
                    <td class="new__item--price">${item.price}</td>
                    <td>
                        <a href="#" class="remove" data-id="${item.id}">X</a>
                    </td>
                </tr>       
            `;

            shoppingCart.appendChild(inCart);
    });
};