// Initialisation de l'application
document.addEventListener('DOMContentLoaded', async () => {
    // Initialisation de l'authentification
    Auth.init();

    // Initialisation des données fictives
    if (typeof MockData !== 'undefined') MockData.init();

    // Initialisation du service de données
    if (typeof DataService !== 'undefined') await DataService.init();

    // Initialisation du routeur
    Router.init();

    // Rendu initial des parties statiques de la mise en page (si connecté)
    if (Store.state.currentUser) {
        document.getElementById('navbar').innerHTML = Components.Navbar();
        document.getElementById('sidebar').innerHTML = Components.Sidebar();
    }

    // Abonnement aux changements d'authentification pour mettre à jour l'interface utilisateur
    Utils.on('auth-change', (user) => {
        if (user) {
            document.getElementById('login-overlay').classList.add('hidden');
            document.getElementById('navbar').innerHTML = Components.Navbar();
            document.getElementById('sidebar').innerHTML = Components.Sidebar();
        } else {
            document.getElementById('login-overlay').classList.remove('hidden');
        }
    });

    // Vérification initiale de l'état d'authentification pour l'interface
    if (!Store.state.currentUser) {
        document.getElementById('login-overlay').classList.remove('hidden');
    }

    // Gestion du formulaire de connexion
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        const success = Auth.login(user, pass);
        if (!success) {
            document.getElementById('login-error').classList.remove('hidden');
        } else {
            document.getElementById('login-error').classList.add('hidden');
            // Redirection vers le tableau de bord si succès
            window.location.hash = '#dashboard';
        }
    });

    // Bascule de la barre latérale mobile
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
