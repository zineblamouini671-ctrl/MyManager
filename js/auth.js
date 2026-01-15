const Auth = {
    login: (username, password) => {
        // Vérification statique selon les exigences
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
            // Si non connecté et pas sur la page de connexion, rediriger
            if (window.location.hash !== '#login') {
                window.location.hash = '#login';
            }
        } else {
            // Si connecté et sur la page de connexion, rediriger vers le tableau de bord
            if (window.location.hash === '#login' || window.location.hash === '') {
                window.location.hash = '#dashboard';
            }
        }
    },

    init: () => {
        // Vérifier l'état d'authentification initial
        Auth.checkAuth();

        // Écouter les changements de hachage pour protéger les routes
        window.addEventListener('hashchange', Auth.checkAuth);
    }
};
