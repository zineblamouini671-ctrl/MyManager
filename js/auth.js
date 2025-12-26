const Auth = {
    login: (username, password) => {
        // Static check as per requirements
        if (username === 'admin' && password === 'admin') {
            const user = { username: 'admin', role: 'admin', name: 'Administrator' };
            Store.setUser(user);
            return true;
        }
        return false;
    },

    logout: () => {
        Store.setUser(null);
        window.location.hash = '#login';
    },

    checkAuth: () => {
        if (!Store.state.currentUser) {
            // If not logged in and not on login page, redirect
            if (window.location.hash !== '#login') {
                window.location.hash = '#login';
            }
        } else {
            // If logged in and on login page, redirect to dashboard
            if (window.location.hash === '#login' || window.location.hash === '') {
                window.location.hash = '#dashboard';
            }
        }
    },

    init: () => {
        // Check initial auth state
        Auth.checkAuth();

        // Listen for hash changes to protect routes
        window.addEventListener('hashchange', Auth.checkAuth);
    }
};
