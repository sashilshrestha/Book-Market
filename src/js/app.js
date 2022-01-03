const searchResultDiv = document.querySelector('.book-container');
const cartitemsEl = document.querySelector('.cart-list-item');
const subtotalEl = document.querySelector('.subtotal');
const cartNumberEl = document.querySelector('.cart-number-counter');
let alertEl = document.querySelector('#alert');

const baseURL = `https://book-set-task.herokuapp.com/api/list_books`;
const response = await fetch(baseURL);
const books = await response.json();

// Fetching API
async function fetchAPI() {
    let genreInput = document.getElementById('genreBtn').value;
    selectGrid(books, genreInput);
}

// Data to display
function selectGrid(results, genreInput) {
    let gHTML = '';

    results.map((result, key) => {
        let dramaCat = result.genre;
        let state = dramaCat.includes(genreInput, 0);

        if (state) {
            let dollarPrice = result.price;
            let newdollar = dollarPrice.substr(1, dollarPrice.length);
            let intdollar = parseFloat(newdollar);
            let nepaliPriceFloat = intdollar * 118;
            let nepaliPrice = parseInt(nepaliPriceFloat);

            gHTML += `                
            <div class="book-card">
                <div class="left-book">
                    <img
                        src="${result.image} / ${result.genre}"
                        alt=""
                    />
                    <div class="img-overlay"></div>
                </div>
                <div class="right-book">
                    <h1 class="title">${result.name}</h1>
                    <p class="author">by ${result.author}</p>
                    <span class="genre-cat">${result.genre}</span>
                    <h3 class="price">Rs. ${nepaliPrice}</h3>
                    <button class="add-to-cart" onclick="addToCart(${result.id})">Add to Cart</button>
                </div>
            </div>     
                `;
        }
    });
    searchResultDiv.innerHTML = gHTML;
}
fetchAPI();

// Calling data on change
const genre = document.getElementById('genreBtn');
genre.addEventListener('change', () => {
    fetchAPI();
});

//Cart Array
let cart_arr = JSON.parse(localStorage.getItem('Cart')) || [];
updateCart();

function addClass(className, idx) {
    alertEl.classList.add(className);
    setTimeout(function () {
        alertEl.classList.remove(className);
    }, 2000);
}

// Add to Cart
window.addToCart = (id) => {
    // check if book already exist in cart
    if (cart_arr.some((item) => item.id === id)) {
        changeNumber('plus', id);
        addClass('show');
    } else {
        let totalCartItems = cart_arr.length + 1;
        if (totalCartItems < 6) {
            const item = books.find((books) => books.id === id);
            cart_arr.push({
                ...item,
                numberOfUnits: 1,
            });
            updateCart();
            addClass('show');
        } else {
            alert('Cannot add more than 5 books');
        }
    }
};

// Update Cart
function updateCart() {
    renderCartItems();
    renderSubtotal();

    // Save cart to local storage
    localStorage.setItem('Cart', JSON.stringify(cart_arr));
}

// Calculate and render subtotal
function renderSubtotal() {
    let totalPrice = 0,
        totalItems = 0;
    cart_arr.forEach((item) => {
        let dollarPrice = item.price;
        let newdollar = dollarPrice.substr(1, dollarPrice.length);
        let intdollar = parseFloat(newdollar);
        let nepaliPriceFloat = intdollar * 118;
        let nepaliPrice = parseInt(nepaliPriceFloat);

        totalPrice += nepaliPrice * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });
    subtotalEl.innerHTML = `Subtotal ${totalItems} items : Rs. ${totalPrice}`;

    if (totalItems > 0) {
        cartNumberEl.innerHTML = totalItems;
    }
}

// Render Cart item
function renderCartItems() {
    cartitemsEl.innerHTML = ''; // Clearing array before adding
    cart_arr.forEach((item) => {
        let dollarPrice = item.price;
        let newdollar = dollarPrice.substr(1, dollarPrice.length);
        let intdollar = parseFloat(newdollar);
        let nepaliPriceFloat = intdollar * 118;
        let nepaliPrice = parseInt(nepaliPriceFloat);

        cartitemsEl.innerHTML += `
        <div class="cart-card">
            <div class="left-cart">
                <img
                    src="${item.image}/${item.id}"
                    alt=""
                />
            </div>
            <div class="right-cart">
                <h1>
                    ${item.name}
                </h1>
                <div class="price-item">
                    <h3>Rs. ${nepaliPrice * item.numberOfUnits}</h3>
                    <div class="item-changer">
                        <button onclick="changeNumber('minus',${
                            item.id
                        })">-</button>
                        <p>${item.numberOfUnits}</p>
                        <button onclick="changeNumber('plus',${
                            item.id
                        })">+</button>
                    </div>
                </div>
                <div class="remove-item" onclick="removeItemFromCart(${
                    item.id
                })">Remove Item</div>
            </div>
        </div>                        
        `;
    });
}

// Remove Item from cart
window.removeItemFromCart = (id) => {
    cart_arr = cart_arr.filter((item) => item.id !== id);
    updateCart();
};

// Change number of units for an item
window.changeNumber = (action, id) => {
    cart_arr = cart_arr.map((item) => {
        let numberOfUnits = item.numberOfUnits;

        if (item.id === id) {
            if (action === 'minus' && numberOfUnits > 1) {
                numberOfUnits--;
            } else if (action === 'plus') {
                numberOfUnits++;
            }
        }
        return {
            ...item,
            numberOfUnits,
        };
    });

    updateCart();
};
