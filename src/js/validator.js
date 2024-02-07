// Variables
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/; // at least 1 numeric digit, 1 uppercase letter, 1 lowercase letter

const passwordLoginInput = $(".login-menu .form .login-form .password");
const passwordRegisterInput = $(".login-menu .form .register-form .password");
const emailLoginInput = $(".login-menu .form .login-form .email");
const emailRegisterInput = $(".login-menu .form .register-form .email");
let isValidForm = false;

// Functions
const validateForm = () => {
    // change form
    $(".message a").on("click", function () {
        $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
    });

    // Validate Register Email
    emailRegisterInput.on("change", () => {
        console.log(emailRegisterInput.val());
    });
};

$(document).ready(() => {
    validateForm();
});
