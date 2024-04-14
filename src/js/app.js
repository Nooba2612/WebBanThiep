import { products } from "./products.js";

/* Variables */

const seacrhBoxInput = $(".navbar--item__search-box input");
const currentAccount = JSON.parse(localStorage.getItem("currentAccount")) || {};
let registerAccounts;
let cartItemQuantity;
let cartProducts;
let orderProducts;
const currentPageURL = window.location.href;

/* Functions */

const containsNumber = (str) => /\d/.test(str);
const containsUppercase = (str) => /[A-Z]/.test(str);
const containsLowercase = (str) => /[a-z]/.test(str);

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
    const currentProduct = products.find((product) => product.id === currentProductId);

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

    const resetOrderProduct = () => {
        cartProducts.forEach((product) => {
            product.checked = false;
            updateLocalStorage();
        });
    };
    resetOrderProduct();

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

    const handleRenderAddress = () => {
        const addressEl = $(".order-summary__address--content");
        const defaultAddress = currentAccount?.addresses?.find((address) => (address.isDefault = true));

        addressEl.html(
            defaultAddress
                ? `<div class="order-summary__address--content">
                <div class="name">${defaultAddress.name},</div>
                <div class="phone">${defaultAddress.phone},</div>
                <div class="location">
                    <i class="fa-regular fa-location-dot"></i>
                    <span>${defaultAddress.detailAddressDesc} ,${defaultAddress.location.ward}, ${defaultAddress.location.district},${defaultAddress.location.province}</span>
                </div>
            </div>`
                : `<div class="order-summary__address--content" style="font-size: 1.1rem">
                Chưa có địa chỉ
            </div>`,
        );
    };
    handleRenderAddress();

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
        const convertToNumber = (priceString) => parseFloat(priceString?.replace(/[^0-9.]/g, ""));
        let shippingFee = 0;
        let cost = 0;
        let itemQuantity = 0;

        selectProductCheckBox.each((key, checkbox) => {
            if (checkbox.checked) {
                const product = cartProducts[key];
                const productCost = convertToNumber(product?.price) * parseInt(product?.quantity);
                cost += productCost;
                shippingFee = 30;
                itemQuantity += product?.quantity;
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
                    if (index <= cartProducts.length - 1) {
                        selectProductCheckBox[index].checked = true;
                        cartProducts[index].checked = true;
                    }
                });
            } else {
                selectProductCheckBox.each((index) => {
                    if (index <= cartProducts.length - 1) {
                        selectProductCheckBox[index].checked = false;
                        cartProducts[index].checked = false;
                    }
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
        if (account.id === currentAccount?.id) {
            registerAccounts[index] = { ...currentAccount };
        }
    });
    cartItemQuantity = cartProducts.map((product) => product.quantity).reduce((sum, quantity) => sum + quantity, 0);
    currentAccount.cartItemQuantity = cartItemQuantity;
    currentAccount.cartProducts = cartProducts;
    currentAccount.orderProducts = orderProducts;
    $(".navbar--item__cart .items-quantity").text(cartItemQuantity);
    // localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    // localStorage.setItem("cartItemQuantity", JSON.stringify(cartItemQuantity));
    // localStorage.setItem("orderProducts", JSON.stringify(orderProducts));
    localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
    localStorage.setItem("registerAccounts", JSON.stringify(registerAccounts));
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

const handleSearchProduct = () => {
    const clearInputBtn = $(".navbar--item__search-box .clear-input-btn");
    const searchBtn = $(".navbar--item__search-box .submit-button");
    const searchInput = $(".navbar--item__search-box input");
    const suggestSearchBoxEl = $(".navbar--item__search-box .suggest-search-box");
    const suggestProductListEl = $(".navbar--item__search-box .suggest-search-box .product-list");
    const moreBtn = $(".navbar--item__search-box .suggest-search-box .more a");

    clearInputBtn.on("click", () => {
        searchInput.val("");
    });

    searchBtn.on("click", (e) => {
        if (searchInput.val() === "") {
            e.preventDefault();
        }
    });

    const renderSuggestProductList = (searchValue) => {
        suggestProductListEl.html("");
        if (searchValue !== "") {
            suggestSearchBoxEl.addClass("appear");
        } else {
            suggestSearchBoxEl.removeClass("appear");
        }

        let hasProduct = false;
        products.forEach((product) => {
            if (
                product.id === searchValue ||
                product.name.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
                product.occasion.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
                product.type.toLowerCase().includes(searchValue.trim().toLowerCase())
            ) {
                hasProduct = true;
                suggestProductListEl.append(`
                    <li class="product-item">
                        <a href="./detail-product.html?id=${product.id}">
                            <div class="product-img">
                                <img src="../assets/images/products/product-${product.id}.jpg" alt="" />
                            </div>
                            <div class="product-info">
                                <div class="name">${product.name}</div>
                                <div class="occasion">${product.occasion}</div>
                            </div>
                        </a>
                    </li>
                `);
                moreBtn.parent().css("display", "block");
                moreBtn.attr("href", `./search.html?keyword=${product.occasion.toLowerCase().trim()}`);
            }
        });
        if (!hasProduct) {
            suggestProductListEl.html("");
            suggestProductListEl.html(`
                <div style="padding: 10px; font-size: 0.9rem; text-align: center; color: var(--activeColor);">Không có sản phẩm</div>
            `);
            moreBtn.parent().css("display", "none");
        }
    };

    const handleSearchSuggest = () => {
        const debouncedSearch = useDebounce((value) => {
            renderSuggestProductList(value);
        }, 800);

        searchInput.on("input", (e) => {
            if (searchInput.val().trim() === "") {
                suggestSearchBoxEl.removeClass("appear");
            }
            debouncedSearch(e.currentTarget.value);
        });
    };

    const useDebounce = (callback, delay) => {
        let timerId;

        return function (...args) {
            const context = this;

            clearTimeout(timerId);

            timerId = setTimeout(() => {
                callback.apply(context, args);
            }, delay);
        };
    };

    handleSearchSuggest();
};

const handleEvents = () => {
    $(".products .products__list .products__item .buy-button").on("click", (e) => {
        handleQuickViewButtonClick(e);
    });

    $(".main .content .product-item .quick-view-button").on("click", (e) => {
        handleQuickViewButtonClick(e);
    });

    $(".footer .list .item").on("click", () => {
        showToasts("Chức năng đang được phát triển");
    });

    $(".footer .footer__contact .footer__contact--socials a").on("click", () => {
        showToasts("Chức năng đang được phát triển");
    });

    $(".header .menu--list .menu--item__offers").on("click", () => {
        showToasts("Chức năng đang được phát triển");
    });

    $(".header .menu--list .menu--item__news").on("click", () => {
        showToasts("Chức năng đang được phát triển");
    });
};

const handleLogoutAccount = () => {
    $(".navbar--item.navbar--item__login .account-manipulation li .logout-button").on("click", () => {
        localStorage.removeItem("currentAccount");

        window.location.reload();
    });
};

const handleSuccessLogin = () => {
    if (currentAccount && currentAccount.username) {
        $(".navbar--item__login").html(`
                <a href="#" ><div class="avatar" style="background-image: url(${currentAccount?.avatar});display: ${
            currentAccount.avatar ? "block" : "none"
        };"></div> ${currentAccount.avatar ? "" : '<i class="fa-solid fa-face-awesome"></i>'} <span>${
            currentAccount.username
        }</span></a>
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
    const mainEl = $(".main");
    const notFoundResultEl = $(".not-found-result");
    const showMoreBtn = $(".main .content__show-more-btn");

    productList.html("");

    if (productArray.length === 0) {
        notFoundResultEl.css("display", "flex");
        mainEl.css("display", "none");
    } else {
        notFoundResultEl.css("display", "none");
        mainEl.css("display", "block");
    }

    if (productArray.length <= 16) {
        showMoreBtn.css("display", "none");
    } else {
        showMoreBtn.css("display", "flex");
    }

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
    const quickviewBtnList = $(".main .content .product-item .quick-view-button");

    // handle quickview button click
    quickviewBtnList.each((index) => {
        quickviewBtnList[index].addEventListener("click", (e) => {
            handleQuickViewButtonClick(e);
        });
    });

    // handle add to cart
    addToCartBtn.each((index) => {
        addToCartBtn[index].addEventListener("click", (e) => {
            const productId = e.currentTarget.getAttribute("data-product-id");

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
        const aProductHeight = 520;
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

    const handleRenderAddressContent = (currentAddress) => {
        const addressEl = $(".main .address .address__content");

        const defaultAddress = currentAccount.addresses?.find((address) => (address.isDefault = true));
        const address = currentAddress || defaultAddress;
        addressEl.html(
            address
                ? `<span class="address__content--name">${address.name} (+84) ${address.phone}</span>
            <span class="address__content--location"
                >${address.detailAddressDesc}, ${address.location.ward}, ${address.location.district}, ${address.location.province}</span
            >
            <button class="address__content--change-address-btn" data-bs-toggle="modal" data-bs-target="#selectAddressModal">Thay đổi</button>`
                : `<div>Chưa có địa chỉ nhận hàng</div>
            <button class="address__content--change-address-btn" data-bs-toggle="modal" data-bs-target="#selectAddressModal">Thêm địa chỉ</button>`,
        );
    };
    handleRenderAddressContent();

    const handleChangeAddressBtnClick = () => {
        const changeAddressBtn = $(".main .address .address__content .address__content--change-address-btn");
        const addressListEl = $(".modal-select-address .modal-body .address-list");
        const selectAddressForm = $(".modal-select-address .modal-body .select-address-form");
        const inputAddressForm = $(".modal-select-address .modal-body .input-address-form");
        const modalTitle = $(".modal-select-address .modal-header");
        const provinceSelectionBtn = $(
            ".modal-select-address .modal-body .input-address-form .address-select-group .province-select",
        );
        const districtSelectionBtn = $(
            ".modal-select-address .modal-body .input-address-form .address-select-group .district-select",
        );
        const wardSelectionBtn = $(
            ".modal-select-address .modal-body .input-address-form .address-select-group .ward-select",
        );
        const addressSelectionBtnList = $(
            ".modal-select-address .modal-body .input-address-form .address-select-group .select",
        );
        const provinceSelectionsBox = $(
            ".modal-select-address .modal-body .input-address-form .address-select-group .province-option-box",
        );
        const districtSelectionsBox = $(
            ".modal-select-address .modal-body .input-address-form .address-select-group .district-option-box",
        );
        const wardSelectionsBox = $(
            ".modal-select-address .modal-body .input-address-form .address-select-group .ward-option-box",
        );
        const selectionsBoxList = $(
            ".modal-select-address .modal-body .input-address-form .address-select-group .option-box",
        );
        const provinceBtnContent = $(
            ".modal-select-address .modal-body .input-address-form .address-select-group .province-select span",
        );
        const districtBtnContent = $(
            ".modal-select-address .modal-body .input-address-form .address-select-group .district-select span",
        );
        const wardBtnContent = $(
            ".modal-select-address .modal-body .input-address-form .address-select-group .ward-select span",
        );
        const nameInputAlert = $(
            ".modal-select-address .modal-body .input-address-form .input-group .name-input .alert-message",
        );
        const phoneInputAlert = $(
            ".modal-select-address .modal-body .input-address-form .input-group .phone-input .alert-message",
        );
        const addressSelectAlertList = $(
            ".modal-select-address .modal-body .input-address-form .address-select-group .select .alert-message",
        );

        const detailAddressInputAlert = $(".modal-select-address .modal-body .address-description .alert-message");
        const defaultAddressCheckBox = $(".modal-select-address .modal-body .set-default-address-btn input");
        const nameInputEl = $(".modal-select-address .modal-body .input-address-form .input-group .name-input input");
        const phoneInputEl = $(".modal-select-address .modal-body .input-address-form .input-group .phone-input input");
        const detailAddressInput = $(".modal-select-address .modal-body .address-description textarea");

        let provinceOptionList, districtOptionList, wardOptionList;
        let provinceCode, districtCode, wardCode;
        let addressObject = {};

        // change address click
        changeAddressBtn.on("click", () => {
            const renderAddressList = () => {
                const defaultAddress = currentAccount.addresses?.find((address) => address.isDefault === true);
                const addressArray = currentAccount.addresses?.filter((address) => address.isDefault === false);

                // reset address list
                addressListEl.html("");

                // render default address
                defaultAddress &&
                    addressListEl.append(`
                    <li class="item default-address">
                        <input
                            type="checkbox"
                            class="address-option"
                            name="addressOption"
                            id="addressOption"
                            value="${defaultAddress.addressId}"
                        />
                        <div class="address-content">
                            <div class="d-flex justify-content-start align-items-center mb-2">
                                <div class="name">${defaultAddress.name}</div>
                                <div class="phone">(+84) ${defaultAddress.phone}</div>
                            </div>
                            <div class="address">
                            ${defaultAddress.detailAddressDesc}, ${defaultAddress.location.ward}, 
                            ${defaultAddress.location.district}, 
                            ${defaultAddress.location.province}
                            </div>
                            <div class="default-tag">Mặc định</div>
                        </div>
                        <button class="update-address-btn" data-address-id="${defaultAddress.addressId}">Cập nhật</button>
                    </li>
                `);

                // render address list not contains default address
                addressArray &&
                    addressArray.forEach((address) => {
                        addressListEl.append(`
                        <li class="item">
                            <input
                                type="checkbox"
                                class="address-option"
                                name="addressOption"
                                id="addressOption"
                                value="${address.addressId}"
                            />
                            <div class="address-content">
                                <div class="d-flex justify-content-start align-items-center mb-2">
                                    <div class="name">${address.name}</div>
                                    <div class="phone">(+84) ${address.phone}</div>
                                </div>
                                <div class="address">
                                    ${address.detailAddressDesc}, 
                                    ${address.location.ward}, 
                                    ${address.location.district}, 
                                    ${address.location.province}
                                </div>
                            </div>
                            <button class="update-address-btn" data-address-id="${address.addressId}">Cập nhật</button>
                        </li>
                    `);
                    });
            };
            renderAddressList();

            const handleChangeAddress = () => {
                const selectAddressRadioList = $(
                    ".modal-select-address .modal-body .address-list .item .address-option",
                );
                const addressContentList = $(".modal-select-address .modal-body .address-list .item .address-content");
                const confirmBtn = $(
                    ".modal-select-address .select-address-form .select-address-btn-group .confirm-select-btn",
                );

                let addressChecked = currentAccount.addresses?.find((address) => address.isDefault === true);
                selectAddressRadioList.each((i) => {
                    if (addressChecked.addressId === parseInt(selectAddressRadioList[i].value)) {
                        selectAddressRadioList[i].checked = true;
                    } else {
                        selectAddressRadioList[i].checked = false;
                    }

                    selectAddressRadioList[i].addEventListener("change", (e) => {
                        selectAddressRadioList.each((key) => {
                            selectAddressRadioList[key].checked = false;
                        });
                        e.target.checked = true;
                        addressChecked = currentAccount.addresses?.find(
                            (address) => address.addressId === parseInt(selectAddressRadioList[i].value),
                        );
                    });

                    addressContentList[i].addEventListener("click", (e) => {
                        selectAddressRadioList.each((key) => {
                            selectAddressRadioList[key].checked = false;
                        });
                        selectAddressRadioList[i].checked = true;
                        addressChecked = currentAccount.addresses.find(
                            (address) => address.addressId === parseInt(selectAddressRadioList[i].value),
                        );
                        console.log(addressChecked);
                    });

                    confirmBtn.on("click", () => {
                        handleRenderAddressContent(addressChecked);
                    });
                });
            };
            handleChangeAddress();

            // fetch API wards, districts, provinces
            const fetchApiLocationOptions = () => {
                const activeSelectionEl = (currentIndex) => {
                    selectionsBoxList.each((index) => {
                        if (index === currentIndex) {
                            selectionsBoxList[index].classList.add("active");
                            addressSelectionBtnList[index].classList.add("active");
                            addressSelectionBtnList[index].classList.remove("invalid");
                        } else {
                            selectionsBoxList[index].classList.remove("active");
                            addressSelectionBtnList[index].classList.remove("active");
                        }
                    });
                };
                activeSelectionEl();

                // show province selections address box
                const handleDisplayProvinceSelectionBox = async () => {
                    try {
                        const response = await fetch(
                            "https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/dist/tinh_tp.json",
                        );

                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }

                        const data = await response.json();

                        // sort name from A to Z
                        const provinces = Object.entries(data).sort((a, b) => a[1].name.localeCompare(b[1].name));
                        provinceSelectionsBox.html("");
                        for (const key in provinces) {
                            const province = provinces[key][1];
                            provinceSelectionsBox.append(`
                        <li class="province-option option" province-code="${province.code}">${province.name_with_type}</li>
                    `);
                        }

                        provinceOptionList = $(
                            ".modal-select-address .modal-body .input-address-form .address-select-group .province-option-box .province-option",
                        );

                        provinceOptionList.each((index) => {
                            const provinceEl = provinceOptionList[index];
                            provinceEl.addEventListener("click", () => {
                                provinceCode = provinceEl.getAttribute("province-code");
                                addressSelectionBtnList[1].style.cursor = "pointer";
                                provinceBtnContent.text(provinceEl.innerText);
                                activeSelectionEl(1);
                                handleDisplayDistrictSelectionsBox();
                            });
                        });
                    } catch (error) {
                        console.log(error);
                    }
                };
                handleDisplayProvinceSelectionBox();

                // show district selections address box
                const handleDisplayDistrictSelectionsBox = async () => {
                    try {
                        const response = await fetch(
                            "https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/dist/quan_huyen.json",
                        );

                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }

                        const data = await response.json();

                        // sort name from A to Z
                        const districts = Object.entries(data).sort((a, b) => a[1].name.localeCompare(b[1].name));
                        districtSelectionsBox.html("");
                        for (const key in districts) {
                            const district = districts[key][1];

                            if (district.parent_code === provinceCode) {
                                districtSelectionsBox.append(`
                                    <li class="district-option option" district-code="${district.code}">${district.name_with_type}</li>
                                `);
                            }
                        }

                        districtOptionList = $(
                            ".modal-select-address .modal-body .input-address-form .address-select-group .district-option-box .district-option",
                        );

                        if (provinceCode) {
                            districtOptionList.each((index) => {
                                const districtEl = districtOptionList[index];
                                districtEl.addEventListener("click", () => {
                                    districtCode = districtEl.getAttribute("district-code");
                                    addressSelectionBtnList[2].style.cursor = "pointer";
                                    districtBtnContent.text(districtEl.innerText);
                                    activeSelectionEl(2);
                                    handleDisplayWardSelectionsBox();
                                });
                            });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                };
                // handleDisplayDistrictSelectionsBox();

                // show ward selections address box
                const handleDisplayWardSelectionsBox = async () => {
                    try {
                        const response = await fetch(
                            "https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/dist/xa_phuong.json",
                        );

                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }

                        const data = await response.json();

                        // sort name from A to Z
                        const wards = Object.entries(data).sort((a, b) => a[1].name.localeCompare(b[1].name));
                        wardSelectionsBox.html("");
                        for (const key in wards) {
                            const ward = wards[key][1];

                            if (ward.parent_code === districtCode) {
                                wardSelectionsBox.append(`
                            <li class="ward-option option" ward-code="${ward.code}">${ward.name_with_type}</li>
                        `);
                            }
                        }
                        wardOptionList = $(
                            ".modal-select-address .modal-body .input-address-form .address-select-group .ward-option-box .ward-option",
                        );

                        if (districtCode) {
                            wardOptionList.each((index) => {
                                const wardEl = wardOptionList[index];
                                wardEl.addEventListener("click", () => {
                                    wardCode = wardEl.getAttribute("ward-code");
                                    wardBtnContent.text(wardEl.innerText);
                                    addressSelectionBtnList[2].classList.remove("active");
                                    selectionsBoxList[2].classList.remove("active");
                                });
                            });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                };
                // handleDisplayWardSelectionsBox();

                const handleAddressSelectionButtonClick = () => {
                    handleDisplayProvinceSelectionBox();
                    handleDisplayDistrictSelectionsBox();
                    handleDisplayWardSelectionsBox();

                    addressSelectionBtnList.each((index) => {
                        addressSelectionBtnList[index].addEventListener("click", () => {
                            if (addressSelectionBtnList[index].classList.contains("province-select")) {
                                activeSelectionEl(index);
                                handleDisplayProvinceSelectionBox();
                            } else if (
                                addressSelectionBtnList[index].classList.contains("district-select") &&
                                provinceCode
                            ) {
                                activeSelectionEl(index);
                                handleDisplayDistrictSelectionsBox();
                            } else if (
                                addressSelectionBtnList[index].classList.contains("ward-select") &&
                                districtCode
                            ) {
                                activeSelectionEl(index);
                                handleDisplayWardSelectionsBox();
                            }
                        });
                    });
                };
                handleAddressSelectionButtonClick();
            };
            fetchApiLocationOptions();

            const clearInput = () => {
                nameInputEl.val("");
                phoneInputEl.val("");
                detailAddressInput.val("");
                provinceBtnContent.text("Tỉnh/Thành phố");
                districtBtnContent.text("Quận/Huyện");
                wardBtnContent.text("Xã/Phường");
                provinceCode = districtCode = wardCode = undefined;
                nameInputAlert.text("");
                nameInputAlert.parent().removeClass("invalid");
                phoneInputAlert.text("");
                phoneInputAlert.parent().removeClass("invalid");
                addressSelectAlertList[0].innerText = "";
                addressSelectionBtnList[0].classList.remove("invalid");
                addressSelectAlertList[1].innerText = "";
                addressSelectionBtnList[1].classList.remove("invalid");
                addressSelectAlertList[2].innerText = "";
                addressSelectionBtnList[2].classList.remove("invalid");
                detailAddressInput.parent().removeClass("invalid");
                detailAddressInputAlert.text("");
                defaultAddressCheckBox.prop("checked", false);
            };

            const addressFormModalValidator = () => {
                const regexName = /[A-Za-z]+(?: [A-Za-z'-]+)*/;
                const regexPhone = /^0\d{9,}$/;
                const regexSpecialCharacters = /.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~-].*/;

                const isValidName = () => {
                    nameInputEl.on("change", () => {
                        if (nameInputEl.val() === "") {
                            nameInputAlert.text("Họ và Tên không được để trống");
                            nameInputAlert.parent().addClass("invalid");
                        } else if (regexSpecialCharacters.test(nameInputEl.val())) {
                            nameInputAlert.text("Họ và Tên không được để trống");
                            nameInputAlert.parent().addClass("invalid");
                        } else {
                            nameInputAlert.text("");
                            nameInputAlert.parent().removeClass("invalid");
                        }
                    });

                    nameInputEl.on("input", () => {
                        nameInputAlert.text("");
                        nameInputAlert.parent().removeClass("invalid");
                    });

                    if (nameInputEl.val() === "") {
                        nameInputAlert.text("Họ và Tên không được để trống");
                        nameInputAlert.parent().addClass("invalid");
                        return false;
                    } else if (regexSpecialCharacters.test(nameInputEl.val())) {
                        nameInputAlert.text("Họ và Tên không được để trống");
                        nameInputAlert.parent().addClass("invalid");
                        return false;
                    } else {
                        nameInputAlert.text("");
                        nameInputAlert.parent().removeClass("invalid");
                        return true;
                    }
                };

                isValidName();

                const isValidPhone = () => {
                    phoneInputEl.on("change", () => {
                        if (phoneInputEl.val() === "") {
                            phoneInputAlert.text("Số điện thoại không được để trống");
                            phoneInputAlert.parent().addClass("invalid");
                        } else if (!regexPhone.test(phoneInputEl.val())) {
                            phoneInputAlert.text("Số điện thoại không hợp lệ");
                            phoneInputAlert.parent().addClass("invalid");
                        } else {
                            phoneInputAlert.text("");
                            phoneInputAlert.parent().removeClass("invalid");
                        }
                    });

                    phoneInputEl.on("input", () => {
                        phoneInputAlert.text("");
                        phoneInputAlert.parent().removeClass("invalid");
                    });

                    if (phoneInputEl.val() === "") {
                        phoneInputAlert.text("Số điện thoại không được để trống");
                        phoneInputAlert.parent().addClass("invalid");
                        return false;
                    } else if (!regexPhone.test(phoneInputEl.val())) {
                        phoneInputAlert.text("Số điện thoại không hợp lệ");
                        phoneInputAlert.parent().addClass("invalid");
                        return false;
                    } else {
                        phoneInputAlert.text("");
                        phoneInputAlert.parent().removeClass("invalid");
                        return true;
                    }
                };
                isValidPhone();

                const isValidAddress = () => {
                    if (!provinceCode) {
                        addressSelectAlertList[0].innerText = "Không được bỏ trống";
                        addressSelectionBtnList[0].classList.add("invalid");
                    } else {
                        addressSelectAlertList[0].innerText = "";
                        addressSelectionBtnList[0].classList.remove("invalid");
                    }
                    if (!districtCode) {
                        addressSelectAlertList[1].innerText = "Không được bỏ trống";
                        addressSelectionBtnList[1].classList.add("invalid");
                    } else {
                        addressSelectAlertList[1].innerText = "";
                        addressSelectionBtnList[1].classList.remove("invalid");
                    }
                    if (!wardCode) {
                        addressSelectAlertList[2].innerText = "Không được bỏ trống";
                        addressSelectionBtnList[2].classList.add("invalid");
                    } else {
                        addressSelectAlertList[2].innerText = "";
                        addressSelectionBtnList[2].classList.remove("invalid");
                    }
                    if (provinceCode && districtCode && wardCode) {
                        return true;
                    } else {
                        return false;
                    }
                };
                isValidAddress();

                const isValidDetailAddress = () => {
                    detailAddressInput.on("change", () => {
                        if (detailAddressInput.val().length < 5) {
                            detailAddressInput.parent().addClass("invalid");
                            detailAddressInputAlert.text("Địa chỉ quá ngắn. Địa chỉ phải từ 5 ký tự trở lên");
                        } else {
                            detailAddressInput.parent().removeClass("invalid");
                            detailAddressInputAlert.text("");
                        }
                    });

                    detailAddressInput.on("input", () => {
                        detailAddressInput.parent().removeClass("invalid");
                        detailAddressInputAlert.text("");
                    });

                    if (detailAddressInput.val().length < 5) {
                        detailAddressInput.parent().addClass("invalid");
                        detailAddressInputAlert.text("Địa chỉ quá ngắn. Địa chỉ phải từ 5 ký tự trở lên");
                        return false;
                    } else {
                        detailAddressInput.parent().removeClass("invalid");
                        detailAddressInputAlert.text("");
                        return true;
                    }
                };
                isValidDetailAddress();

                const isDefaultAddress = () => {
                    const setDefaultRadioInput = $(".modal-select-address .modal-body .set-default-address-btn input");
                    const addressArr = currentAccount?.addresses || [];
                    addressArr.forEach((address, index) => {
                        if (setDefaultRadioInput.prop("checked")) {
                            addressArr[index].isDefault = false;
                        }
                    });
                    return currentAccount?.addresses ? setDefaultRadioInput.prop("checked") : true;
                };
                isDefaultAddress();

                if (isValidAddress() && isValidDetailAddress() && isValidName() && isValidPhone()) {
                    addressObject = {
                        addressId: (currentAccount.addresses?.length || 0) + 1,
                        name: nameInputEl.val(),
                        phone: phoneInputEl.val(),
                        isDefault: isDefaultAddress(),
                        location: {
                            province: provinceBtnContent.text(),
                            district: districtBtnContent.text(),
                            ward: wardBtnContent.text(),
                            provinceCode: provinceCode,
                            districtCode: districtCode,
                            wardCode: wardCode,
                        },
                        detailAddressDesc: detailAddressInput.val(),
                    };
                    return true;
                } else {
                    return false;
                }
            };

            const handleConfirmAddressModalBtnClick = (updateId) => {
                const addressFormModal = $(".input-address-form");
                const confirmBtn = inputAddressForm.hasClass("add-address-form")
                    ? $(".modal-select-address .add-address-form .address-form-btn-group .confirm-form-btn")
                    : $(".modal-select-address .update-address-form .address-form-btn-group .confirm-form-btn");

                confirmBtn.on("click", () => {
                    if (addressFormModalValidator()) {
                        if (addressFormModal.hasClass("add-address-form")) {
                            if (!currentAccount.addresses) {
                                currentAccount.addresses = [];
                                currentAccount.addresses.push(addressObject);
                                // refresh address id
                                currentAccount?.addresses.forEach((address, i) => {
                                    currentAccount.addresses[i].addressId = i + 1;
                                });
                            } else {
                                currentAccount.addresses.push(addressObject);
                            }
                        } else if (addressFormModal.hasClass("update-address-form")) {
                            let updateAddress = currentAccount.addresses.find(
                                (address) => address.addressId === updateId,
                            );

                            updateAddress = {
                                ...updateAddress,
                                name: nameInputEl.val(),
                                phone: phoneInputEl.val(),
                                isDefault: defaultAddressCheckBox.prop("checked"),
                                location: {
                                    province: provinceBtnContent.text(),
                                    district: districtBtnContent.text(),
                                    ward: wardBtnContent.text(),
                                    provinceCode: provinceCode,
                                    districtCode: districtCode,
                                    wardCode: wardCode,
                                },
                                detailAddressDesc: detailAddressInput.val(),
                            };
                            const updateIndex = currentAccount.addresses.findIndex(
                                (address) => address.addressId === updateAddress.addressId,
                            );
                            currentAccount.addresses[updateIndex] = {
                                ...updateAddress,
                            };
                            updateLocalStorage();
                        }
                        updateLocalStorage();
                        renderAddressList();
                        handleChangeAddress();
                        clearInput();
                        // location.reload();
                        inputAddressForm.css("display", "none");
                        selectAddressForm.css("display", "block");
                    }
                });
            };

            // handle update address button click
            const handleUpdateAddressBtnClick = () => {
                const updateAddressBtnList = $(
                    ".modal-select-address .modal-body .address-list .item .update-address-btn",
                );
                const backBtn = $(".modal-select-address .input-address-form .address-form-btn-group .back-modal-btn");

                updateAddressBtnList.each((index) => {
                    updateAddressBtnList[index].addEventListener("click", (e) => {
                        modalTitle.text("Cập nhật địa chỉ");

                        if (!inputAddressForm.hasClass("update-address-form")) {
                            inputAddressForm.addClass("update-address-form");
                        }

                        const address = currentAccount.addresses.find(
                            (address) => address.addressId === parseInt(e.target.getAttribute("data-address-id")),
                        );

                        if (address) {
                            nameInputEl.val(`${address.name}`);
                            phoneInputEl.val(`${address.phone}`);
                            detailAddressInput.val(`${address.detailAddressDesc}`);
                            provinceBtnContent.text(`${address.location.province}`);
                            districtBtnContent.text(`${address.location.district}`);
                            wardBtnContent.text(`${address.location.ward}`);
                            provinceCode = address.location.provinceCode;
                            districtCode = address.location.districtCode;
                            wardCode = address.location.wardCode;
                            if (address.isDefault) {
                                defaultAddressCheckBox.prop("checked", true);
                            }
                        }

                        handleConfirmAddressModalBtnClick(parseInt(e.target.getAttribute("data-address-id")));

                        inputAddressForm.css("display", "block");
                        selectAddressForm.css("display", "none");
                    });
                });

                backBtn.on("click", () => {
                    inputAddressForm.css("display", "none");
                    selectAddressForm.css("display", "block");
                    modalTitle.text("Địa chỉ của tôi");
                    inputAddressForm.removeClass("update-address-form");
                });
            };
            handleUpdateAddressBtnClick();

            // const handle add new address button click
            const handleAddNewAddressBtnClick = () => {
                const addAddressBtn = $(".modal-select-address .modal-body .add-address-btn");
                const backBtn = $(".modal-select-address .input-address-form .address-form-btn-group .back-modal-btn");

                addAddressBtn.on("click", () => {
                    modalTitle.text("Địa chỉ mới");
                    inputAddressForm.css("display", "block");
                    selectAddressForm.css("display", "none");
                    if (!inputAddressForm.hasClass("add-address-form")) {
                        inputAddressForm.addClass("add-address-form");
                    }
                    handleConfirmAddressModalBtnClick();
                });

                backBtn.on("click", () => {
                    inputAddressForm.css("display", "none");
                    selectAddressForm.css("display", "block");
                    modalTitle.text("Địa chỉ của tôi");
                    inputAddressForm.removeClass("add-address-form");
                    clearInput();
                });
            };
            handleAddNewAddressBtnClick();
        });
    };
    handleChangeAddressBtnClick();

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
            orderProducts = cartProducts.filter((product) => product.checked === true);
            cartProducts = [];
            updateLocalStorage();

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

            if (!currentAccount.addresses) {
                showToasts(`Chưa thêm địa chỉ!`);
            } else if (!hasPaymentMethod) {
                showToasts(`Chưa chọn phương thức thanh toán!`);
            } else {
                if (!paymentMethodElList[0].classList.contains("selected")) {
                    paymentModal.show();
                    transactionCodeEL.text(transactionCode);
                    handlePay();
                } else {
                    setTimeout(() => {
                        orderProducts = cartProducts.filter((product) => product.checked === true);
                        cartProducts = [];
                        updateLocalStorage();
                        window.location.href = "./purchase.html";
                    }, 1000);
                }
            }
        });
    };
    handleCheckoutOrderButtonClick();
};

const profilePage = () => {
    const mainContent = $(".main .content");

    const changeUserInfo = () => {
        const dayBox = $(".form .date-of-birth-input-group .select .day-box.box");
        const monthBox = $(".form .date-of-birth-input-group .select .month-box.box");
        const yearBox = $(".form .date-of-birth-input-group .select .year-box.box");
        const currentDate = new Date();
        mainContent.html(`
                <form class="info-form form">
                    <div class="title">Thông tin của tôi</div>
                    <div class="detail-profile">
                        <table>
                            <tr>
                                <td>Tên người dùng</td>
                                <td class="name">name</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>
                                    <div class="email-control">
                                        <div class="email">email</div>
                                        <input type="email" class="email-input" value="" />
                                        <button type="button" class="change-email-btn change-button">Thay đổi</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Số điện thoại</td>
                                <td>
                                    <div class="phone-control">
                                        <div class="phone">phone number</div>
                                        <input type="text" class="phone-input" value="" />
                                        <button type="button" class="change-phone-btn change-button">Thay đổi</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Giới tính</td>
                                <td>
                                    <div class="gender-select">
                                        <div class="radio-select">
                                            <input type="radio" id="male" value="male" name="gender" />
                                            <label for="male">Nam</label>
                                        </div>
                                        <div class="radio-select">
                                            <input type="radio" id="female" value="female" name="gender" />
                                            <label for="female">Nữ</label>
                                        </div>
                                        <div class="radio-select">
                                            <input
                                                type="radio"
                                                id="different-gender"
                                                value="different-gender"
                                                name="gender"
                                            />
                                            <label for="different-gender">Khác</label>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Ngày sinh</td>
                                <td>
                                    <div class="date-of-birth-input-group">
                                        <div class="day-select select">
                                            <span class="content">Chọn ngày</span
                                            ><i class="fa-solid fa-chevron-down"></i>
                                            <div class="day-box box">
                                                <!-- days -->
                                            </div>
                                        </div>
                                        <div class="month-select select">
                                            <span class="content">Chọn tháng</span
                                            ><i class="fa-solid fa-chevron-down"></i>
                                            <div class="month-box box">
                                                <!-- months -->
                                            </div>
                                        </div>
                                        <div class="year-select select">
                                            <span class="content">Chọn năm</span
                                            ><i class="fa-solid fa-chevron-down"></i>
                                            <div class="year-box box">
                                                <!-- years -->
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <button type="button" class="save-change-btn">Lưu thay đổi</button>
                </form>
                <div class="avatar-upload">
                    <div class="avatar-img">Chưa có ảnh đại diện</div>
                    <input type="file" class="avatar-input" accept=".jpg,.jpeg,.png" />
                    <button type="button" class="select-avatar">Chọn ảnh</button>
                </div>
        `);

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
            const phoneNumberRegex = /^(0|\+84)\d{9,10}$/;
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

            // handleClickOutside date input
            document.addEventListener("click", (e) => {
                if (!daySelect[0].contains(e.target)) {
                    dayBox.css("display", "none");
                }
                if (!monthSelect[0].contains(e.target)) {
                    monthBox.css("display", "none");
                }
                if (!yearSelect[0].contains(e.target)) {
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
    changeUserInfo();

    const changeUserAddress = () => {
        mainContent.html(`
            <form class="address-form form">
                <div class="heading">
                    <div class="title">Địa chỉ của tôi</div>
                    <button type="button" data-bs-target="#addressFormModal" data-bs-toggle="modal" class="add-address-btn">
                        <i class="fa-sharp fa-regular fa-plus"></i>
                        <span>Thêm địa chỉ</span>
                    </button>
                </div>
                <ul class="address-list">
                    
                </ul>
            </form>
        `);

        const addressModal = new bootstrap.Modal("#addressFormModal");
        const provinceSelectionBtn = $(
            ".address-form-modal .modal-body .input-address-form .address-select-group .province-select",
        );
        const districtSelectionBtn = $(
            ".address-form-modal .modal-body .input-address-form .address-select-group .district-select",
        );
        const wardSelectionBtn = $(
            ".address-form-modal .modal-body .input-address-form .address-select-group .ward-select",
        );
        const addressSelectionBtnList = $(
            ".address-form-modal .modal-body .input-address-form .address-select-group .select",
        );
        const provinceSelectionsBox = $(
            ".address-form-modal .modal-body .input-address-form .address-select-group .province-option-box",
        );
        const districtSelectionsBox = $(
            ".address-form-modal .modal-body .input-address-form .address-select-group .district-option-box",
        );
        const wardSelectionsBox = $(
            ".address-form-modal .modal-body .input-address-form .address-select-group .ward-option-box",
        );
        const selectionsBoxList = $(
            ".address-form-modal .modal-body .input-address-form .address-select-group .option-box",
        );
        const provinceBtnContent = $(
            ".address-form-modal .modal-body .input-address-form .address-select-group .province-select span",
        );
        const districtBtnContent = $(
            ".address-form-modal .modal-body .input-address-form .address-select-group .district-select span",
        );
        const wardBtnContent = $(
            ".address-form-modal .modal-body .input-address-form .address-select-group .ward-select span",
        );
        const nameInputAlert = $(
            ".address-form-modal .modal-body .input-address-form .input-group .name-input .alert-message",
        );
        const phoneInputAlert = $(
            ".address-form-modal .modal-body .input-address-form .input-group .phone-input .alert-message",
        );
        const addressSelectAlertList = $(
            ".address-form-modal .modal-body .input-address-form .address-select-group .select .alert-message",
        );
        const confirmBtn = $(".address-form-modal .modal-footer .confirm-btn");

        const detailAddressInputAlert = $(".address-form-modal .modal-body .address-description .alert-message");
        const defaultAddressCheckBox = $(".address-form-modal .modal-body .set-default-address-btn input");
        const nameInputEl = $(".address-form-modal .modal-body .input-address-form .input-group .name-input input");
        const phoneInputEl = $(".address-form-modal .modal-body .input-address-form .input-group .phone-input input");
        const detailAddressInput = $(".address-form-modal .modal-body .address-description textarea");

        let provinceOptionList, districtOptionList, wardOptionList;
        let provinceCode, districtCode, wardCode;
        let addressObject = {};

        const activeSelectionEl = (currentIndex) => {
            selectionsBoxList.each((index) => {
                if (index === currentIndex) {
                    selectionsBoxList[index].classList.add("active");
                    addressSelectionBtnList[index].classList.add("active");
                    addressSelectionBtnList[index].classList.remove("invalid");
                } else {
                    selectionsBoxList[index].classList.remove("active");
                    addressSelectionBtnList[index].classList.remove("active");
                }
            });
        };

        const findAddress = (addressId) => {
            let address = currentAccount?.addresses?.find((address) => address.addressId === addressId);
            return address;
        };

        const clearInput = () => {
            nameInputEl.val("");
            phoneInputEl.val("");
            detailAddressInput.val("");
            provinceBtnContent.text("Tỉnh/Thành phố");
            districtBtnContent.text("Quận/Huyện");
            wardBtnContent.text("Xã/Phường");
            provinceCode = districtCode = wardCode = undefined;
            nameInputAlert.text("");
            nameInputAlert.parent().removeClass("invalid");
            phoneInputAlert.text("");
            phoneInputAlert.parent().removeClass("invalid");
            addressSelectAlertList[0].innerText = "";
            addressSelectionBtnList[0].classList.remove("invalid");
            addressSelectAlertList[1].innerText = "";
            addressSelectionBtnList[1].classList.remove("invalid");
            addressSelectAlertList[2].innerText = "";
            addressSelectionBtnList[2].classList.remove("invalid");
            detailAddressInput.parent().removeClass("invalid");
            detailAddressInputAlert.text("");
            defaultAddressCheckBox.prop("checked", false);
        };

        // show province selections address box
        const handleDisplayProvinceSelectionBox = async () => {
            try {
                const response = await fetch(
                    "https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/dist/tinh_tp.json",
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();

                // sort name from A to Z
                const provinces = Object.entries(data).sort((a, b) => a[1].name.localeCompare(b[1].name));
                provinceSelectionsBox.html("");
                for (const key in provinces) {
                    const province = provinces[key][1];
                    provinceSelectionsBox.append(`
                        <li class="province-option option" province-code="${province.code}">${province.name_with_type}</li>
                    `);
                }

                provinceOptionList = $(
                    ".address-form-modal .modal-body .input-address-form .address-select-group .province-option-box .province-option",
                );

                provinceOptionList.each((index) => {
                    const provinceEl = provinceOptionList[index];
                    provinceEl.addEventListener("click", () => {
                        provinceCode = provinceEl.getAttribute("province-code");
                        addressSelectionBtnList[1].style.cursor = "pointer";
                        provinceBtnContent.text(provinceEl.innerText);
                        activeSelectionEl(1);
                        handleDisplayDistrictSelectionsBox();
                    });
                });
            } catch (error) {
                console.log(error);
            }
        };
        handleDisplayProvinceSelectionBox();

        // show district selections address box
        const handleDisplayDistrictSelectionsBox = async () => {
            try {
                const response = await fetch(
                    "https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/dist/quan_huyen.json",
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();

                // sort name from A to Z
                const districts = Object.entries(data).sort((a, b) => a[1].name.localeCompare(b[1].name));
                districtSelectionsBox.html("");
                for (const key in districts) {
                    const district = districts[key][1];

                    if (district.parent_code === provinceCode) {
                        districtSelectionsBox.append(`
                            <li class="district-option option" district-code="${district.code}">${district.name_with_type}</li>
                        `);
                    }
                }
                districtOptionList = $(
                    ".address-form-modal .modal-body .input-address-form .address-select-group .district-option-box .district-option",
                );

                if (provinceCode) {
                    districtOptionList.each((index) => {
                        const districtEl = districtOptionList[index];
                        districtEl.addEventListener("click", () => {
                            districtCode = districtEl.getAttribute("district-code");
                            addressSelectionBtnList[2].style.cursor = "pointer";
                            districtBtnContent.text(districtEl.innerText);
                            activeSelectionEl(2);
                            handleDisplayWardSelectionsBox();
                        });
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        // show ward selections address box
        const handleDisplayWardSelectionsBox = async () => {
            try {
                const response = await fetch(
                    "https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/dist/xa_phuong.json",
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();

                // sort name from A to Z
                const wards = Object.entries(data).sort((a, b) => a[1].name.localeCompare(b[1].name));
                wardSelectionsBox.html("");
                for (const key in wards) {
                    const ward = wards[key][1];

                    if (ward.parent_code === districtCode) {
                        wardSelectionsBox.append(`
                            <li class="ward-option option" ward-code="${ward.code}">${ward.name_with_type}</li>
                        `);
                    }
                }
                wardOptionList = $(
                    ".address-form-modal .modal-body .input-address-form .address-select-group .ward-option-box .ward-option",
                );

                if (districtCode) {
                    wardOptionList.each((index) => {
                        const wardEl = wardOptionList[index];
                        wardEl.addEventListener("click", () => {
                            wardCode = wardEl.getAttribute("ward-code");
                            wardBtnContent.text(wardEl.innerText);
                            addressSelectionBtnList[2].classList.remove("active");
                            selectionsBoxList[2].classList.remove("active");
                        });
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        const handleAddressSelectionButtonClick = () => {
            handleDisplayProvinceSelectionBox();
            handleDisplayDistrictSelectionsBox();
            handleDisplayWardSelectionsBox();

            addressSelectionBtnList.each((index) => {
                addressSelectionBtnList[index].addEventListener("click", () => {
                    if (addressSelectionBtnList[index].classList.contains("province-select")) {
                        activeSelectionEl(index);
                        handleDisplayProvinceSelectionBox();
                    } else if (addressSelectionBtnList[index].classList.contains("district-select") && provinceCode) {
                        activeSelectionEl(index);
                        handleDisplayDistrictSelectionsBox();
                    } else if (addressSelectionBtnList[index].classList.contains("ward-select") && districtCode) {
                        activeSelectionEl(index);
                        handleDisplayWardSelectionsBox();
                    }
                });
            });
        };
        handleAddressSelectionButtonClick();

        const addressFormModalValidator = () => {
            const regexName = /[A-Za-z]+(?: [A-Za-z'-]+)*/;
            const regexPhone = /^0\d{9,}$/;
            const regexSpecialCharacters = /.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~-].*/;

            const isValidName = () => {
                nameInputEl.on("change", () => {
                    if (nameInputEl.val() === "") {
                        nameInputAlert.text("Họ và Tên không được để trống");
                        nameInputAlert.parent().addClass("invalid");
                    } else if (regexSpecialCharacters.test(nameInputEl.val())) {
                        nameInputAlert.text("Họ và Tên không được để trống");
                        nameInputAlert.parent().addClass("invalid");
                    } else {
                        nameInputAlert.text("");
                        nameInputAlert.parent().removeClass("invalid");
                    }
                });

                nameInputEl.on("input", () => {
                    nameInputAlert.text("");
                    nameInputAlert.parent().removeClass("invalid");
                });

                if (nameInputEl.val() === "") {
                    nameInputAlert.text("Họ và Tên không được để trống");
                    nameInputAlert.parent().addClass("invalid");
                    return false;
                } else if (regexSpecialCharacters.test(nameInputEl.val())) {
                    nameInputAlert.text("Họ và Tên không được để trống");
                    nameInputAlert.parent().addClass("invalid");
                    return false;
                } else {
                    nameInputAlert.text("");
                    nameInputAlert.parent().removeClass("invalid");
                    return true;
                }
            };

            isValidName();

            const isValidPhone = () => {
                phoneInputEl.on("change", () => {
                    if (phoneInputEl.val() === "") {
                        phoneInputAlert.text("Số điện thoại không được để trống");
                        phoneInputAlert.parent().addClass("invalid");
                    } else if (!regexPhone.test(phoneInputEl.val())) {
                        phoneInputAlert.text("Số điện thoại không hợp lệ");
                        phoneInputAlert.parent().addClass("invalid");
                    } else {
                        phoneInputAlert.text("");
                        phoneInputAlert.parent().removeClass("invalid");
                    }
                });

                phoneInputEl.on("input", () => {
                    phoneInputAlert.text("");
                    phoneInputAlert.parent().removeClass("invalid");
                });

                if (phoneInputEl.val() === "") {
                    phoneInputAlert.text("Số điện thoại không được để trống");
                    phoneInputAlert.parent().addClass("invalid");
                    return false;
                } else if (!regexPhone.test(phoneInputEl.val())) {
                    phoneInputAlert.text("Số điện thoại không hợp lệ");
                    phoneInputAlert.parent().addClass("invalid");
                    return false;
                } else {
                    phoneInputAlert.text("");
                    phoneInputAlert.parent().removeClass("invalid");
                    return true;
                }
            };
            isValidPhone();

            const isValidAddress = () => {
                if (!provinceCode) {
                    addressSelectAlertList[0].innerText = "Không được bỏ trống";
                    addressSelectionBtnList[0].classList.add("invalid");
                } else {
                    addressSelectAlertList[0].innerText = "";
                    addressSelectionBtnList[0].classList.remove("invalid");
                }
                if (!districtCode) {
                    addressSelectAlertList[1].innerText = "Không được bỏ trống";
                    addressSelectionBtnList[1].classList.add("invalid");
                } else {
                    addressSelectAlertList[1].innerText = "";
                    addressSelectionBtnList[1].classList.remove("invalid");
                }
                if (!wardCode) {
                    addressSelectAlertList[2].innerText = "Không được bỏ trống";
                    addressSelectionBtnList[2].classList.add("invalid");
                } else {
                    addressSelectAlertList[2].innerText = "";
                    addressSelectionBtnList[2].classList.remove("invalid");
                }
                if (provinceCode && districtCode && wardCode) {
                    return true;
                } else {
                    return false;
                }
            };
            isValidAddress();

            const isValidDetailAddress = () => {
                detailAddressInput.on("change", () => {
                    if (detailAddressInput.val().length < 5) {
                        detailAddressInput.parent().addClass("invalid");
                        detailAddressInputAlert.text("Địa chỉ quá ngắn. Địa chỉ phải từ 5 ký tự trở lên");
                    } else {
                        detailAddressInput.parent().removeClass("invalid");
                        detailAddressInputAlert.text("");
                    }
                });

                detailAddressInput.on("input", () => {
                    detailAddressInput.parent().removeClass("invalid");
                    detailAddressInputAlert.text("");
                });

                if (detailAddressInput.val().length < 5) {
                    detailAddressInput.parent().addClass("invalid");
                    detailAddressInputAlert.text("Địa chỉ quá ngắn. Địa chỉ phải từ 5 ký tự trở lên");
                    return false;
                } else {
                    detailAddressInput.parent().removeClass("invalid");
                    detailAddressInputAlert.text("");
                    return true;
                }
            };
            isValidDetailAddress();

            const isDefaultAddress = () => {
                const setDefaultRadioInput = $(".address-form-modal .modal-body .set-default-address-btn input");
                const addressArr = currentAccount?.addresses || [];
                addressArr.forEach((address, index) => {
                    if (setDefaultRadioInput.prop("checked")) {
                        addressArr[index].isDefault = false;
                    }
                });
                return currentAccount?.addresses ? setDefaultRadioInput.prop("checked") : true;
            };
            isDefaultAddress();

            if (isValidAddress() && isValidDetailAddress() && isValidName() && isValidPhone()) {
                addressObject = {
                    addressId: (currentAccount.addresses?.length || 0) + 1,
                    name: nameInputEl.val(),
                    phone: phoneInputEl.val(),
                    isDefault: isDefaultAddress(),
                    location: {
                        province: provinceBtnContent.text(),
                        district: districtBtnContent.text(),
                        ward: wardBtnContent.text(),
                        provinceCode: provinceCode,
                        districtCode: districtCode,
                        wardCode: wardCode,
                    },
                    detailAddressDesc: detailAddressInput.val(),
                };
                return true;
            } else {
                return false;
            }
        };

        const displayAddressList = () => {
            const addressListEl = $(".form.address-form .address-list");
            const defaultAddress =
                currentAccount?.addresses &&
                currentAccount?.addresses.find((address) => {
                    return address.isDefault === true;
                });

            const addressList =
                currentAccount?.addresses &&
                currentAccount?.addresses.filter((address) => {
                    return address.isDefault !== true;
                });

            if (currentAccount) {
                currentAccount?.addresses.length !== 0
                    ? addressListEl.html(`<div class="heading">Danh sách địa chỉ</div>`)
                    : addressListEl.html(`<div class="heading">Bạn chưa thêm địa chỉ</div>`);
                defaultAddress &&
                    addressListEl.append(`
                            <li class="default-address adrress-card">
                                <div class="info">
                                    <div class="d-flex">
                                        <div class="name">${defaultAddress.name}</div>
                                        <div class="phone">${defaultAddress.phone}</div>
                                    </div>
                                    <div class="address">
                                        <span class="detail">${defaultAddress.detailAddressDesc},</span>
                                        <span class="wards">${defaultAddress.location.ward}</span>, <span class="district">${defaultAddress.location.district}</span>,
                                        <span class="province">${defaultAddress.location.province}</span>
                                    </div>
                                    <div class="default-tag">Mặc định</div>
                                </div>
                                <div class="address-control">
                                    <div>
                                        <button class="update-address-btn" type="button" data-bs-target="#addressFormModal" data-bs-toggle="modal" data-address-id="${defaultAddress.addressId}">Cập nhật</button>
                                    </div>
                                    <button class="set-default-btn disabled" type="button" data-address-id="${defaultAddress.addressId}">Thiết lập mặc định</button>
                                </div>
                            </li>
                        `);

                addressList &&
                    addressList.forEach((address) => {
                        addressListEl.append(`
                            <li class="adrress-card">
                                <div class="info">
                                    <div class="d-flex">
                                        <div class="name">${address.name}</div>
                                        <div class="phone">${address.phone}</div>
                                    </div>
                                    <div class="address">
                                        <span class="detail">${address.detailAddressDesc}</span>
                                        <span class="wards">${address.location.ward}</span>, <span class="district">${address.location.district}</span>,
                                        <span class="province">${address.location.district}</span>
                                    </div>
                                </div>
                                <div class="address-control">
                                <div>
                                    <button class="update-address-btn" type="button" data-bs-target="#addressFormModal" data-bs-toggle="modal" data-address-id="${address.addressId}">Cập nhật</button>
                                    <button class="delete-address-btn" type="button" data-address-id="${address.addressId}" data-bs-toggle="modal" data-bs-target="#confirmDeleteAddressModal">Xóa</button>
                                </div>
                                    <button class="set-default-btn" type="button" data-address-id="${address.addressId}">Thiết lập mặc định</button>
                                </div>
                            </li>
                        `);
                    });

                const handleDeleteAddressBtnClick = () => {
                    const deleteAddressBtnList = $(
                        ".form.address-form .address-list .adrress-card .address-control .delete-address-btn",
                    );
                    const confirmDeleteAddressModal = new bootstrap.Modal("#confirmDeleteAddressModal");
                    const confirmDeleteBtn = $(
                        ".confirm-delete-address-modal .modal-dialog .modal-content .modal-body .confirm-btn",
                    );
                    const backBtn = $(
                        ".confirm-delete-address-modal .modal-dialog .modal-content .modal-body .back-btn",
                    );

                    deleteAddressBtnList.each((index) => {
                        deleteAddressBtnList[index].addEventListener("click", (e) => {
                            currentAccount?.addresses &&
                                currentAccount?.addresses.forEach((address, index) => {
                                    confirmDeleteAddressModal.show();
                                    confirmDeleteBtn.on("click", () => {
                                        if (address.addressId === parseInt(e.target.getAttribute("data-address-id"))) {
                                            currentAccount.addresses.splice(index, 1);
                                            displayAddressList();
                                            // refresh address id
                                            currentAccount?.addresses.forEach((address, i) => {
                                                currentAccount.addresses[i].addressId = i + 1;
                                            });
                                            updateLocalStorage();
                                            location.reload();
                                            confirmDeleteAddressModal.hide();
                                        }
                                    });
                                    backBtn.on("click", () => {
                                        confirmDeleteAddressModal.hide();
                                    });
                                });
                        });
                    });
                };
                handleDeleteAddressBtnClick();

                const handleSetDefaultAddressBtn = () => {
                    const setDefaultAddressBtnList = $(
                        ".form.address-form .address-list .adrress-card .address-control .set-default-btn",
                    );

                    setDefaultAddressBtnList.each((index) => {
                        setDefaultAddressBtnList[index].addEventListener("click", (e) => {
                            currentAccount?.addresses?.forEach((address, i) => {
                                address.isDefault = false;
                            });

                            currentAccount?.addresses?.forEach((address, i) => {
                                if (address.addressId === parseInt(e.target.getAttribute("data-address-id"))) {
                                    currentAccount.addresses[i].isDefault = true;
                                }
                                displayAddressList();
                                updateLocalStorage();
                            });
                        });
                    });
                };
                handleSetDefaultAddressBtn();
            }

            const handleUpdateAddress = () => {
                const updateAddressBtnList = $(
                    ".form.address-form .address-list .adrress-card .address-control .update-address-btn",
                );
                const modalTitle = $(".address-form-modal .modal-header .modal-title");

                updateAddressBtnList.each((index) => {
                    updateAddressBtnList[index].addEventListener("click", (e) => {
                        $(".address-form-modal").addClass("update-address-form");
                        confirmBtn.attr("data-address-id", e.target.getAttribute("data-address-id"));
                        modalTitle.text("Cập nhật địa chỉ");
                        const addressId = parseInt(e.target.getAttribute("data-address-id"));
                        const address = findAddress(addressId);
                        if (address) {
                            nameInputEl.val(`${address.name}`);
                            phoneInputEl.val(`${address.phone}`);
                            detailAddressInput.val(`${address.detailAddressDesc}`);
                            provinceBtnContent.text(`${address.location.province}`);
                            districtBtnContent.text(`${address.location.district}`);
                            wardBtnContent.text(`${address.location.ward}`);
                            provinceCode = address.location.provinceCode;
                            districtCode = address.location.districtCode;
                            wardCode = address.location.wardCode;
                            if (address.isDefault) {
                                defaultAddressCheckBox.prop("checked", true);
                            }
                        }
                    });
                });
            };
            handleUpdateAddress();
        };
        displayAddressList();

        const handleConfirmAddressModalBtnClick = () => {
            const addressFormModal = $(".address-form-modal");

            confirmBtn.on("click", () => {
                if (addressFormModalValidator()) {
                    if (addressFormModal.hasClass("new-address-form")) {
                        if (!currentAccount.addresses) {
                            currentAccount.addresses = [];
                            currentAccount.addresses.push(addressObject);
                            // refresh address id
                            currentAccount?.addresses.forEach((address, i) => {
                                currentAccount.addresses[i].addressId = i + 1;
                            });
                        } else {
                            currentAccount.addresses.push(addressObject);
                        }
                    } else if (addressFormModal.hasClass("update-address-form")) {
                        let updateAddress = findAddress(parseInt(confirmBtn.attr("data-address-id")));
                        updateAddress = {
                            ...updateAddress,
                            name: nameInputEl.val(),
                            phone: phoneInputEl.val(),
                            isDefault: defaultAddressCheckBox.prop("checked"),
                            location: {
                                province: provinceBtnContent.text(),
                                district: districtBtnContent.text(),
                                ward: wardBtnContent.text(),
                                provinceCode: provinceCode,
                                districtCode: districtCode,
                                wardCode: wardCode,
                            },
                            detailAddressDesc: detailAddressInput.val(),
                        };
                        const updateIndex = currentAccount.addresses.findIndex(
                            (address) => address.addressId === updateAddress.addressId,
                        );
                        currentAccount.addresses[updateIndex] = {
                            ...updateAddress,
                        };
                        updateLocalStorage();
                    }
                    updateLocalStorage();
                    displayAddressList();
                    clearInput();
                    // location.reload();
                    addressModal.hide();
                }
            });
        };
        handleConfirmAddressModalBtnClick();

        const handleAddAddressBtnClick = () => {
            const addAddressBtn = $(".form.address-form .heading .add-address-btn");
            const modalTitle = $(".address-form-modal .modal-header .modal-title");

            addAddressBtn.on("click", () => {
                $(".address-form-modal").addClass("new-address-form");
                confirmBtn.removeAttr("data-address-id");
                modalTitle.text("Địa chỉ mới");
            });
        };
        handleAddAddressBtnClick();

        // close modal button click
        const closeModalBtn = $(".address-form-modal .modal-footer .close-modal-btn");
        closeModalBtn.on("click", () => {
            clearInput();
            addressModal.hide();
        });
    };
    // changeUserAddress();

    const changePassword = () => {
        mainContent.html(`
            <form class="password-form form">
                <div class="title">Thay đổi mật khẩu</div>
                <table>
                    <tr>
                        <td>Mật khẩu hiện tại</td>
                        <td>
                            <div class="current-password input-password">
                                <input type="password" required name="currentPassword" id="currentPassword" />
                                <div class="alert-message"></div>
                                <button type="button" class="show-password-btn password-btn">
                                    <i class="fa-solid fa-eye"></i>
                                </button>
                                <button type="button" class="hide-password-btn password-btn">
                                    <i class="fa-solid fa-eye-slash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Mật khẩu mới</td>
                        <td>
                            <div class="new-password input-password">
                                <input type="password" required name="newPassword" id="newPassword" />
                                <div class="alert-message"></div>
                                <button type="button" class="show-password-btn password-btn">
                                    <i class="fa-solid fa-eye"></i>
                                </button>
                                <button type="button" class="hide-password-btn password-btn">
                                    <i class="fa-solid fa-eye-slash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Xác nhận mật khẩu mới</td>
                        <td>
                            <div class="confirm-password input-password">
                                <input type="password" required name="confirmPassword" id="confirmPassword" />
                                <div class="alert-message"></div>
                                <button type="button" class="show-password-btn password-btn">
                                    <i class="fa-solid fa-eye"></i>
                                </button>
                                <button type="button" class="hide-password-btn password-btn">
                                    <i class="fa-solid fa-eye-slash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </table>
                <button type="button" class="confirm-btn">Xác nhận</button>
            </form>
        `);

        const currentPasswordInput = $(".form.password-form .current-password input");
        const newPasswordInput = $(".form.password-form .new-password input");
        const confirmPasswordInput = $(".form.password-form .confirm-password input");
        const inputPasswordList = $(".form.password-form .input-password input");
        const alertMessageList = $(".form.password-form .input-password .alert-message");
        const hideButtonList = $(".form.password-form .input-password .hide-password-btn");
        const showButtonList = $(".form.password-form .input-password .show-password-btn");
        const confirmButton = $(".form.password-form .confirm-btn");

        // handle hide password
        hideButtonList.each((index) => {
            hideButtonList[index].addEventListener("click", () => {
                setTimeout(() => {
                    hideButtonList[index].style.display = "none";
                    showButtonList[index].style.display = "block";
                    inputPasswordList[index].type = "password";
                }, 100);
            });
        });

        // handle show password
        showButtonList.each((index) => {
            showButtonList[index].addEventListener("click", () => {
                setTimeout(() => {
                    showButtonList[index].style.display = "none";
                    hideButtonList[index].style.display = "block";
                    inputPasswordList[index].type = "text";
                }, 100);
            });
        });

        // handle input password
        inputPasswordList.each((index) => {
            const isValidCurrentPassword = () => {
                if (currentAccount.password !== currentPasswordInput.val()) {
                    alertMessageList[index].innerText = "Mật khẩu sai!";
                    currentPasswordInput.parent().addClass("invalid");
                    currentPasswordInput.parent().removeClass("valid");
                    return false;
                } else {
                    alertMessageList[index].innerText = "";
                    currentPasswordInput.parent().removeClass("invalid");
                    currentPasswordInput.parent().addClass("valid");
                    return true;
                }
            };
            const isValidNewPassword = () => {
                let isValid;
                if (newPasswordInput.val() === "") {
                    newPasswordInput.parent().addClass("invalid");
                    alertMessageList[index].innerText = "Bắt buột phải có mật khẩu!";
                    newPasswordInput.parent().removeClass("valid");
                    isValid = false;
                } else if (newPasswordInput.val().length < 8) {
                    newPasswordInput.parent().addClass("invalid");
                    alertMessageList[index].innerText = "Mật khẩu phải có ít nhất 8 ký tự!";
                    newPasswordInput.parent().removeClass("valid");
                    isValid = false;
                } else if (!containsNumber(newPasswordInput.val())) {
                    newPasswordInput.parent().addClass("invalid");
                    alertMessageList[index].innerText = "Mật khẩu phải có ít nhất 1 chữ số!";
                    newPasswordInput.parent().removeClass("valid");
                    isValid = false;
                } else if (!containsUppercase(newPasswordInput.val())) {
                    newPasswordInput.parent().addClass("invalid");
                    alertMessageList[index].innerText = "Mật khẩu phải có ít nhất 1 chữ in hoa!";
                    newPasswordInput.parent().removeClass("valid");
                    isValid = false;
                } else if (!containsLowercase(newPasswordInput.val())) {
                    newPasswordInput.parent().addClass("invalid");
                    alertMessageList[index].innerText = "Mật khẩu phải có ít nhất 1 chữ in thường!";
                    newPasswordInput.parent().removeClass("valid");
                    isValid = false;
                } else if (newPasswordInput.val() === currentAccount.password) {
                    newPasswordInput.parent().addClass("invalid");
                    alertMessageList[index].innerText = "Mật khẩu phải khác mật khẩu hiện tại";
                    newPasswordInput.parent().removeClass("valid");
                    isValid = false;
                } else {
                    newPasswordInput.parent().removeClass("invalid");
                    newPasswordInput.parent().addClass("valid");
                    alertMessageList[index].innerText = "";
                    isValid = true;
                }
                return isValid;
            };
            const isValidConfirmPassword = () => {
                if (confirmPasswordInput.val() === newPasswordInput.val() && isValidNewPassword()) {
                    confirmPasswordInput.parent().removeClass("invalid");
                    confirmPasswordInput.parent().addClass("valid");
                    alertMessageList[index].innerText = "";
                    return true;
                } else {
                    confirmPasswordInput.parent().addClass("invalid");
                    confirmPasswordInput.parent().removeClass("valid");
                    alertMessageList[index].innerText = "Mật khẩu không khớp";
                    return false;
                }
            };

            inputPasswordList[index].addEventListener("change", () => {
                if (inputPasswordList[index].parentElement.classList.contains("current-password")) {
                    isValidCurrentPassword();
                } else if (inputPasswordList[index].parentElement.classList.contains("new-password")) {
                    isValidNewPassword();
                } else if (inputPasswordList[index].parentElement.classList.contains("confirm-password")) {
                    isValidConfirmPassword();
                }
            });
        });

        // handle confirm button click
        confirmButton.on("click", () => {
            const isValid =
                currentPasswordInput.parent().hasClass("valid") &&
                newPasswordInput.parent().hasClass("valid") &&
                confirmPasswordInput.parent().hasClass("valid");

            if (isValid) {
                currentAccount.password = newPasswordInput.val();
                updateLocalStorage();
                showToasts("Thay đổi mật khẩu thành công");
                setTimeout(() => {
                    location.reload();
                }, 500);
            }
        });
    };
    // changePassword();

    const categoryItemClick = () => {
        const categoryItemList = $(".category ul li.item");

        categoryItemList.each((index) => {
            categoryItemList[index].addEventListener("click", () => {
                categoryItemList.each((key) => {
                    if (categoryItemList[key].classList.contains("selected")) {
                        categoryItemList[key].classList.remove("selected");
                    }
                });

                categoryItemList[index].classList.add("selected");
                if (categoryItemList[index].classList.contains("selected")) {
                    if (categoryItemList[index].classList.contains("info")) {
                        changeUserInfo();
                    } else if (categoryItemList[index].classList.contains("address")) {
                        changeUserAddress();
                    } else if (categoryItemList[index].classList.contains("password")) {
                        changePassword();
                    }
                }
            });
        });
    };
    categoryItemClick();
};

const searchPage = () => {
    const searchInput = $(".navbar--item__search-box input");
    const mainTitleContent = $(".main .heading .heading__title span");
    const searchParams = new URLSearchParams(window.location.search);
    const searchValue = searchParams.get("keyword")?.toLowerCase().trim().replace(/\s+/g, " ");
    searchInput.val(searchValue);
    mainTitleContent.text(searchValue);
    document.title = `Kết quả tìm kiếm cho "${searchValue}"`;

    const getProductWithType = (productType) => {
        return products.filter((product) => product.type === productType);
    };

    const handleRenderSearchProducts = () => {
        const productList = $(".main .content .row");
        productList.html("");

        let productFoundArr = [];
        products.forEach((product) => {
            if (
                product.id === searchValue ||
                product.name.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
                product.occasion.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
                product.type.toLowerCase().includes(searchValue.trim().toLowerCase())
            ) {
                productFoundArr.push(product);
            }
        });
        handleRenderAllProductPage(productFoundArr);
    };
    handleRenderSearchProducts();
};

const purchasePage = () => {
    const categoryItemElList = $(".main .category .category-item");
    const productListEl = $(".main .content .product-list");
    const emptyOrderEl = $(".main .content .empty-order");
    const productList = $(".main .content .product-list");

    const handleCategoryItemClick = () => {
        categoryItemElList.each((index) => {
            categoryItemElList[index].addEventListener("click", (e) => {
                categoryItemElList.each((i) => {
                    categoryItemElList[i].classList.remove("active");
                });
                e.target.classList.add("active");

                if (index === 0 || index === 1) {
                    handleEmptyOrder();
                } else {
                    emptyOrderEl.css("display", "flex");
                    productList.css("display", "none");
                }
            });
        });
    };
    handleCategoryItemClick();

    const renderOrderProductList = () => {
        productListEl.html("");

        orderProducts &&
            orderProducts.forEach((product) => {
                productListEl.append(`
                <li class="product-item">
                    <div class="product-item__content">
                        <div class="product-item__image">
                            <img src="../assets/images/products/product-${product.id}.jpg" alt="product image" />
                        </div>
                        <div
                            style="
                                flex: 1;
                                height: 78px;
                                display: flex;
                                flex-direction: column;
                                align-items: flex-start;
                                justify-content: space-around;
                            "
                        >
                            <div class="product-item__name">
                                <a href="../html/detail-product.html?id=${product.id}">
                                    ${product.name}
                                </a>
                            </div>
                            <div class="product-item__id">Mã: <span>${product.id}</span></div>
                            <div class="product-item__quantity">
                                <i class="fa-solid fa-xmark"></i> <span>${product.quantity}</span>
                            </div>
                        </div>
                        <div class="product-item__price"><span>₫${product.price}</span></div>
                    </div>
                    <div class="checkout-price">Thành tiền: <span>₫${(
                        parseFloat(product.price) * product.quantity
                    ).toFixed(3)}</span></div>
                    <div class="product-item__action">
                        <div class="order-product-status">Chờ xác nhận</div>
                        <button type="button" class="cancel-product-btn" data-product-id="${
                            product.id
                        }">Hủy đơn</button>
                    </div>
                </li>
            `);
            });
    };
    renderOrderProductList();

    const handleEmptyOrder = () => {
        if (orderProducts.length === 0) {
            emptyOrderEl.css("display", "flex");
            productList.css("display", "none");
        } else {
            emptyOrderEl.css("display", "none");
            productList.css("display", "block");
        }
    };
    handleEmptyOrder();

    const handleCancelOrderBtnClick = () => {
        const cancelOrderModal = new bootstrap.Modal("#orderCancelModal");
        const backModalBtn = $(".modal-confirm.order-cancel-modal .modal-content .button-group .back-btn");
        const confirmCancelOrderBtn = $(
            ".modal-confirm.order-cancel-modal .modal-content .button-group .confirm-cancel-order-btn",
        );
        const cancelOrderReasonList = $(
            ".modal-confirm.order-cancel-modal .modal-content .cancel-reason-list .reason-item input[type='radio']",
        );

        const resetCancelReasonList = () => {
            cancelOrderReasonList.each((index) => {
                cancelOrderReasonList[index].checked = false;
            });
        };

        cancelOrderReasonList.each((index) => {
            cancelOrderReasonList[index].addEventListener("change", () => {
                confirmCancelOrderBtn.addClass("valid");
            });
        });

        const handleCancelOrderBtnClick = () => {
            const cancelBtnList = $(
                ".main .content .product-list .product-item .product-item__action .cancel-product-btn",
            );
            cancelBtnList.each((index) => {
                cancelBtnList[index].addEventListener("click", (e) => {
                    cancelOrderModal.show();
                    confirmCancelOrderBtn.attr("data-product-id", `${e.target.getAttribute("data-product-id")}`);
                });
            });
        };
        handleCancelOrderBtnClick();

        // confirm button click
        confirmCancelOrderBtn.on("click", (e) => {
            if (e.target.classList.contains("valid")) {
                orderProducts.forEach((product, index) => {
                    if (e.target.getAttribute("data-product-id") === product.id) {
                        orderProducts.splice(index, 1);
                        renderOrderProductList();
                        handleCancelOrderBtnClick();
                        resetCancelReasonList();
                        updateLocalStorage();
                        handleEmptyOrder();
                        cancelOrderModal.hide();
                    }
                });
            }
        });

        // back button click
        backModalBtn.on("click", (e) => {
            resetCancelReasonList();
            confirmCancelOrderBtn.removeClass("valid");
            cancelOrderModal.hide();
        });
    };
    handleCancelOrderBtnClick();
};

const handleReloadPage = () => {
    // cartItemQuantity = JSON.parse(localStorage.getItem("cartItemQuantity")) || 0;
    // cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    // orderProducts = JSON.parse(localStorage.getItem("orderProducts")) || [];
    cartItemQuantity = currentAccount?.cartItemQuantity || 0;
    cartProducts = currentAccount?.cartProducts || [];
    orderProducts = currentAccount?.orderProducts || [];
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
    handleEvents();
    handleSearchProduct();

    handleDeleteSelectedProducts();
    if (currentPageURL.includes("cart.html")) {
        handleRenderCartProductInCartPage();
    }
    if (currentPageURL.includes("all-product.html")) {
        handleRenderAllProductPage(shuffleArray(products));
        handleEventAllProductPage();
    }
    if (currentPageURL.includes("payment.html")) {
        handlePayOrderProducts();
    }
    if (currentPageURL.includes("profile.html")) {
        profilePage();
    }
    if (currentPageURL.includes("search.html")) {
        searchPage();
        handleEventAllProductPage();
    }
    if (currentPageURL.includes("purchase.html")) {
        purchasePage();
    }
};

$(document).ready(() => {
    handleReloadPage();
});
