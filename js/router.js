const Router = {
    routes: {
        '#dashboard': () => DashboardView.render(),
        '#users': () => UsersView.render(),
        '#products': () => new GenericCrudView('products',
            [
                { key: 'id', label: 'ID', type: 'text' },
                { key: 'name', label: 'Product Name', type: 'text' },
                { key: 'category', label: 'Category', type: 'text' },
                { key: 'price', label: 'Price', type: 'currency' },
                { key: 'stock', label: 'Stock', type: 'text' }
            ],
            [
                { key: 'name', label: 'Product Name', type: 'text', required: true },
                { key: 'category', label: 'Category', type: 'text', required: true },
                { key: 'price', label: 'Price', type: 'number', required: true },
                { key: 'stock', label: 'Stock', type: 'number', required: true }
            ]
        ).render(),
        '#orders': () => new GenericCrudView('orders',
            [
                { key: 'id', label: 'Order ID', type: 'text' },
                { key: 'customer', label: 'Customer', type: 'text' },
                { key: 'total', label: 'Total', type: 'currency' },
                { key: 'status', label: 'Status', type: 'text' },
                { key: 'date', label: 'Date', type: 'text' }
            ],
            [
                { key: 'customer', label: 'Customer Name', type: 'text', required: true },
                { key: 'total', label: 'Total Amount', type: 'number', required: true },
                { key: 'status', label: 'Status', type: 'text', required: true },
                { key: 'date', label: 'Date', type: 'date', required: true }
            ]
        ).render(),
        '#clients': () => new GenericCrudView('clients',
            [
                { key: 'id', label: 'ID', type: 'text' },
                { key: 'name', label: 'Company Name', type: 'text' },
                { key: 'contact', label: 'Contact Person', type: 'text' },
                { key: 'email', label: 'Email', type: 'text' },
                { key: 'country', label: 'Country', type: 'text' }
            ],
            [
                { key: 'name', label: 'Company Name', type: 'text', required: true },
                { key: 'contact', label: 'Contact Person', type: 'text', required: true },
                { key: 'email', label: 'Email', type: 'email', required: true },
                { key: 'country', label: 'Country', type: 'text', required: true }
            ]
        ).render(),
        '#invoices': () => new GenericCrudView('invoices',
            [
                { key: 'id', label: 'Invoice #', type: 'text' },
                { key: 'client', label: 'Client', type: 'text' },
                { key: 'amount', label: 'Amount', type: 'currency' },
                { key: 'dueDate', label: 'Due Date', type: 'text' },
                { key: 'status', label: 'Status', type: 'text' }
            ],
            [
                { key: 'client', label: 'Client', type: 'text', required: true },
                { key: 'amount', label: 'Amount', type: 'number', required: true },
                { key: 'dueDate', label: 'Due Date', type: 'date', required: true },
                { key: 'status', label: 'Status', type: 'text', required: true }
            ]
        ).render(),
    },

    init: () => {
        window.addEventListener('hashchange', Router.navigate);
        Router.navigate(); // Chargement initial
    },

    navigate: async () => {
        const hash = window.location.hash || '#dashboard';

        if (!Store.state.currentUser) {
            document.getElementById('view-container').innerHTML = '';
            return;
        }

        // Logique du lien actif
        const links = document.querySelectorAll('aside nav a');
        links.forEach(l => {
            const href = l.getAttribute('href');
            // Vérifier la correspondance exacte ou la sous-route (ex: #users correspond à #users/123 si on avait ça, mais ici on enlève les paramètres de requête)
            const cleanHash = hash.split('?')[0];
            if (cleanHash === href) {
                l.className = 'bg-gray-800 text-white border-l-4 border-secondary group flex items-center px-3 py-3 text-sm font-medium rounded-r-md transition-colors';
            } else {
                l.className = 'text-gray-400 hover:bg-gray-800 hover:text-white group flex items-center px-3 py-3 text-sm font-medium rounded-r-md transition-colors';
            }
        });

        const container = document.getElementById('view-container');

        // Routes dynamiques (Vérifier startsWith d'abord pour les routes paramétrées)
        if (hash.startsWith('#user-details')) {
            container.innerHTML = await UserDetailsView.render();
            return;
        }

        // Routes à correspondance exacte
        if (Router.routes[hash]) {
            // Vérifier si c'est une fonction ou une chaîne
            const result = Router.routes[hash]();
            // Si Promise (async), l'attendre
            container.innerHTML = result instanceof Promise ? await result : result;

            // Hooks après rendu
            if (hash === '#dashboard' && DashboardView.init) DashboardView.init();
            if (hash === '#users' && UsersView.init) UsersView.init();

            // Init pour les vues CRUD génériques si elles existent
            if (window.CurrentCrudView && window.CurrentCrudView.init) {
                window.CurrentCrudView.init();
                window.CurrentCrudView = null; // Réinitialiser
            }

            return;
        }

        container.innerHTML = '<div class="text-center text-gray-500 mt-10">Page not found</div>';
    }
};
