const searchResultDiv = document.querySelector('.search-result');
const cartitemsEl = document.querySelector('.cart-items');
const subtotalEl = document.querySelector('.subtotal');

const baseURL = `https://book-set-task.herokuapp.com/api/list_books`;
const response = await fetch(baseURL);
const books = await response.json();

// Fetching API
async function fetchAPI() {
    let genreInput = document.getElementById('framework').value;
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
                
                <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" class=" object-cover object-center w-full h-full block" src="${result.image}/${result.id}"/>
                            </a>
                            <div class="mt-4">
                                <h3
                                    class="
                                        text-gray-800 text-xs
                                        tracking-widest
                                        title-font
                                        mb-1
                                    "
                                >
                                ${result.genre}
                                </h3>
                                <h2
                                    class="
                                        text-gray-900
                                        title-font
                                        text-lg
                                        font-medium
                                    "
                                >
                                    ${result.name}
                                </h2>
                                <div class="flex justify-between">
                                    <p class="mt-1">Rs. ${nepaliPrice}</p>
                                    <button class="px-2 py-1 bg-blue-600 text-white rounded"" onclick="addToCart(${result.id})">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                `;
        }
    });
    searchResultDiv.innerHTML = gHTML;
}

fetchAPI();

// Calling data on change
const genre = document.getElementById('framework');
genre.addEventListener('change', () => {
    fetchAPI();
});

//Cart Array
let cart_arr = [];

// Add to Cart
window.addToCart = (id) => {
    // check if book already exist in cart
    if (cart_arr.some((item) => item.id === id)) {
        changeNumber('plus', id);
    } else {
        let totalCartItems = cart_arr.length + 1;
        if (totalCartItems < 6) {
            const item = books.find((books) => books.id === id);
            cart_arr.push({
                ...item,
                numberOfUnits: 1,
            });
            updateCart();
        } else {
            alert('Cannot add more than 5 books');
        }
    }
};

// Update Cart
function updateCart() {
    renderCartItems();
    renderSubtotal();
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
        <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
        <a class="block relative h-48 rounded overflow-hidden">
            <img alt="ecommerce" class=" object-cover object-center w-full h-full block" src="${
                item.image
            }/${item.id}"/>
        </a>
        <button class="px-2 py-1 bg-blue-600 text-white rounded"" onclick="changeNumber('minus',${
            item.id
        })">-</button>
        <button class="px-2 py-1 bg-blue-600 text-white rounded">${
            item.numberOfUnits
        }</button>
        <button class="px-2 py-1 bg-blue-600 text-white rounded"" onclick="changeNumber('plus',${
            item.id
        })">+</button>
        <p>${nepaliPrice * item.numberOfUnits}</p>
        <button class="bg-red-600 text-white rounded-full p-2">X</button>
        </div>            
        `;
    });
}

// Remove Item from cart


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
