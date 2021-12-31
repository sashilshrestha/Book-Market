const checkoutEl = document.querySelector('.checkout');

let checkout_arr = JSON.parse(localStorage.getItem('Cart')) || [];
console.log(checkout_arr);

// Render Cart item
function renderCheckoutItems() {
    checkoutEl.innerHTML = ''; // Clearing array before adding
    checkout_arr.forEach((item) => {
        let dollarPrice = item.price;
        let newdollar = dollarPrice.substr(1, dollarPrice.length);
        let intdollar = parseFloat(newdollar);
        let nepaliPriceFloat = intdollar * 118;
        let nepaliPrice = parseInt(nepaliPriceFloat);

        checkoutEl.innerHTML += `
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
        <button class="bg-red-600 text-white rounded-full p-2" onclick="removeItemFromCart(${
            item.id
        })">X</button>
        </div>            
        `;
    });
}

renderCheckoutItems();
