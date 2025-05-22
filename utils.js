
function checkLogin() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (user) {
        // User is logged in
        console.log('Welcome back, ' + user.name);

        // Update UI (e.g., show logout button)
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'block';
        document.getElementById('profileLink').textContent = user.name;

        return user;
    } else {
        // User is not logged in
        console.log('No user logged in');
        return null;
    }
}
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../auth/auth.html';
}

document.addEventListener('DOMContentLoaded', checkLogin);
