const DataService = {
    KEYS: {
        USERS: 'users',
        PRODUCTS: 'products',
        ORDERS: 'orders',
        CLIENTS: 'clients',
        INVOICES: 'invoices',
        POSTS: 'posts' // For user details
    },

    init: async () => {
        // Helper to init an entity if missing
        const initEntity = (key, mockData) => {
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, JSON.stringify(mockData || []));
            }
        };

        // Initialize from MockData where possible
        initEntity(DataService.KEYS.PRODUCTS, MockData.products);
        initEntity(DataService.KEYS.CLIENTS, MockData.clients);
        initEntity(DataService.KEYS.INVOICES, MockData.invoices);

        // Users & Orders (Complex Init)
        let users = JSON.parse(localStorage.getItem(DataService.KEYS.USERS));
        if (!users) {
            try {
                users = await API.get('https://jsonplaceholder.typicode.com/users'); // Direct fetch to avoid recursion if API intercepted
                // If API is intercepted, this might fail if not handled, but for now let's assume valid boot
                // Actually, since we rewrite API, we should fetch via native fetch here or standard API 
                // BUT API.get will optionally use DataService, causing loop. 
                // So we use native fetch for initial seed if strictly needed.
                const res = await fetch('https://jsonplaceholder.typicode.com/users');
                users = await res.json();

                // Add fields usually missing in mock
                users = users.map(u => ({ ...u, role: 'User' }));
                localStorage.setItem(DataService.KEYS.USERS, JSON.stringify(users));
            } catch (e) {
                console.warn('Fallback to empty users', e);
                users = [];
            }
        }

        let orders = JSON.parse(localStorage.getItem(DataService.KEYS.ORDERS));
        if (!orders) {
            // Assign mock orders to random users
            orders = MockData.orders.map(o => ({
                ...o,
                userId: users.length ? users[Math.floor(Math.random() * users.length)].id : 1
            }));
            localStorage.setItem(DataService.KEYS.ORDERS, JSON.stringify(orders));
        }

        // Posts for UserDetails (Seed some)
        if (!localStorage.getItem(DataService.KEYS.POSTS)) {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/posts');
                const posts = await res.json();
                localStorage.setItem(DataService.KEYS.POSTS, JSON.stringify(posts));
            } catch (e) { }
        }
    },

    // Generic CRUD
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
        // Generate ID
        const newId = items.length > 0 ? Math.max(...items.map(i => Number(i.id) || 0)) + 1 : 1;
        // If item has String ID (like invoices), maybe different logic? For now assume numeric or provided.
        // If original item had string ID, keep it? 
        // Let's simple auto-increment for consistency unless ID provided
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

    // Specific Queries
    getOrdersByUser: async (userId) => {
        const orders = await DataService.getAll(DataService.KEYS.ORDERS);
        return orders.filter(o => o.userId == userId);
    },

    getPostsByUser: async (userId) => {
        const posts = await DataService.getAll(DataService.KEYS.POSTS);
        return posts.filter(p => p.userId == userId);
    },

    // Accessors for backward compat or specific usage
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
