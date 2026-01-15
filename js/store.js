const Store = {
    state: {
        // Initialiser l'état selon les exigences
        users: [],
        posts: [],
        isLoading: false
    },

    setUser: (user) => {
        Store.state.currentUser = user;
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
        Utils.emit('auth-change', user);
    },

    setLoading: (loading) => {
        Store.state.isLoading = loading;
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.toggle('hidden', !loading);
        }
    }
};
