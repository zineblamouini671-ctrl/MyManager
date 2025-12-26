// App Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Init Auth
    Auth.init();

    // Init Mock Data
    if (typeof MockData !== 'undefined') MockData.init();

    // Init Router
    Router.init();

    // Render static layout parts initially (if logged in)
    if (Store.state.currentUser) {
        document.getElementById('navbar').innerHTML = Components.Navbar();
        document.getElementById('sidebar').innerHTML = Components.Sidebar();
    }

    // Subscribe to Auth changes to update UI
    Utils.on('auth-change', (user) => {
        if (user) {
            document.getElementById('login-overlay').classList.add('hidden');
            document.getElementById('navbar').innerHTML = Components.Navbar();
            document.getElementById('sidebar').innerHTML = Components.Sidebar();
        } else {
            document.getElementById('login-overlay').classList.remove('hidden');
        }
    });

    // Initial Auth State Check for UI
    if (!Store.state.currentUser) {
        document.getElementById('login-overlay').classList.remove('hidden');
    }

    // Handle Login Form
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        const success = Auth.login(user, pass);
        if (!success) {
            document.getElementById('login-error').classList.remove('hidden');
        } else {
            document.getElementById('login-error').classList.add('hidden');
            // Redirect to dashboard if successful
            window.location.hash = '#dashboard';
        }
    });

    // Mobile Sidebar Toggle
    document.addEventListener('click', (e) => {
        const toggle = e.target.closest('#sidebar-toggle');
        if (toggle) {
            document.getElementById('sidebar').classList.toggle('hidden');
            document.getElementById('sidebar').classList.toggle('absolute');
            document.getElementById('sidebar').classList.toggle('z-50');
            document.getElementById('sidebar').classList.toggle('h-full');
        }
    });
});
