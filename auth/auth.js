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

register_form.addEventListener('submit', async (e) => {
    // 
    const name = signUpForm.querySelector('input[type="text"]').value;
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;
    const confirmPassword = signUpForm.querySelectorAll('input[type="password"]')[1].value;
    let errors = []
    errors = getSignupFormErrors(name.value, email.value, password.value, confirmPassword.value);

    if (errors.length >= 0) {
        // show error to UI

        //prevent user to SignUP
        e.preventDefault();
    }
    else {
        // post data to DB

    }

})

signIn_form.addEventListener('submit', async (e) => {
    // e.preventDefault();
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;
    let errors = []
    errors = getSignInFormErrors(email.value, password.value);

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

    if (name === '' || name == null) {
        errors.push('Name is Required.')
    }

    if (password !== confirmPassword) {


    }

    return errors
}


// Frontend validation





function getSignInFormErrors() {

}