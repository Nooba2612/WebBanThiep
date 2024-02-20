// Variables
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/; // at least 1 numeric digit, 1 uppercase letter, 1 lowercase letter

const passwordLoginInput = $(".login-menu .form .login-form .password");
const passwordRegisterInput = $(".login-menu .form .register-form .password");
const emailLoginInput = $(".login-menu .form .login-form .email");
const emailRegisterInput = $(".login-menu .form .register-form .email");
const usernameRegisterInput = $(".register-form .user-name");
const registerAccounts = JSON.parse(localStorage.getItem("registerAccounts")) || [];
let currentAccount = JSON.parse(localStorage.getItem("currentAccount")) || {};
const toastContainer = $("#toastContainer");
let isValidForm = false;
let isLogin = false;

// Functions
const handleChangeForm = () => {
    $(".message a").on("click", function () {
        $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
    });
};

const reloadPage = (delay) => {
    setTimeout(() => {
        window.location.reload();
    }, delay);
};

const validateLoginForm = () => {
    const submitButton = $(".login-form .submit-btn");

    emailLoginInput.on("input", () => {
        emailLoginInput.removeClass("invalid");
        $(".login-form .input .email-alert").text("");
    });

    passwordLoginInput.on("input", () => {
        passwordLoginInput.removeClass("invalid");
        $(".login-form .input .password-alert").text("");
    });

    emailLoginInput.on("change", () => {
        validLoginEmail();
    });

    const handleSubmitForm = () => {
        validLoginEmail();
        validLoginPassword();

        const successLogin = !emailLoginInput.hasClass("invalid") && !passwordLoginInput.hasClass("invalid");

        if (successLogin) {
            registerAccounts.forEach((account) => {
                if (emailLoginInput.val() === account.email) {
                    currentAccount = account;
                }
            });

            localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
            showToast("Đăng nhập thành công.");

            setTimeout(() => {
                // go to home
                window.location.href = "/WebBanThiep/src/html/index.html";
            }, 900);
        }
    };

    submitButton.on("click", () => {
        handleSubmitForm();
    });

    $(".login-form").on("keydown", (e) => {
        if (e.keyCode === 13) {
            handleSubmitForm();
        }
    });
};

const validLoginEmail = () => {
    if (regexEmail.test(emailLoginInput.val())) {
        if (registerAccounts.length > 0) {
            const existEmail = registerAccounts.map((account) => account.email).includes(emailLoginInput.val());

            if (!existEmail) {
                emailLoginInput.addClass("invalid");
                $(".login-form .input .email-alert").text("Email này chưa được đăng ký!");
            } else {
                emailLoginInput.removeClass("invalid");
                $(".login-form .input .email-alert").text("");
                return;
            }
        } else {
            emailLoginInput.addClass("invalid");
            $(".login-form .input .email-alert").text("Email này chưa được đăng ký!");
        }
    } else {
        emailLoginInput.addClass("invalid");
        $(".login-form .input .email-alert").text("Vui lòng nhập đúng email!");
    }
};

const validLoginPassword = () => {
    if (passwordLoginInput.val() === "") {
        passwordLoginInput.addClass("invalid");
        $(".login-form .input .password-alert").text("Vui lòng nhập mật khẩu!");
    } else {
        const account = registerAccounts.find((account) => account.email === emailLoginInput.val());

        if (account.password !== passwordLoginInput.val()) {
            passwordLoginInput.addClass("invalid");
            $(".login-form .input .password-alert").text("Mật khẩu nhập không đúng - Kiểm tra lại!");
        } else {
            passwordLoginInput.removeClass("invalid");
            $(".login-form .input .password-alert").text("");
        }
    }
};

// ----------------------------------------------------------------

const validateRegisterForm = () => {
    const submitButton = $(".register-form .submit-btn");

    usernameRegisterInput.on("input", () => {
        usernameRegisterInput.removeClass("invalid");
        $(".register-form .input .user-name-alert").text("");
    });

    emailRegisterInput.on("input", () => {
        emailRegisterInput.removeClass("invalid");
        $(".register-form .input .email-alert").text("");
    });

    passwordRegisterInput.on("input", () => {
        passwordRegisterInput.removeClass("invalid");
        $(".register-form .input .password-alert").text("");
    });

    emailRegisterInput.on("change", () => {
        validRegisterEmail();
    });

    passwordRegisterInput.on("change", () => {
        validRegisterPassword();
    });

    const handleSubmitForm = () => {
        validRegisterUsername();
        validRegisterEmail();
        validRegisterPassword();

        const isValidAccount =
            !usernameRegisterInput.hasClass("invalid") &&
            !emailRegisterInput.hasClass("invalid") &&
            !passwordRegisterInput.hasClass("invalid");

        if (isValidAccount) {
            registerAccounts.push({
                username: usernameRegisterInput.val(),
                email: emailRegisterInput.val(),
                password: passwordRegisterInput.val(),
            });
            localStorage.setItem("registerAccounts", JSON.stringify(registerAccounts));
            showToast("Đăng ký tài khoản thành công.");
            reloadPage(900);
        }
    };

    submitButton.on("click", () => {
        handleSubmitForm();
    });

    $(".register-form").on("keydown", (e) => {
        if (e.keyCode === 13) {
            handleSubmitForm();
        }
    });
};

const showToast = (str) => {
    toastContainer.html(`
                <div
                    data-bs-animation="true"
                    data-bs-delay="3000"
                    data-bs-autohide="true"
                    class="toast submit-add-to-cart-toast hide align-items-center"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    id="submitAddToCartToast"
                >
                    <div class="toast-body">
                        ${str}
                    </div>
                </div>
        `);

    const toastElList = [].slice.call(document.querySelectorAll(".toast"));
    const toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl);
    });

    // Show each toast
    toastList.forEach(function (toast) {
        toast.show();
    });

    setTimeout(() => {
        toastList.forEach(function (toast) {
            toast._element.remove();
        });
    }, 3000);
};

const validRegisterUsername = () => {
    if (usernameRegisterInput.val() === "") {
        usernameRegisterInput.addClass("invalid");
        $(".register-form .input .user-name-alert").text("Bắt buột phải có tên người dùng!");
    } else {
        usernameRegisterInput.removeClass("invalid");
        $(".register-form .input .user-name-alert").text("");
    }
};

const validRegisterEmail = () => {
    const existEmail = registerAccounts.map((account) => account.email).includes(emailRegisterInput.val());

    if (emailRegisterInput.val() === "") {
        emailRegisterInput.addClass("invalid");
        $(".register-form .input .email-alert").text("Bắt buột phải có email!");
    } else if (existEmail) {
        emailRegisterInput.addClass("invalid");
        $(".register-form .input .email-alert").text("Email đã được sử dụng!");
    } else {
        if (!regexEmail.test(emailRegisterInput.val())) {
            emailRegisterInput.addClass("invalid");
            $(".register-form .input .email-alert").text("Vui lòng nhập đúng email!");
        } else {
            emailRegisterInput.removeClass("invalid");
            $(".register-form .input .email-alert").text("");
        }
    }
};

const validRegisterPassword = () => {
    if (passwordRegisterInput.val() === "") {
        passwordRegisterInput.addClass("invalid");
        $(".register-form .input .password-alert").text("Bắt buột phải có mật khẩu!");
    } else if (passwordRegisterInput.val().length < 8) {
        passwordRegisterInput.addClass("invalid");
        $(".register-form .input .password-alert").text("Mật khẩu phải có ít nhất 8 ký tự!");
    } else if (!containsNumber(passwordRegisterInput.val())) {
        passwordRegisterInput.addClass("invalid");
        $(".register-form .input .password-alert").text("Mật khẩu phải có ít nhất 1 chữ số!");
    } else if (!containsUppercase(passwordRegisterInput.val())) {
        passwordRegisterInput.addClass("invalid");
        $(".register-form .input .password-alert").text("Mật khẩu phải có ít nhất 1 chữ in hoa!");
    } else if (!containsLowercase(passwordRegisterInput.val())) {
        passwordRegisterInput.addClass("invalid");
        $(".register-form .input .password-alert").text("Mật khẩu phải có ít nhất 1 chữ in thường!");
    } else {
        passwordRegisterInput.removeClass("invalid");
        $(".register-form .input .password-alert").text("");
    }
};

const containsNumber = (str) => /\d/.test(str);
const containsUppercase = (str) => /[A-Z]/.test(str);
const containsLowercase = (str) => /[a-z]/.test(str);

const handleShowPassword = () => {
    const hideLoginPasswordButton = $(".login-form .input .hide-password-btn");
    const showLoginPasswordButton = $(".login-form .input .show-password-btn");
    const hideRegisterPasswordButton = $(".register-form .input .hide-password-btn");
    const showRegisterPasswordButton = $(".register-form .input .show-password-btn");

    showLoginPasswordButton.on("click", () => {
        passwordLoginInput.attr("type", "text");

        setTimeout(() => {
            showLoginPasswordButton.css("display", "none");
            hideLoginPasswordButton.css("display", "flex");
        }, 300);
    });

    hideLoginPasswordButton.on("click", () => {
        passwordLoginInput.attr("type", "password");

        setTimeout(() => {
            hideLoginPasswordButton.css("display", "none");
            showLoginPasswordButton.css("display", "flex");
        }, 300);
    });

    showRegisterPasswordButton.on("click", () => {
        passwordRegisterInput.attr("type", "text");

        setTimeout(() => {
            showRegisterPasswordButton.css("display", "none");
            hideRegisterPasswordButton.css("display", "flex");
        }, 300);
    });

    hideRegisterPasswordButton.on("click", () => {
        passwordRegisterInput.attr("type", "password");

        setTimeout(() => {
            hideRegisterPasswordButton.css("display", "none");
            showRegisterPasswordButton.css("display", "flex");
        }, 300);
    });
};

$(document).ready(() => {
    emailLoginInput.focus();

    handleChangeForm();
    validateLoginForm();
    validateRegisterForm();
    handleShowPassword();
});
