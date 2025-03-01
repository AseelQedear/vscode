

document.addEventListener("DOMContentLoaded", function () {
    const joinLink = document.getElementById('join-link');
    const loginLink = document.getElementById('login-link');
    const backToSignupLink = document.getElementById('back-to-signup');

    if (joinLink) {
        joinLink.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href="/signup.html"; // Redirect to signup page
        });
    }

    if (loginLink) {
        loginLink.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href="/login.html"; // Redirect to login page
        });
    }

    if (backToSignupLink) {
        backToSignupLink.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href="/signup.html"; // Redirect to signup page
        });
    }
});


function validateSignup(event) {
    event.preventDefault(); // Prevent default form submission

    const errorElement = document.getElementById('error');
    const errorText = errorElement.querySelector('p');
    let messages = [];

    const firstName = document.getElementById('firstname').value.trim();
    const lastName = document.getElementById('lastname').value.trim();
    const userEmail = document.getElementById('useremail').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmpassword').value.trim();

    const nameRegex = /^[a-zA-Z ]+$/;
    if (!nameRegex.test(firstName)) messages.push('الاسم الأول يجب أن يحتوي فقط على حروف');
    if (!nameRegex.test(lastName)) messages.push('الاسم الأخير يجب أن يحتوي فقط على حروف');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(userEmail)) messages.push('الرجاء إدخال بريد إلكتروني صالح');

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
    if (!passwordRegex.test(password)) messages.push('كلمة المرور يجب أن تحتوي على حروف وأرقام، وأن تكون بين 6 و 20 حرفًا');
    if (password !== confirmPassword) messages.push('كلمات المرور غير متطابقة');

    // Check if the email is already registered
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === userEmail)) messages.push('هذا البريد الإلكتروني مسجل بالفعل');

    // Show error messages if there are any
    if (messages.length > 0) {
        errorText.innerText = messages.join('\n');
        errorElement.style.display = 'block';
    } else {
        // Create new user and save to localStorage
        const newUser = {
            firstName,
            lastName,
            email: userEmail,
            password
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        window.location.href="/index.html"; // Redirect to home page after successful signup
    }
}

function validateLogin(event) {
    event.preventDefault(); // Prevent default form submission

    
    // Collect values from the form
    const loginEmail = document.getElementById('email').value.trim();
    const loginPassword = document.getElementById('pass').value.trim();

    console.log("Email:", loginEmail);
    console.log("Password:", loginPassword);

    // Perform validation
    const loginMessages = [];
    const loginEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!loginEmailRegex.test(loginEmail)) {
        loginMessages.push('الرجاء إدخال بريد إلكتروني صالح');
    }

    const loginPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
    if (!loginPasswordRegex.test(loginPassword)) {
        loginMessages.push('كلمة المرور يجب أن تحتوي على حروف وأرقام، وأن تكون بين 6 و 20 حرفًا');
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.email === loginEmail);

    if (!user) {
        loginMessages.push('هذا البريد الإلكتروني غير مسجل');
    } else if (user.password !== loginPassword) {
        loginMessages.push('كلمة المرور غير صحيحة');
    }

    // Show validation messages if any
    const errorElement = document.getElementById('error');
    const errorText = errorElement.querySelector('p');
    if (loginMessages.length > 0) {
        errorText.innerText = loginMessages.join('\n');
        errorElement.style.display = 'block';
    } else {
        // If login is successful, store the logged-in user and redirect
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href="/index.html";
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const rmCheck = document.getElementById("rememberMe");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("pass");

    // Load saved email and password if the checkbox was checked
    if (localStorage.getItem("checkbox") === "checked" && localStorage.getItem("savedEmail")) {
        rmCheck.checked = true;
        emailInput.value = localStorage.getItem("savedEmail");

        // Retrieve saved password from localStorage
        const savedPassword = localStorage.getItem("savedPassword");
        if (savedPassword) {
            passwordInput.value = savedPassword; // Autofill password
        }
    } else {
        rmCheck.checked = false;
        emailInput.value = "";
        passwordInput.value = "";
    }

    // Function to save or remove the email and password based on checkbox state
    function lsRememberMe() {
        if (rmCheck.checked && emailInput.value !== "") {
            localStorage.setItem("savedEmail", emailInput.value);
            localStorage.setItem("checkbox", "checked");

            // Retrieve user data and save the password if the user exists
            let users = JSON.parse(localStorage.getItem("users")) || [];
            let user = users.find(user => user.email === emailInput.value);

            if (user) {
                localStorage.setItem("savedPassword", user.password);
            }
        } else {
            localStorage.removeItem("savedEmail");
            localStorage.removeItem("savedPassword");
            localStorage.removeItem("checkbox");
        }
    }

    // Function to autofill password when typing an email
    function autofillPassword() {
        const savedEmail = localStorage.getItem("savedEmail");
        const savedPassword = localStorage.getItem("savedPassword");

        if (emailInput.value.trim() === savedEmail && savedPassword) {
            passwordInput.value = savedPassword; // Autofill password
        } else {
            passwordInput.value = ""; // Clear password if email is not found or no saved password
        }
    }

    // Attach event listener to the checkbox
    rmCheck.addEventListener("change", lsRememberMe);
    // Attach event listener to the email input to update localStorage
    emailInput.addEventListener("input", autofillPassword);
    emailInput.addEventListener("input", lsRememberMe);
});

document.addEventListener("DOMContentLoaded", function () {
    // Ensure that the script runs only after the DOM is fully loaded
    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
        // When input is focused, highlight the label
        input.addEventListener("focus", function () {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label) {
                label.style.textShadow = "0 0 0.3px white, 0 0 3px white"; // Apply text shadow on focus
            }
        });

        // When input loses focus, remove the highlight from the label
        input.addEventListener("blur", function () {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label) {
                label.style.textShadow = ""; // Reset text shadow on blur
            }
        });

        // If the input is a checkbox, add a click event listener
        if (input.type === "checkbox") {
            input.addEventListener("change", function () {
                const label = document.querySelector(`label[for="${input.id}"]`);
                if (label) {
                    if (input.checked) {
                        label.style.textShadow = "0 0 0.3px white, 0 0 3px white"; // Apply text shadow when checked
                    } else {
                        label.style.textShadow = ""; // Remove text shadow when unchecked
                    }
                }
            });
        }
    });
});


