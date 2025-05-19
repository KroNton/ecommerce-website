const container = document.getElementById('container');


const register_form = document.getElementById('register-form');
const signIn_form = document.getElementById('signin-form');



// control Page Toggle
function handleRegister() {
    container.classList.add("active");
}
function handleLogin() {
    container.classList.remove("active");
}

register_form.addEventListener('submit', (e) => {
    // 

    const name = register_form.querySelector('input[type="text"]');
    const email = register_form.querySelector('input[type="email"]');
    const password = register_form.querySelector('input[type="password"]');
    const confirmPassword = register_form.querySelectorAll('input[type="password"]')[1];
    const error_message = register_form.querySelector('#error_message');
    let errors = []


    errors = getSignupFormErrors(name, email, password, confirmPassword);
    console.log(errors);
    if (errors.length > 0) {
        // show error to UI

        error_message.innerText = errors.join(". ");
        //prevent user to SignUP
        e.preventDefault();
        // clear Errors
        SignupClearErros(name, email, password, confirmPassword);
    }
    else {
        // post data to DB
        const userData = {
            name: name.value,
            email: email.value,
            password: password.value,
        };
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = existingUsers.some(user => user.email === email.value);
        if (userExists) {
            error_message.innerText = "User already exists!";
            e.preventDefault();
        }
        else {
            existingUsers.push(userData);
            localStorage.setItem('users', JSON.stringify(existingUsers));

            alert("Registration successful! You can now log in.");
            handleLogin(); // Switch to login form
            register_form.reset(); // Clear form
        }

    }

})

signIn_form.addEventListener('submit', (e) => {
    // e.preventDefault();
    const email = signIn_form.querySelector('input[type="email"]');
    const password = signIn_form.querySelector('input[type="password"]');
    const error_message = signIn_form.querySelector('#error_message');
    let errors = []

    errors = getSignInFormErrors(email, password);
    if (errors.length > 0) {
        // show error to UI
        error_message.innerText = errors.join(". ");
        //prevent user to SignUP
        e.preventDefault();
        // clear Errors
        SigninClearErros(email, password);

    }
    else {
        // validate data in DB
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email.value && u.password === password.value);
        if (user) {
            alert("Login successful! Redirecting...");
            // Store current user session (optional)
            localStorage.setItem('currentUser', JSON.stringify(user));
            // Redirect to a new page (e.g., dashboard)
            window.location.href = "dashboard.html";
        }
        else {
            error_message.innerText = "Invalid email or password!";
            e.preventDefault();
        }

    }

})

function getSignupFormErrors(name, email, password, confirmPassword) {
    let errors = [];

    if (name.value === '' || name.value == null) {
        errors.push('Name is Required')
        name.classList.add('incorrect');
    }
    if (email.value === '' || email.value == null) {
        errors.push('Email is Required')
        email.classList.add('incorrect');
    }
    if (password.value === '' || password.value == null) {
        errors.push('Password is Required')
        password.classList.add('incorrect');
    }
    if (password.value !== confirmPassword.value) {

        errors.push('password does not match')
        confirmPassword.classList.add('incorrect');
    }

    return errors
}


// Frontend validation


function getSignInFormErrors(email, password) {

    let errors = [];

    if (email.value === '' || email.value == null) {
        errors.push('Email is Required')
        email.classList.add('incorrect');
    }
    if (password.value === '' || password.value == null) {
        errors.push('Password is Required')
        password.classList.add('incorrect');
    }
    return errors
}

function SignupClearErros(name, email, password, confirmPassword) {
    const allInputs = [name, email, password, confirmPassword];

    allInputs.forEach(input => {
        // Add event listeners to clear errors when user types
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {

                // Special case for password confirmation
                if (input === confirmPassword && password.value === confirmPassword.value) {
                    confirmPassword.classList.remove('incorrect');
                }
                else {
                    input.classList.remove('incorrect');
                }
            }
        });

    });
}

function SigninClearErros(email, password) {
    const allInputs = [email, password];

    allInputs.forEach(input => {
        // Add event listeners to clear errors when user types
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {


                input.classList.remove('incorrect');

            }
        });

    });
}