/* Variables */
const $ = document.querySelector.bind(document);

let cartItemQuantity = 0;
const seacrhBoxInput = $(".navbar--item__search-box input");

/* Functions */
const handleNullFeature = () => {
    alert("Chức năng đang được chúng tôi phát triển");
};

const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(seacrhBoxInput.value);
    seacrhBoxInput.value = "";
};

const handleEnterPressForm = (e) => {
    if (e.keyCode === 13) {
        console.log(seacrhBoxInput.value);
        seacrhBoxInput.value = "";
    }
};

const handleSearchSuggestClick = (e) => {
    seacrhBoxInput.value = e.target.innerText;
    console.log(seacrhBoxInput.value);
};

const handleClearInput = () => {
    seacrhBoxInput.value = "";
};

const handleShoppingCart = () => {
    const shoppingCart = $(".navbar--item__cart");
    const emptyCart = $(".navbar--item__cart .empty-cart");
    const productsListCart = $(".navbar--item__cart .products-list");
    const cartProductsNumber = $(".navbar--item__cart .items-quantity");

    cartProductsNumber.innerText = cartItemQuantity;

    shoppingCart.addEventListener("mouseenter", () => {
        if (cartItemQuantity === 0) {
            emptyCart.style.display = "block";
        } else {
            productsListCart.style.display = "block";
        }
    });

    shoppingCart.addEventListener("mouseleave", () => {
        if (cartItemQuantity === 0) {
            emptyCart.style.display = "none";
            return;
        }

        productsListCart.style.display = "none";
    });
};

const App = () => {
    localStorage.setItem("cartItemQuantity", cartItemQuantity);
    handleShoppingCart();
};
App();
