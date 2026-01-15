const DataService = {
    KEYS: {
        USERS: 'users',
        PRODUCTS: 'products',
        ORDERS: 'orders',
        CLIENTS: 'clients',
        INVOICES: 'invoices',
        POSTS: 'posts' // Pour les détails de l'utilisateur
    },

    init: async () => {
        // Helper pour initialiser une entité si elle est manquante
        const initEntity = (key, mockData) => {
            const stored = localStorage.getItem(key);
            let data = [];
            try { data = JSON.parse(stored); } catch (e) { }

            if (!stored || !Array.isArray(data) || data.length === 0) {
                if (mockData && mockData.length > 0) {
                    localStorage.setItem(key, JSON.stringify(mockData));
                }
            }
        };

        // Initialiser à partir de MockData si possible
        initEntity(DataService.KEYS.PRODUCTS, MockData.products);
        initEntity(DataService.KEYS.CLIENTS, MockData.clients);
        initEntity(DataService.KEYS.INVOICES, MockData.invoices);

        // Utilisateurs et Commandes (Initialisation Simplifiée avec MockData)
        let users = JSON.parse(localStorage.getItem(DataService.KEYS.USERS));
        // Note: MockData.init() gère déjà l'initialisation du localStorage pour les utilisateurs s'ils sont absents.
        // Donc nous devons juste nous assurer de les lire.
        if (!users || users.length === 0) {
            // Fallback robuste : Utiliser MockData.users OU une liste en dur si MockData est mis en cache (ancien)
            users = (MockData && MockData.users) ? MockData.users : [
                { id: 1, name: 'Yassine Bonou', email: 'y.bonou@example.com', role: 'Admin', website: 'bonou.dev', phone: '0600000001', company: { name: 'Atlas Corp', catchPhrase: 'Solutions durables', bs: 'tech marketing' }, address: { street: 'Av. Mohammed V', suite: 'Apt. 101', city: 'Casablanca', zipcode: '20000' } },
                { id: 2, name: 'Houda Benyamina', email: 'h.benyamina@example.com', role: 'User', website: 'houda.design', phone: '0600000002', company: { name: 'Creativa', catchPhrase: 'Design innovant', bs: 'media design' }, address: { street: 'Rue Zerktouni', suite: 'Suite 200', city: 'Rabat', zipcode: '10000' } },
                { id: 3, name: 'Mehdi El Glaoui', email: 'm.elglaoui@example.com', role: 'User', website: 'mehdi.codes', phone: '0600000003', company: { name: 'Maroc Digital', catchPhrase: 'Transformation numérique', bs: 'consulting' }, address: { street: 'Bd Anfa', suite: 'Etage 5', city: 'Casablanca', zipcode: '20100' } },
                { id: 4, name: 'Sofia Amrani', email: 's.amrani@example.com', role: 'Manager', website: 'sofia.biz', phone: '0600000004', company: { name: 'Invest MA', catchPhrase: 'Investir pour demain', bs: 'finance' }, address: { street: 'Av. Hassan II', suite: 'Bureau 12', city: 'Marrakech', zipcode: '40000' } },
                { id: 5, name: 'Omar Kabbaj', email: 'o.kabbaj@example.com', role: 'User', website: 'kabbaj.logistics', phone: '0600000005', company: { name: 'TransLog', catchPhrase: 'Logistique rapide', bs: 'logistics' }, address: { street: 'Zone Industrielle', suite: 'Hangar 3', city: 'Tanger', zipcode: '90000' } }
            ];
            localStorage.setItem(DataService.KEYS.USERS, JSON.stringify(users));
        }

        let orders = JSON.parse(localStorage.getItem(DataService.KEYS.ORDERS));
        if (!orders) {
            // Assigner les commandes fictives à des utilisateurs aléatoires
            orders = MockData.orders.map(o => ({
                ...o,
                userId: users.length ? users[Math.floor(Math.random() * users.length)].id : 1
            }));
            localStorage.setItem(DataService.KEYS.ORDERS, JSON.stringify(orders));
        }

        // Posts pour UserDetails (Amorcer quelques-uns)
        if (!localStorage.getItem(DataService.KEYS.POSTS)) {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/posts');
                const posts = await res.json();
                localStorage.setItem(DataService.KEYS.POSTS, JSON.stringify(posts));
            } catch (e) { }
        }
    },

    // CRUD Générique
    getAll: async (entity) => {
        await DataService.ensureInit();
        return JSON.parse(localStorage.getItem(entity)) || [];
    },

    getOne: async (entity, id) => {
        await DataService.ensureInit();
        const items = JSON.parse(localStorage.getItem(entity)) || [];
        return items.find(i => i.id == id);
    },

    add: async (entity, item) => {
        await DataService.ensureInit();
        const items = JSON.parse(localStorage.getItem(entity)) || [];
        // Générer un ID
        const newId = items.length > 0 ? Math.max(...items.map(i => Number(i.id) || 0)) + 1 : 1;
        // Si l'élément a un ID chaîne (comme les factures), peut-être une logique différente ? Pour l'instant supposons numérique ou fourni.
        // Si l'élément original avait un ID chaîne, le garder ?
        // Simplifions avec auto-incrémentation pour la cohérence sauf si ID fourni
        const finalItem = { ...item, id: item.id || newId };

        items.push(finalItem);
        localStorage.setItem(entity, JSON.stringify(items));
        return finalItem;
    },

    update: async (entity, id, updates) => {
        await DataService.ensureInit();
        const items = JSON.parse(localStorage.getItem(entity)) || [];
        const idx = items.findIndex(i => i.id == id);
        if (idx !== -1) {
            items[idx] = { ...items[idx], ...updates };
            localStorage.setItem(entity, JSON.stringify(items));
            return items[idx];
        }
        throw new Error('Not found');
    },

    delete: async (entity, id) => {
        await DataService.ensureInit();
        let items = JSON.parse(localStorage.getItem(entity)) || [];
        items = items.filter(i => i.id != id);
        localStorage.setItem(entity, JSON.stringify(items));
        return true;
    },

    // Requêtes spécifiques
    getOrdersByUser: async (userId) => {
        const orders = await DataService.getAll(DataService.KEYS.ORDERS);
        return orders.filter(o => o.userId == userId);
    },

    getPostsByUser: async (userId) => {
        const posts = await DataService.getAll(DataService.KEYS.POSTS);
        return posts.filter(p => p.userId == userId);
    },

    // Accesseurs pour rétrocompatibilité ou usage spécifique
    getUsers: () => DataService.getAll(DataService.KEYS.USERS),
    getOrders: () => DataService.getAll(DataService.KEYS.ORDERS),

    initialized: false,
    ensureInit: async () => {
        if (!DataService.initialized) {
            await DataService.init();
            DataService.initialized = true;
        }
    }
};
