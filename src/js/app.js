import { products } from "./products.js";

/* Variables */

const seacrhBoxInput = $(".navbar--item__search-box input");
const currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
let registerAccounts;
let cartItemQuantity;
let cartProducts;
const currentPageURL = window.location.href;

/* Functions */
const handleNullFeature = () => {
    alert("Chức năng đang được chúng tôi phát triển");
};

const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(seacrhBoxInput.val());
    seacrhBoxInput.val("");
};

const handleEnterPressForm = (e) => {
    if (e.keyCode === 13) {
        console.log(seacrhBoxInput.val());
        seacrhBoxInput.val("");
    }
};

const handleClearInput = () => {
    seacrhBoxInput.val("");
};

const handleShoppingCartNone = () => {
    const shoppingCart = $(".navbar--item__cart");
    const emptyCart = $(".navbar--item__cart .empty-cart");
    const productsListCart = $(".navbar--item__cart .products-list");
    const cartProductsNumber = $(".navbar--item__cart .items-quantity");

    shoppingCart.on("mouseenter", () => {
        if (cartItemQuantity === 0) {
            emptyCart.css("display", "block");
            productsListCart.css("display", "none");
        } else {
            productsListCart.css("display", "block");
            emptyCart.css("display", "none");
        }
    });

    shoppingCart.on("mouseleave", () => {
        productsListCart.css("display", "none");
        emptyCart.css("display", "none");
    });
};

const handleHeaderIntroAnimation = () => {
    const contentsList = document.querySelectorAll(".header .header-top .carousel-content .content");
    let activeIndex = 0;

    const intervalId = setInterval(() => {
        if (activeIndex === contentsList.length) {
            activeIndex = 0;
        }
        contentsList[activeIndex].classList.add("active");
        contentsList.forEach((content, index) => {
            if (index !== activeIndex) {
                content.classList.remove("active");
            }
        });
        activeIndex++;
    }, 6000);
};

const handleQuickViewButtonClick = (e) => {
    const currentProductId = e.currentTarget.getAttribute("data-product-id");
    const cartList = $(".cart .cart__product-list");

    const currentProduct = products.find((product) => {
        return product.id === currentProductId ? product : null;
    });

    $(".product-quickview .modal .modal-content .product-info").html(`
            <div class="product-info--image">
                <img src="${currentProduct.image}" alt="" />
            </div>
            <div style="flex: 1">
                <h2 class="product-info--name">${currentProduct.name}</h2>
                <div class="d-flex">
                    <div class="product-info--id">Mã sản phẩm: <span>${currentProduct.id}</span></div>
                    <div class="product-info--status">Trạng thái: <span>${currentProduct.status}</span></div>
                </div>
                <div class="product-info--price">Giá: <span>${currentProduct.price}₫</span></div>
                <div class="product-control">
                    <div class="product-control--quantity">
                        Số lượng:
                        <span>
                            <button type="button" class="decrease-btn"><i class="fa-solid fa-minus"></i></button>
                            <input type="number" name="productQuantity" id="productQuantity" value="1" min=1 />
                            <div
                                style="
                                    font-weight: bold;
                                    font-size: 1.3rem;
                                    width: 50px;
                                    border-top: 0.5px solid var(--primaryColor);
                                    border-bottom: 0.5px solid var(--primaryColor);
                                "
                                class="number d-flex justify-content-center align-items-center"
                            >
                                1
                            </div>
                            <button type="button" class="increase-btn"><i class="fa-solid fa-plus"></i></button>
                        </span>
                    </div>

                    <div class="submit-button" data-product-id="${currentProduct.id}">
                        <button type="button" data-bs-dismiss="modal" aria-label="Close">Thêm vào giỏ hàng</button>
                    </div>
                </div>
                <div class="product-detail">
                    <a href="./detail-product.html?id=${currentProduct.id}">
                        Xem chi tiết sản phẩm <span><i class="fa-solid fa-right"></i></span>
                    </a>
                </div>
            </div>
    `);

    $(
        ".product-quickview .modal .modal-content .product-info .product-control .product-control--quantity span .increase-btn",
    ).on("click", () => {
        handleIncreaseQuantityButtonClick();
    });

    $(
        ".product-quickview .modal .modal-content .product-info .product-control .product-control--quantity span .decrease-btn",
    ).on("click", () => {
        handleDecreaseQuantityButtonClick();
    });

    $(".product-quickview .modal .modal-content .product-info .product-control .submit-button").on("click", (e) => {
        handleAddToCartButtonClick(e);
    });
};

const showToasts = (toastContent) => {
    const toastContainer = $("#toastContainer");
    // reset toast list
    toastContainer.append(`
                <div
                    data-bs-animation="true"
                    class="toast submit-add-to-cart-toast hide align-items-center"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    id="submitAddToCartToast"
                >
                    <div class="toast-body">
                        ${toastContent}</span>
                    </div>
                </div>
        `);

    const toastElList = document.querySelectorAll(".toast");
    const toastList = [...toastElList].map((toastEl) => new bootstrap.Toast(toastEl));

    // Show each toast
    toastList.forEach((toast, index) => {
        toast.show();

        setTimeout(() => {
            if (toast._element && toast._element.parentNode) {
                toast._element.parentNode.removeChild(toast._element);
            }
        }, 2300);
    });
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

const handleCardList = () => {
    const newProducts = $(".new-products .products__list");
    const oustandingProducts = $(".outstanding-products .products__list");
    const relateProducts = $(".relate-products .products__list");

    shuffleArray(products).forEach((product, index) => {
        return newProducts.append(
            `<li class="products__item">
                <a href="../html/detail-product.html?id=${product.id}" class="products__item--card">
                    <img src="${product.image}" alt="product" />
                    <div class="info">
                        <div class="occasion">${product.occasion}</div>
                        <div class="price">${product.price}₫</div>
                        <div class="name">${product.name}</div>
                    </div>
                    <div class="product-id">Mã ${product.id}</div>
                </a>
                <div class="buy-button" data-product-id="${product.id}">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#productQuickview">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
            </li>`,
        );
    });

    shuffleArray(products).forEach((product, index) => {
        return oustandingProducts.append(
            `<li class="products__item">
                <a href="../html/detail-product.html?id=${product.id}" class="products__item--card">
                    <img src="${product.image}" alt="product" />
                    <div class="info">
                        <div class="occasion">${product.occasion}</div>
                        <div class="price">${product.price}₫</div>
                        <div class="name">${product.name}</div>
                    </div>
                    <div class="product-id">Mã ${product.id}</div>
                </a>
                <div class="buy-button" data-product-id="${product.id}" >
                    <button type="button" data-bs-toggle="modal" data-bs-target="#productQuickview">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
            </li>`,
        );
    });

    shuffleArray(products).forEach((product, index) => {
        return relateProducts.append(
            `<li class="products__item">
                <a href="../html/detail-product.html?id=${product.id}" class="products__item--card">
                    <img src="${product.image}" alt="product" />
                    <div class="info">
                        <div class="occasion">${product.occasion}</div>
                        <div class="price">${product.price}₫</div>
                        <div class="name">${product.name}</div>
                    </div>
                    <div class="product-id">Mã ${product.id}</div>
                </a>
                <div class="buy-button" data-product-id="${product.id}">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#productQuickview">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
            </li>`,
        );
    });

    $(".products .products__list").slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        touchMove: true,
        arrow: true,
        // prev arrow
        prevArrow:
            '<button type="button" data-role="none" class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
        // next arrow
        nextArrow:
            '<button type="button" data-role="none" class="slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
        adaptiveHeight: false,
        accessibility: true,
        draggable: true,
    });
};

const handleIncreaseQuantityButtonClick = () => {
    const quantityInput = $(
        ".product-quickview .modal .modal-content .product-info .product-control .product-control--quantity span input",
    );

    let currentValue = quantityInput.val();

    quantityInput.val((index, currentValue) => parseInt(currentValue) + 1);

    currentValue = quantityInput.val();

    $(
        ".product-quickview .modal .modal-content .product-info .product-control .product-control--quantity span .number",
    ).text(currentValue);
};

const handleDecreaseQuantityButtonClick = () => {
    const quantityInput = $(
        ".product-quickview .modal .modal-content .product-info .product-control .product-control--quantity span input",
    );
    let currentValue = quantityInput.val();

    quantityInput.val((index, currentValue) => (currentValue > 1 ? parseInt(currentValue) - 1 : 1));

    currentValue = quantityInput.val();

    $(
        ".product-quickview .modal .modal-content .product-info .product-control .product-control--quantity span .number",
    ).text(currentValue);
};

const handleAddToCartButtonClick = (e) => {
    const quantityInput = $(
        ".product-quickview .modal .modal-content .product-info .product-control .product-control--quantity span input",
    );
    let currentValue = quantityInput.val();
    const currentProductId = e.currentTarget.getAttribute("data-product-id");
    const productQuantity = $(
        ".product-quickview .modal .modal-content .product-info .product-control .product-control--quantity span input",
    ).val();

    let isDuplicateProduct = cartProducts.findIndex((product) => product.id === currentProductId);

    products.forEach((product) => {
        if (currentProductId === product.id) {
            if (isDuplicateProduct === -1) {
                cartProducts.push(product);
                cartProducts[cartProducts.length - 1].quantity = parseInt(productQuantity);
                updateLocalStorage();
            } else {
                cartProducts[isDuplicateProduct].quantity =
                    parseInt(cartProducts[isDuplicateProduct].quantity) + parseInt(productQuantity);
            }
        }
    });

    if (window.location.href.includes("/cart.html")) {
        $(".cart .cart__header .select-all input").prop("checked", false);
    }
    updateLocalStorage();
    handleRenderCartProducts();
    handleRenderCartProductInCartPage();
    showToasts(`Đã thêm sản phẩm vào giỏ hàng. <span><i class="fa-regular fa-cart-circle-check"></i>`);
};

const handleDeleteCartProductItem = (e) => {
    const productId = e.currentTarget.getAttribute("data-product-id");

    cartProducts.forEach((product, index) => {
        if (productId === product.id) {
            cartProducts.splice(index, 1);
            cartItemQuantity -= product.quantity;
        }
    });

    updateLocalStorage();

    const emptyCart = $(".navbar--item__cart .empty-cart");
    const productsListCart = $(".navbar--item__cart .products-list");

    if (cartItemQuantity === 0) {
        emptyCart.css("display", "none");
        productsListCart.css("display", "none");
    }
    handleRenderCartProducts();
    if (currentPageURL.endsWith("cart.html")) {
        handleRenderCartProductInCartPage();
    }
};

const handleRenderCartProducts = () => {
    const shoppingCart = $(".navbar--item__cart .products-list .content");
    const totalCost = $(".navbar--item__cart .products-list .footer .total .price");

    // reset cart items
    shoppingCart.html("");

    cartProducts.forEach((product) => {
        shoppingCart.append(`
            <li class="product-item">
                <div class="product-item__image">
                    <img src="${product.image}" alt="" />
                </div>
                <div class="product-item__content">
                    <div class="product-item__name">
                        <a href="../html/detail-product.html?id=${product.id}">
                            ${product.name}
                        </a>
                    </div>
                    <div class="product-item__price">Giá: ₫${product.price}</div>
                </div>
                <div class="product-item__action">
                    <div class="product-item__quantity"><i class="fa-solid fa-x"></i>${product.quantity}</div>
                    <div class="delete-product" data-product-id="${product.id}">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </li>
        `);
    });

    const deleteButton = $(".navbar--item__cart .products-list .product-item__action .delete-product");

    deleteButton.on("click", (e) => {
        handleDeleteCartProductItem(e);
    });

    const cost = cartProducts
        .map((product) => convertToNumber(product.price) * parseInt(product.quantity))
        .reduce((sum, price) => sum + price, 0);

    totalCost.text(`Tổng tiền: ₫${cost.toFixed(3)}`);

    $(".navbar--item__cart .items-quantity").text(cartItemQuantity);

    if (currentAccount) {
        $(".navbar--item__cart .products-list .footer .go-to-cart a").attr("href", "./cart.html");
    } else {
        $(".navbar--item__cart .products-list .footer .go-to-cart a").attr("href", "./login.html");
    }
};

const convertToNumber = (priceString) => parseFloat(priceString.replace(/[^0-9.]/g, ""));

const handleRenderCartProductInCartPage = () => {
    const cartList = $(".cart .cart__product-list");
    const shoppingCart = $(".navbar--item__cart .products-list .content");
    const selectAllCheckBox = $(".cart .cart__header .select-all input");
    let selectProductCheckBox = $(".cart__product-list--item .select-product input");

    if (cartItemQuantity === 0) {
        $(".empty-cart-page").css("display", "flex");
        $(".cart-page").css("display", "none");
    } else {
        $(".empty-cart-page").css("display", "none");
        $(".cart-page").css("display", "block");
    }

    const renderCartItems = () => {
        // reset cart items
        cartList.html("");

        cartProducts.forEach((product) => {
            cartList.append(`
                <li class="cart__product-list--item">
                    <div class="select-product">
                        <input type="checkbox" name="productCheck" data-product-id="${product.id}" id="productCheck" />
                    </div>
                    <div class="product-image">
                        <img src="../assets/images/products/product-${product.id}.jpg" alt="" />
                    </div>
                    <div class="product-name">
                        <a href="./detail-product.html?id=${product.id}">${product.name}</a>
                        <div class="product-id">Mã: ${product.id}</div>
                    </div>
                    <div class="product-price">${product.price}đ</div>
                    <div style="margin-left: auto">
                        <div class="product-quantity">
                            <button class="decrease-button" data-product-id="${product.id}"><i class="fa-solid fa-minus"></i></button>
                            <div class="number">
                                <input
                                    data-product-id="${product.id}"
                                    type="text"
                                    min="1"
                                    max="999"
                                    height="100%"
                                    step="1"
                                    value="${product.quantity}"
                                    autocomplete="off"
                                />
                            </div>
                            <button class="increase-button" data-product-id="${product.id}"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <div class="delete-product-button" data-product-id="${product.id}">
                            <i class="fa-regular fa-trash"></i>
                        </div>
                    </div>
                </li>
            `);
        });

        // update product quantity
    };
    renderCartItems();

    const handleDeleteProductButtonClick = () => {
        const deleteButton = $(".cart__product-list .cart__product-list--item .delete-product-button");
        const confirmModal = new bootstrap.Modal("#confirmDeleteProductModal");

        deleteButton.each((key) => {
            deleteButton[key].addEventListener("click", () => {
                const acceptDeleteButton = $(".modal-confirm.delete-product-confirm .accept-button");

                confirmModal.show();
                acceptDeleteButton.on("click", () => {
                    cartProducts.forEach((product, index) => {
                        if (deleteButton[key].getAttribute("data-product-id") === product.id) {
                            cartProducts.splice(index, 1);
                        }
                        updateLocalStorage();
                        confirmModal.hide();
                        handleRenderCartProductInCartPage();
                        handleRenderCartProducts();
                    });
                });
            });
        });
    };
    handleDeleteProductButtonClick();

    const isAllChecked = () => {
        let value = false;
        selectProductCheckBox.each((index) => {
            if (selectProductCheckBox[index].checked) {
                value = true;
            } else {
                value = false;
                return value;
            }
        });

        return value;
    };

    const handleDisplayOrderSummary = () => {
        const convertToNumber = (priceString) => parseFloat(priceString.replace(/[^0-9.]/g, ""));
        let shippingFee = 0;
        let cost = 0;
        let itemQuantity = 0;

        selectProductCheckBox.each((key, checkbox) => {
            if (checkbox.checked) {
                const product = cartProducts[key];
                const productCost = convertToNumber(product.price) * parseInt(product.quantity);
                cost += productCost;
                shippingFee = 30;
                itemQuantity += product.quantity;
            }
        });

        $(".order-summary__info--temp-price").html(
            `Tạm tính(${itemQuantity} sản phẩm) <span>${cost.toFixed(3)}₫</span>`,
        );

        $(".order-summary__info--shipping-fee span").text(`${shippingFee.toFixed(3)}₫`);
        $(".order-summary__total span").text(`${(cost + shippingFee).toFixed(3)}₫`);
        $(".order-summary__accept span").text(`${itemQuantity}`);
    };

    const handleSelectAllProduct = () => {
        selectProductCheckBox = $(".cart__product-list--item .select-product input");
        selectAllCheckBox.on("change", () => {
            if (selectAllCheckBox.prop("checked")) {
                selectProductCheckBox.each((index) => {
                    selectProductCheckBox[index].checked = true;
                    cartProducts[index].checked = true;
                });
            } else {
                selectProductCheckBox.each((index) => {
                    selectProductCheckBox[index].checked = false;
                    cartProducts[index].checked = false;
                });
            }
            handleDisplayOrderSummary();
        });

        selectProductCheckBox.each((index) => {
            selectProductCheckBox[index].addEventListener("change", () => {
                if (isAllChecked()) {
                    selectAllCheckBox.prop("checked", true);
                } else {
                    selectAllCheckBox.prop("checked", false);
                }
            });
            handleDisplayOrderSummary();
        });
    };
    handleSelectAllProduct();

    const handleSelectProduct = () => {
        selectProductCheckBox.each((index) => {
            selectProductCheckBox[index].addEventListener("change", () => {
                handleDisplayOrderSummary();
                selectProductCheckBox.each((key) => {
                    if (selectProductCheckBox[key].checked) {
                        cartProducts[key].checked = true;
                    } else {
                        cartProducts[key].checked = false;
                    }
                    updateLocalStorage();
                });
            });
        });
    };
    handleSelectProduct();

    const handleProductQuantityInput = () => {
        const quantityInput = $(".cart__product-list--item .product-quantity input");

        quantityInput.each((index) => {
            const quantity = quantityInput[index].value;
            quantityInput[index].addEventListener("input", () => {
                if (quantityInput[index].value.length > 0 && quantityInput[index].value.length < 5) {
                    if (!/^\d+$/.test(quantityInput[index].value)) {
                        quantityInput[index].value = quantity;

                        showToasts(
                            `<i class="fa-regular fa-triangle-exclamation"></i> Vui lòng nhập số lượng cụ thể! `,
                        );
                    } else {
                        cartProducts.forEach((product) => {
                            if (product.id === quantityInput[index].getAttribute("data-product-id")) {
                                product.quantity = quantityInput[index].value;
                                updateLocalStorage();
                            }
                        });
                    }
                } else {
                    quantityInput[index].value = quantityInput[index].value.slice(0, 4);
                }
                quantityInput[index].addEventListener("change", () => {
                    if (quantityInput[index].value === "" || !/^\d+$/.test(quantityInput[index].value)) {
                        quantityInput[index].value = quantity;
                    } else {
                        cartProducts.forEach((product) => {
                            if (product.id === quantityInput[index].getAttribute("data-product-id")) {
                                product.quantity = quantityInput[index].value;
                                updateLocalStorage();
                                handleDisplayOrderSummary();
                            }
                        });
                    }
                });
            });
        });
    };
    handleProductQuantityInput();

    const handleIncreaseQuantityProduct = () => {
        const increaseButton = $(".cart__product-list .cart__product-list--item .product-quantity .increase-button");
        const quantityInput = $(".cart__product-list--item .product-quantity input");

        increaseButton.each((key) => {
            increaseButton[key].addEventListener("click", () => {
                cartProducts.forEach((product) => {
                    if (product.id === increaseButton[key].getAttribute("data-product-id")) {
                        product.quantity = parseInt(product.quantity) + 1;
                        quantityInput.each((index) => {
                            if (quantityInput[index].getAttribute("data-product-id") === product.id) {
                                quantityInput[index].value = product.quantity;
                            }
                        });
                        updateLocalStorage();
                        handleDisplayOrderSummary();
                    }
                });
            });
        });
    };
    handleIncreaseQuantityProduct();

    const handleDecreaseQuantityProduct = () => {
        const decreaseButton = $(".cart__product-list .cart__product-list--item .product-quantity .decrease-button");
        const quantityInput = $(".cart__product-list--item .product-quantity input");
        decreaseButton.each((key) => {
            decreaseButton[key].addEventListener("click", () => {
                cartProducts.forEach((product) => {
                    if (
                        product.id === decreaseButton[key].getAttribute("data-product-id") &&
                        parseInt(product.quantity) > 0
                    ) {
                        product.quantity = parseInt(product.quantity) > 1 ? parseInt(product.quantity) - 1 : 1;
                        quantityInput.each((index) => {
                            if (quantityInput[index].getAttribute("data-product-id") === product.id) {
                                quantityInput[index].value = product.quantity;
                            }
                        });
                        updateLocalStorage();
                        handleDisplayOrderSummary();
                    }
                });
            });
        });
    };
    handleDecreaseQuantityProduct();

    const handleAcceptOrderButtonClick = () => {
        const acceptBtn = $(".order-summary__accept");
        let hasCheckedProduct = false;

        acceptBtn.on("click", () => {
            cartProducts.forEach((product) => {
                if (product.checked) {
                    hasCheckedProduct = true;
                    return;
                }
            });
            if (hasCheckedProduct) {
                updateLocalStorage();
                window.location.href = "./payment.html";
            } else {
                showToasts("Hãy chọn ít nhất một sản phẩm!");
            }
        });
    };
    handleAcceptOrderButtonClick();
};

const updateLocalStorage = () => {
    // update register accounts when current account change
    registerAccounts.forEach((account, index) => {
        if (account.id === currentAccount.id) {
            registerAccounts[index] = { ...currentAccount };
        }
    });
    cartItemQuantity = cartProducts.map((product) => product.quantity).reduce((sum, quantity) => sum + quantity, 0);
    $(".navbar--item__cart .items-quantity").text(cartItemQuantity);
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    localStorage.setItem("cartItemQuantity", JSON.stringify(cartItemQuantity));
    localStorage.setItem("registerAccounts", JSON.stringify(registerAccounts));
    localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
};

const handleDeleteSelectedProducts = () => {
    const cartList = $(".cart .cart__product-list");
    const shoppingCart = $(".navbar--item__cart .products-list .content");
    const selectAllCheckBox = $(".cart .cart__header .select-all input");
    let selectProductCheckBox = $(".cart__product-list--item .select-product input");

    const renderCartItems = () => {
        // reset cart items
        cartList.html("");

        cartProducts.forEach((product) => {
            cartList.append(`
                <li class="cart__product-list--item">
                    <div class="select-product">
                        <input type="checkbox" name="productCheck" data-product-id="${product.id}" id="productCheck" />
                    </div>
                    <div class="product-image">
                        <img src="../assets/images/products/product-${product.id}.jpg" alt="" />
                    </div>
                    <div class="product-name">
                        <a href="./detail-product.html?id=${product.id}">${product.name}</a>
                        <div class="product-id">Mã: ${product.id}</div>
                    </div>
                    <div class="product-price">${product.price}đ</div>
                    <div style="margin-left: auto">
                        <div class="product-quantity">
                            <button class="decrease-button"><i class="fa-solid fa-minus"></i></button>
                            <div class="number">
                                <input
                                    type="text"
                                    min="1"
                                    max="999"
                                    height="100%"
                                    step="1"
                                    value="${product.quantity}"
                                    autocomplete="off"
                                />
                            </div>
                            <button class="increase-button"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <div class="delete-product-button" data-bs-toggle="modal" data-bs-target="#confirmDeleteProductModal">
                            <i class="fa-regular fa-trash"></i>
                        </div>
                    </div>
                </li>
            `);
        });
    };

    const isAllChecked = () => {
        let value = false;
        selectProductCheckBox.each((index) => {
            if (selectProductCheckBox[index].checked) {
                value = true;
            } else {
                value = false;
                return value;
            }
        });

        return value;
    };

    const handleSelectAllProduct = () => {
        selectProductCheckBox = $(".cart__product-list--item .select-product input");
        selectAllCheckBox.on("change", () => {
            if (selectAllCheckBox.prop("checked")) {
                selectProductCheckBox.each((index) => {
                    selectProductCheckBox[index].checked = true;
                });
            } else {
                selectProductCheckBox.each((index) => {
                    selectProductCheckBox[index].checked = false;
                });
            }
        });

        selectProductCheckBox.each((index) => {
            selectProductCheckBox[index].addEventListener("change", () => {
                if (isAllChecked()) {
                    selectAllCheckBox.prop("checked", true);
                } else {
                    selectAllCheckBox.prop("checked", false);
                }
            });
        });
    };
    handleSelectAllProduct();

    const deleteCheckedProductButton = $(".cart .cart__header .delete-button");
    deleteCheckedProductButton.on("click", () => {
        selectProductCheckBox = $(".cart__product-list--item .select-product input");

        const handleAppearConfirmDeleteModal = () => {
            const acceptDeleteButton = $(".modal-confirm.delete-product-confirm .accept-button");
            const confirmModal = new bootstrap.Modal("#confirmDeleteProductModal");

            // handle if not select product
            const hasSelectProduct = () => {
                let value = false;
                selectProductCheckBox.each((key) => {
                    if (selectProductCheckBox[key].checked) {
                        value = true;
                    }
                });
                return value;
            };

            if (hasSelectProduct()) {
                confirmModal.show();
            } else {
                showToasts(`Hãy chọn ít nhất 1 sản phẩm!`);
                return;
            }

            // handle delete product
            const deleteProduct = () => {
                selectProductCheckBox = $(".cart__product-list--item .select-product input");

                selectProductCheckBox.each((key) => {
                    if (selectProductCheckBox[key].checked) {
                        cartProducts.forEach((product, index) => {
                            if (selectProductCheckBox[key].getAttribute("data-product-id") === product.id) {
                                cartProducts.splice(index, 1);
                            }
                        });
                    }
                });
            };

            acceptDeleteButton.on("click", () => {
                deleteProduct();
                renderCartItems();
                updateLocalStorage();
                selectAllCheckBox.prop("checked", false);
                confirmModal.hide();
                handleRenderCartProductInCartPage();
            });
        };
        handleAppearConfirmDeleteModal();
    });

    handleSelectAllProduct();
};

const handleEvents = () => {
    // handle click
    $(".navbar--item__search-box .clear-input-btn").on("click", () => {
        handleClearInput();
    });

    $(".navbar--item__search-box .submit-button").on("click", (e) => {
        handleSubmitForm(e);
    });

    $(".products .products__list .products__item .buy-button").on("click", (e) => {
        handleQuickViewButtonClick(e);
    });

    $(".main .content .product-item .quick-view-button").on("click", (e) => {
        handleQuickViewButtonClick(e);
    });

    $(".footer .list .item").on("click", () => {
        handleNullFeature();
    });

    $(".footer .footer__contact .footer__contact--socials a").on("click", () => {
        handleNullFeature();
    });

    // handle keydown
    $(".navbar--item__search-box input").on("keydown", (e) => {
        handleEnterPressForm(e);
    });
};

const handleLogoutAccount = () => {
    $(".navbar--item.navbar--item__login .account-manipulation li .logout-button").on("click", () => {
        localStorage.removeItem("currentAccount");

        window.location.reload();
    });
};

const handleSuccessLogin = () => {
    if (currentAccount) {
        $(".navbar--item__login").html(`
                <a href="#" ><div class="avatar" style="background-image: url(${currentAccount.avatar})"></div> <span>${currentAccount.username}</span></a>
                <ul class="account-manipulation">
                    <li>
                        <a href="./profile.html"><i class="fa-solid fa-user"></i><span>Thông tin tài khoản</span></a>
                    </li>
                    <li>
                        <a href="./purchase.html"><i class="fa-duotone fa-box"></i><span>Đơn hàng</span></a>
                    </li>
                    <li>
                        <button class="logout-button"><i class="fa-solid fa-power-off"></i><span>Đăng xuất</span></button>
                    </li>
                </ul>
        `);

        handleLogoutAccount();
    } else {
        $(".navbar--item__login").html(`
                <a href="./login.html"> <i class="fa-solid fa-circle-user"></i> <span>ĐĂNG NHẬP</span> </a>
        `);
    }
};

const handleRenderDetailProduct = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get("id");

    products.forEach((product) => {
        if (product.id === productId) {
            document.title = `Chi tiết sản phẩm - ${product.name}`;

            $(".main .product-info").html(`
                    <div class="product-info__image"><img src="../assets/images/products/product-${productId}.jpg" alt="" /></div>
                    <div class="product-info__content">
                        <div class="product-info__name">${product.name}</div>
                        <div class="d-flex mt-3" style="font-size: 1.2rem; width: 100%">
                            <div class="product-info__id">Mã sản phẩm: <span>${product.id}</span></div>
                            <div class="product-info__status">Tình trạng: <span>Còn hàng</span></div>
                        </div>
                        <div class="product-info__price">Giá: <span>${product.price}₫</span></div>
                        <div class="product-info__control">
                            <span>Số lượng:</span>
                            <button class="product-info__control--decrease"><i class="fa-solid fa-minus"></i></button>
                            <input type="number" id="quantity-input" class="quantity-input" value="1" />
                            <div class="product-info__control--quantity">1</div>
                            <button class="product-info__control--increase"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <div class="add-to-cart-btn"><button>Thêm vào giỏ</button></div>
                        <div class="buy-btn"><button><a href="./cart.html">Mua ngay</a></button></div>
                        <div class="product-info__fledges">
                            <div class="row">
                                <div class="d-flex col">
                                    100% Chính hãng <span style="margin-left: 10px;"><i class="fa-regular fa-box"></i></span>
                                </div>
                                <div class="d-flex col">
                                    Miễn phí giao hàng
                                    <span style="margin-left: 10px;"><i class="fa-solid fa-truck-fast"></i></span>
                                </div>
                                <div class="d-flex col">
                                    Hỗ trợ 24/7
                                    <span style="margin-left: 10px;"><i class="fa-solid fa-phone-volume"></i></span>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="d-flex col">
                                    An toàn cho trẻ em
                                    <span style="margin-left: 10px;"><i class="fa-solid fa-shield-check"></i></span>
                                </div>
                                <div class="d-flex col">
                                    Mở hộp kiểm tra nhận hàng
                                    <span style="margin-left: 10px;"><i class="fa-solid fa-thumbs-up"></i></span>
                                </div>
                                <div class="d-flex col">
                                    Hoàn trả trong vòng 7 ngày
                                    <span style="margin-left: 10px;"><i class="fa-solid fa-arrows-repeat"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
            `);
        }
    });

    let inputValue = $(".product-info .product-info__control .quantity-input");
    const increaseButton = $(".product-info .product-info__control .product-info__control--increase");
    const decreaseButton = $(".product-info .product-info__control .product-info__control--decrease");
    const addToCartButton = $(".product-info .add-to-cart-btn");
    const buyButton = $(".product-info .buy-btn");

    decreaseButton.on("click", () => {
        parseInt(inputValue.val()) > 1 ? inputValue.val(parseInt(inputValue.val()) - 1) : 1;
        $(".product-info .product-info__control .product-info__control--quantity").text(inputValue.val());
    });

    increaseButton.on("click", () => {
        inputValue.val(parseInt(inputValue.val()) + 1);
        $(".product-info .product-info__control .product-info__control--quantity").text(inputValue.val());
    });

    addToCartButton.on("click", () => {
        products.forEach((product) => {
            if (productId === product.id) {
                let isDuplicateProduct = cartProducts.findIndex((product) => product.id === productId);

                products.forEach((product) => {
                    if (productId === product.id) {
                        if (isDuplicateProduct === -1) {
                            cartProducts.push(product);
                            cartProducts[cartProducts.length - 1].quantity = parseInt(inputValue.val());
                            updateLocalStorage();
                        } else {
                            cartProducts[isDuplicateProduct].quantity =
                                parseInt(cartProducts[isDuplicateProduct].quantity) + parseInt(inputValue.val());
                        }
                    }
                });

                cartItemQuantity = cartProducts
                    .map((product) => product.quantity)
                    .reduce((sum, quantity) => sum + quantity, 0);

                showToasts(`Đã thêm sản phẩm vào giỏ hàng. <span><i class="fa-regular fa-cart-circle-check"></i>`);

                handleRenderCartProducts();

                inputValue.val(1);
                $(".product-info .product-info__control .product-info__control--quantity").text(inputValue.val());

                updateLocalStorage();
            }
        });
    });

    buyButton.on("click", () => {
        products.forEach((product) => {
            if (productId === product.id) {
                let isDuplicateProduct = cartProducts.findIndex((product) => product.id === productId);

                products.forEach((product) => {
                    if (productId === product.id) {
                        if (isDuplicateProduct === -1) {
                            cartProducts.push(product);
                            cartProducts[cartProducts.length - 1].quantity = parseInt(inputValue.val());
                            updateLocalStorage();
                        } else {
                            cartProducts[isDuplicateProduct].quantity =
                                parseInt(cartProducts[isDuplicateProduct].quantity) + parseInt(inputValue.val());
                        }
                    }
                });

                cartItemQuantity = cartProducts
                    .map((product) => product.quantity)
                    .reduce((sum, quantity) => sum + quantity, 0);

                updateLocalStorage();
            }
        });
    });
};

const handleRenderSuggestProducts = () => {
    const suggestProductList = $(".products-suggest .products-suggest__list");

    products.forEach((product) => {
        suggestProductList.append(`
                <li class="products-suggest__item col-2 col-lg-2">
                    <a href="../html/detail-product.html?id=${product.id}" class="products-suggest__item--card">
                        <img src="../assets/images/products/product-${product.id}.jpg" alt="product" />
                        <div class="info">
                            <div class="occasion">${product.occasion}</div>
                            <div class="price">${product.price}₫</div>
                            <div class="name">${product.name}</div>
                        </div>
                        <div class="product-id">Mã ${product.id}</div>
                    </a>
                    <div class="buy-button" data-product-id="${product.id}">
                        <button type="button" data-bs-toggle="modal" data-bs-target="#productQuickview">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                </li>
        `);
    });

    $(".products-suggest .products-suggest__list .products-suggest__item .buy-button").on("click", (e) => {
        handleQuickViewButtonClick(e);
    });
};

const handleRenderAllProductPage = (productArray) => {
    const productList = $(".main .content .row");
    productList.html("");

    // handle render all product
    productArray.forEach((product) => {
        productList.append(`
            <div class="col-3 p-3">
                <div class="product-item">
                    <a href="../html/detail-product.html?id=${product.id}" class="product-item__card">
                        <img src="../assets/images/products/product-${product.id}.jpg" alt="product" />
                        <div class="info">
                            <div class="occasion">${product.occasion}</div>
                            <div class="price">${product.price}₫</div>
                            <div class="name">${product.name}</div>
                        </div>
                        <div class="product-id">Mã ${product.id}</div>
                    </a>
                    <div class="product-operator">
                        <button type="button" data-product-id="${product.id}" class="buy-button">Mua ngay</button>
                        <button type="button" data-product-id="${product.id}" class="add-to-cart-btn">
                            <i class="fa-solid fa-cart-circle-plus"></i>
                        </button>
                    </div>
                    <div class="quick-view-button" data-product-id="${product.id}">
                        <button type="button" data-bs-toggle="modal" data-bs-target="#productQuickview">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                </div>
            </div>
        `);
    });
};

const handleEventAllProductPage = () => {
    const addToCartBtn = $(".main .content .product-item .product-operator .add-to-cart-btn");
    const buyBtn = $(".main .content .product-item .product-operator .buy-button");

    // handle add to cart
    addToCartBtn.on("click", (e) => {
        const productId = e.target.getAttribute("data-product-id");

        products.forEach((product) => {
            if (productId === product.id) {
                let isDuplicateProduct = cartProducts.findIndex((product) => product.id === productId);

                products.forEach((product) => {
                    if (productId === product.id) {
                        if (isDuplicateProduct === -1) {
                            cartProducts.push(product);

                            cartProducts[cartProducts.length - 1].quantity = 1;
                        } else {
                            cartProducts[isDuplicateProduct].quantity =
                                parseInt(cartProducts[isDuplicateProduct].quantity) + 1;
                        }
                    }
                });

                cartItemQuantity = cartProducts
                    .map((product) => product.quantity)
                    .reduce((sum, quantity) => sum + quantity, 0);

                showToasts(`Đã thêm sản phẩm vào giỏ hàng. <span><i class="fa-regular fa-cart-circle-check"></i>`);

                handleRenderCartProducts();

                updateLocalStorage();
            }
        });
    });

    // handle buy product
    buyBtn.on("click", (e) => {
        const productId = e.target.getAttribute("data-product-id");

        products.forEach((product) => {
            if (productId === product.id) {
                let isDuplicateProduct = cartProducts.findIndex((product) => product.id === productId);

                products.forEach((product) => {
                    if (productId === product.id) {
                        if (isDuplicateProduct === -1) {
                            cartProducts.push(product);

                            cartProducts[cartProducts.length - 1].quantity = 1;
                            updateLocalStorage();
                        } else {
                            cartProducts[isDuplicateProduct].quantity =
                                parseInt(cartProducts[isDuplicateProduct].quantity) + 1;
                        }
                    }
                });

                cartItemQuantity = cartProducts
                    .map((product) => product.quantity)
                    .reduce((sum, quantity) => sum + quantity, 0);

                updateLocalStorage();
            }
        });

        window.location.href = "./cart.html";
    });

    // arrange product occasion A-Z
    const sortAZButton = $('.heading__arrange-products .heading__arrange-products--select .option[value="A-Z"]');
    sortAZButton.on("click", () => {
        const productsSortedAZ = products.slice().sort((a, b) => {
            return a.occasion.localeCompare(b.occasion);
        });
        handleRenderAllProductPage(productsSortedAZ);
    });

    // arrange product occasion Z-A
    const sortZAButton = $('.heading__arrange-products .heading__arrange-products--select .option[value="Z-A"]');
    sortZAButton.on("click", () => {
        const productsSortedZA = products.slice().sort((a, b) => {
            return b.occasion.localeCompare(a.occasion);
        });
        handleRenderAllProductPage(productsSortedZA);
    });

    // arrange descending product prices
    const sortDescendingPriceBtn = $(
        '.heading__arrange-products .heading__arrange-products--select .option[value="descendingPrice"]',
    );
    sortDescendingPriceBtn.on("click", () => {
        const descendingPriceProducts = products.slice().sort((a, b) => {
            return parseFloat(b.price) - parseFloat(a.price);
        });
        handleRenderAllProductPage(descendingPriceProducts);
    });

    // arrange ascending product prices
    const sortAscendingPriceBtn = $(
        '.heading__arrange-products .heading__arrange-products--select .option[value="ascendingPrice"]',
    );
    sortAscendingPriceBtn.on("click", () => {
        const ascendingPriceProducts = products.slice().sort((a, b) => {
            return parseFloat(a.price) - parseFloat(b.price);
        });
        handleRenderAllProductPage(ascendingPriceProducts);
    });

    // arrange outstanding products
    const outstandingProductsButton = $(
        '.heading__arrange-products .heading__arrange-products--select .option[value="outstandingProducts"]',
    );
    const outstandingProducts = shuffleArray(products).slice();
    outstandingProductsButton.on("click", () => {
        handleRenderAllProductPage(outstandingProducts);
    });

    // handle show more products button
    const showMoreProductsBtn = $(".main .content__show-more-btn");
    showMoreProductsBtn.on("click", () => {
        const productList = $(".main .content .row.product-list");
        const currentMaxHeight = parseInt(productList.css("max-height"));
        const aProductHeight = 493;
        const rowWillShow = 3;

        // if not remain products the show more button will be hidden
        if (Math.ceil(currentMaxHeight / aProductHeight) >= Math.ceil(products.length / 4)) {
            showMoreProductsBtn.css("display", "none");
        }

        productList.css("max-height", `${parseInt(currentMaxHeight) + aProductHeight * rowWillShow}px`);
    });
};

const handlePayOrderProducts = () => {
    const paymentMethodElList = $(".main .payment-methods__list .payment-methods__item");
    const checkMarkList = $(".main .payment-methods__list .payment-methods__item--content > .check-mark");
    const uncheckMarkList = $(".main .payment-methods__list .payment-methods__item--content > .uncheck-mark");
    const checkoutOrderProductsButton = $(".main .order-total .checkout-accept-button");
    let hasPaymentMethod = false;
    const paymentModal = new bootstrap.Modal(document.getElementById("confirmOrderProductModal"), {
        keyboard: false,
    });

    const renderOrderProductList = () => {};
    renderOrderProductList();

    paymentMethodElList.each((index) => {
        paymentMethodElList[index].addEventListener("click", () => {
            paymentMethodElList.each((key) => {
                paymentMethodElList[key].classList.remove("selected");
                checkMarkList[key].style.display = "none";
                uncheckMarkList[key].style.display = "block";
            });
            paymentMethodElList[index].classList.add("selected");
            checkMarkList[index].style.display = "block";
            uncheckMarkList[index].style.display = "none";
        });
    });

    const renderOrderProductsList = () => {
        const productList = $(".bill-detail__content--product-list");

        productList.html("");

        cartProducts.forEach((product) => {
            if (product.checked) {
                productList.append(`
                    <div class="bill-detail__content--product-item">
                        <div class="image">
                            <img src="../assets/images/products/product-${product.id}.jpg" alt="product" />
                        </div>
                        <div style="flex: 1; margin-left:20px;">
                            <div class="name">${product.name}</div>
                            <div class="type">Loại: <span>${product.occasion}</span></div>
                        </div>
                        <div class="cost">${product.price}₫</div>
                        <div class="quantity">${product.quantity}</div>
                        <div class="price">${(parseFloat(product.price) * product.quantity).toFixed(3)}₫</div>
                    </div>
                `);
            }
        });
    };
    renderOrderProductsList();

    // render summary order products
    const displayOrderSummary = () => {
        const priceEl = $(
            ".main .order-total .order-total__summary--list .order-total__summary--item.price span:not(.title)",
        );
        const shippingFeeEl = $(
            ".main .order-total .order-total__summary--list .order-total__summary--item.shipping-fee span:not(.title)",
        );
        const checkoutEl = $(
            ".main .order-total .order-total__summary--list .order-total__summary--item.checkout span:not(.title)",
        );

        let shippingFee = 0;
        let price = 0;
        cartProducts.forEach((product) => {
            if (product.checked) {
                shippingFee = 30;
                price += convertToNumber(product.price) * parseInt(product.quantity);
            }
        });

        priceEl.text(`${price.toFixed(3)}₫`);

        shippingFeeEl.text(`${shippingFee.toFixed(3)}₫`);

        checkoutEl.text(`${(price + shippingFee).toFixed(3)}₫`);
    };
    displayOrderSummary();

    // handle checkout order products click
    const handlePay = () => {
        const paidButton = $(".order-product-confirm .paid-button");

        paidButton.on("click", () => {
            setTimeout(() => {
                window.location.href = "./purchase.html";
            }, 1000);
        });
    };

    const handleCheckoutOrderButtonClick = () => {
        checkoutOrderProductsButton.on("click", () => {
            const qrCodeImg = $(".order-product-confirm .qr-code img");
            const transactionCode = Math.floor(Math.random() * 10000);
            const transactionCodeEL = $(".order-product-confirm .transaction-code");

            // change QR code
            paymentMethodElList.each((index) => {
                if (
                    paymentMethodElList[index].classList.contains("momo") &&
                    paymentMethodElList[index].classList.contains("selected")
                ) {
                    qrCodeImg.attr("src", "../assets/images/qr-codes/qr-momo.png");
                    return;
                }

                if (
                    paymentMethodElList[index].classList.contains("zalopay") &&
                    paymentMethodElList[index].classList.contains("selected")
                ) {
                    qrCodeImg.attr("src", "../assets/images/qr-codes/qr-zalopay.png");
                    return;
                }

                if (
                    paymentMethodElList[index].classList.contains("banking") &&
                    paymentMethodElList[index].classList.contains("selected")
                ) {
                    qrCodeImg.attr("src", "../assets/images/qr-codes/qr-banking.png");
                    return;
                }

                if (
                    paymentMethodElList[index].classList.contains("shopeepay") &&
                    paymentMethodElList[index].classList.contains("selected")
                ) {
                    qrCodeImg.attr("src", "../assets/images/qr-codes/qr-shopeepay.jpg");
                    return;
                }

                if (
                    paymentMethodElList[index].classList.contains("viettelmoney") &&
                    paymentMethodElList[index].classList.contains("selected")
                ) {
                    qrCodeImg.attr("src", "../assets/images/qr-codes/qr-viettelmoney.png");
                    return;
                }
            });

            paymentMethodElList.each((index) => {
                if (paymentMethodElList[index].classList.contains("selected")) {
                    hasPaymentMethod = true;
                    return;
                }
            });

            if (!hasPaymentMethod) {
                showToasts(`Chưa chọn phương thức thanh toán!`);
            } else {
                if (!paymentMethodElList[0].classList.contains("selected")) {
                    paymentModal.show();
                    transactionCodeEL.text(transactionCode);
                    handlePay();
                } else {
                    setTimeout(() => {
                        window.location.href = "./purchase.html";
                    }, 1000);
                }
            }
        });
    };
    handleCheckoutOrderButtonClick();
};

const profilePage = () => {
    const dayBox = $(".form .date-of-birth-input-group .select .day-box.box");
    const monthBox = $(".form .date-of-birth-input-group .select .month-box.box");
    const yearBox = $(".form .date-of-birth-input-group .select .year-box.box");
    const currentDate = new Date();

    // update username
    $(".form table .name").text(currentAccount.username);

    // update user email
    $(".form table .email").text(currentAccount.email);

    // update phone number
    if (currentAccount?.phone) {
        $(".form table .phone").text(currentAccount.phone);
    } else {
        $(".form table .phone").text("Chưa thêm số điện thoại");
    }

    // update user gender
    const genderRadioList = $(".form table tr td:nth-child(2) .gender-select .radio-select input");

    genderRadioList.each((index) => {
        if (currentAccount.gender === genderRadioList[index].getAttribute("value")) {
            genderRadioList[index].checked = true;
        }

        genderRadioList[index].addEventListener("change", () => {
            if (genderRadioList[index].checked) {
                currentAccount.gender = genderRadioList[index].value;
            }
        });
    });

    const handleChangeEmail = () => {
        const changeEmailButton = $(".form table tr td:nth-child(2) > div .change-email-btn");
        const email = $(".form table tr td:nth-child(2) > div .email");
        const emailInput = $(".form table tr td:nth-child(2) > div .email-input");
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        changeEmailButton.on("click", () => {
            emailInput.focus();

            if (currentAccount.email) {
                emailInput.val(currentAccount.email);
            }

            emailInput.on("change", (e) => {
                if (emailRegex.test(e.target.value)) {
                    currentAccount.email = e.target.value;
                    email.text(e.target.value);
                } else {
                    showToasts("Vui lòng nhập đúng email!");
                }
            });

            if (!email.hasClass("hidden")) {
                email.removeClass("appear");
                email.addClass("hidden");
                emailInput.removeClass("hidden");
                emailInput.addClass("appear");
                changeEmailButton.text("Đồng ý");
            } else {
                email.removeClass("hidden");
                email.addClass("appear");
                emailInput.removeClass("appear");
                emailInput.addClass("hidden");
                changeEmailButton.text("Thay đổi");
            }
        });
    };
    handleChangeEmail();

    const handleChangePhoneNumber = () => {
        const phoneNumberRegex = /(0|\+84)((3[2-9]|5[25689]|7[06-9]|8[1-689]|9\d)\d{7}|(1\d{9}))/;
        const changePhoneButton = $(".form table tr td:nth-child(2) > div .change-phone-btn");
        const phone = $(".form table tr td:nth-child(2) > div .phone");
        const phoneInput = $(".form table tr td:nth-child(2) > div .phone-input");

        changePhoneButton.on("click", () => {
            phoneInput.focus();

            if (currentAccount.phone) {
                phoneInput.val(currentAccount.phone);
            } else {
                phoneInput.val("");
            }

            phoneInput.on("change", (e) => {
                if (phoneNumberRegex.test(e.target.value)) {
                    currentAccount.phone = e.target.value;
                    phone.text(e.target.value);
                } else {
                    showToasts("Vui lòng nhập đúng số điện thoại!");
                }
            });

            if (!phone.hasClass("hidden")) {
                phone.removeClass("appear");
                phone.addClass("hidden");
                phoneInput.removeClass("hidden");
                phoneInput.addClass("appear");
                changePhoneButton.text("Đồng ý");
            } else {
                phone.removeClass("hidden");
                phone.addClass("appear");
                phoneInput.removeClass("appear");
                phoneInput.addClass("hidden");
                changePhoneButton.text("Thay đổi");
            }
        });
    };
    handleChangePhoneNumber();

    const renderDateOfBirthOptions = () => {
        const daySelect = $(".form .date-of-birth-input-group .day-select");
        const monthSelect = $(".form .date-of-birth-input-group .month-select");
        const yearSelect = $(".form .date-of-birth-input-group .year-select");
        const dayBox = $(".form .date-of-birth-input-group .day-select .day-box");
        const monthBox = $(".form .date-of-birth-input-group .month-select .month-box");
        const yearBox = $(".form .date-of-birth-input-group .year-select .year-box");

        daySelect.on("click", () => {
            if (dayBox.css("display") === "none") {
                dayBox.css("display", "block");
            } else {
                dayBox.css("display", "none");
            }
        });

        monthSelect.on("click", () => {
            if (monthBox.css("display") === "none") {
                monthBox.css("display", "block");
            } else {
                monthBox.css("display", "none");
            }
        });

        yearSelect.on("click", () => {
            if (yearBox.css("display") === "none") {
                yearBox.css("display", "block");
            } else {
                yearBox.css("display", "none");
            }
        });

        for (let i = 1; i <= 31; i++) {
            dayBox.append(`<div value="d${i}">${i}</div>`);

            const currentDayEl = $(`.form .date-of-birth-input-group .select .box > div[value=d${i}]`);
            const selectDayContent = $(".form .date-of-birth-input-group > .day-select .content");

            if (currentAccount?.dateOfBirth?.day) {
                selectDayContent.text(currentAccount.dateOfBirth.day);
            } else {
                selectDayContent.text("Chọn ngày");
            }

            currentDayEl.on("click", () => {
                selectDayContent.text(i);
                currentAccount.dateOfBirth = {
                    ...currentAccount.dateOfBirth,
                    day: i,
                };
            });
        }
        for (let i = 1; i <= 12; i++) {
            monthBox.append(`<div value="m${i}">${i}</div>`);

            const currentMonthEl = $(`.form .date-of-birth-input-group .select .box > div[value=m${i}]`);
            const selectMonthContent = $(".form .date-of-birth-input-group > .month-select .content");

            if (currentAccount?.dateOfBirth?.month) {
                selectMonthContent.text(currentAccount.dateOfBirth.month);
            } else {
                selectMonthContent.text("Chọn tháng");
            }

            currentMonthEl.on("click", () => {
                selectMonthContent.text(i);
                currentAccount.dateOfBirth = {
                    ...currentAccount.dateOfBirth,
                    month: i,
                };
            });
        }
        for (let i = currentDate.getFullYear(); i >= 1920; i--) {
            yearBox.append(`<div value="y${i}">${i}</div>`);

            const currentYearEl = $(`.form .date-of-birth-input-group .select .box > div[value=y${i}]`);
            const selectYearContent = $(".form .date-of-birth-input-group > .year-select .content");

            if (currentAccount?.dateOfBirth?.year) {
                selectYearContent.text(currentAccount.dateOfBirth.year);
            } else {
                selectYearContent.text("Chọn năm");
            }

            currentYearEl.on("click", () => {
                selectYearContent.text(i);
                currentAccount.dateOfBirth = {
                    ...currentAccount.dateOfBirth,
                    year: i,
                };
            });
        }
    };
    renderDateOfBirthOptions();

    const handleSetUserAvatar = () => {
        const avatarInput = $(".main .avatar-upload .avatar-input");
        const selectAvatarButton = $(".main .avatar-upload .select-avatar");
        const avatarImage = $(".main .avatar-upload .avatar-img");
        const reader = new FileReader();

        if (!currentAccount.avatar) {
            avatarImage.text("Chưa có ảnh đại diện");
        } else {
            avatarImage.text("");
            avatarImage.css("background-image", `url("${currentAccount.avatar}")`);
        }

        selectAvatarButton.on("click", () => {
            avatarInput.click();
        });

        avatarImage.on("click", () => {
            avatarInput.click();
        });

        avatarInput.on("change", () => {
            const file = avatarInput[0].files[0];

            reader.readAsDataURL(file);

            reader.onload = (e) => {
                currentAccount.avatar = e.target.result;
                avatarImage.css("background-image", `url("${e.target.result}")`);
                avatarImage.text("");
            };
        });
    };
    handleSetUserAvatar();

    const handleSaveChangeButton = () => {
        const saveChangeButton = $(".form .save-change-btn");

        saveChangeButton.on("click", () => {
            updateLocalStorage();

            setTimeout(() => {
                location.reload();
            }, 500);
        });
    };
    handleSaveChangeButton();
};

const handleReloadPage = () => {
    cartItemQuantity = JSON.parse(localStorage.getItem("cartItemQuantity")) || 0;
    cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    registerAccounts = JSON.parse(localStorage.getItem("registerAccounts")) || [];
    const spinnerLoading = $(".loading.spinner");

    window.addEventListener("beforeunload", () => {
        spinnerLoading.css("display", "flex");
    });

    window.addEventListener("load", () => {
        spinnerLoading.css("display", "none");
    });

    updateLocalStorage();
    handleShoppingCartNone();
    handleHeaderIntroAnimation();
    handleCardList();
    handleSuccessLogin();
    handleRenderDetailProduct();
    handleRenderSuggestProducts();
    handleRenderCartProducts();
    handleDeleteSelectedProducts();
    if (currentPageURL.endsWith("cart.html")) {
        handleRenderCartProductInCartPage();
    }
    if (currentPageURL.endsWith("all-product.html")) {
        handleRenderAllProductPage(shuffleArray(products));
        handleEventAllProductPage();
    }
    if (currentPageURL.endsWith("payment.html")) {
        handlePayOrderProducts();
    }
    if (currentPageURL.endsWith("profile.html")) {
        profilePage();
    }
};

$(document).ready(() => {
    handleReloadPage();
    handleEvents();
});
