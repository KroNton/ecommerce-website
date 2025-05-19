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
    let errors = []


    errors = getSignupFormErrors(name, email, password, confirmPassword);
    console.log(errors);
    if (errors.length >= 0) {
        // show error to UI
        e.preventDefault();
        //prevent user to SignUP

    }
    else {
        // post data to DB

    }

})

signIn_form.addEventListener('submit', (e) => {
    // e.preventDefault();
    const email = signUpForm.querySelector('input[type="email"]');
    const password = signUpForm.querySelector('input[type="password"]');
    let errors = []
    errors = getSignInFormErrors(email, password);

    if (errors.length >= 0) {
        // show error to UI

        //prevent user to SignUP
        e.preventDefault();
    }
    else {
        // validate data in DB

    }

})

function getSignupFormErrors(name, email, password, confirmPassword) {
    let errors = [];

    if (name.value === '' || name.value == null) {
        errors.push('Name is Required.')
        name.classList.add('incorrect');
    }
    if (email.value === '' || email.value == null) {
        errors.push('Email is Required.')
        email.classList.add('incorrect');
    }
    if (password.value === '' || password.value == null) {
        errors.push('Password is Required.')
        password.classList.add('incorrect');
    }
    if (password.value !== confirmPassword.value) {

        errors.push('password does not match.')
        confirmPassword.classList.add('incorrect');
    }

    return errors
}


// Frontend validation


function getSignInFormErrors(email, password) {


    if (email === '' || email == null) {
        errors.push('Email is Required.')
    }
    if (password === '' || password == null) {
        errors.push('Password is Required.')
    }
    return errors
}