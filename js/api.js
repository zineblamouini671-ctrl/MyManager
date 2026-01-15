const API = {
    baseUrl: 'https://jsonplaceholder.typicode.com',

    request: async (endpoint, options = {}) => {
        Store.setLoading(true);
        // Simuler un délai réseau
        await new Promise(r => setTimeout(r, 300));

        try {
            const method = options.method || 'GET';
            const body = options.body ? JSON.parse(options.body) : null;

            // Router vers DataService
            // Endpoints : /users, /products, /users/1, /orders/user/1

            // Matchers Regex
            const parts = endpoint.split('/').filter(p => p);
            const resource = parts[0];
            const id = parts[1];
            const subResource = parts[2];

            // Mapper les ressources aux clés
            const map = {
                'users': 'users',
                'products': 'products',
                'orders': 'orders',
                'clients': 'clients',
                'invoices': 'invoices',
                'posts': 'posts'
            };
            const key = map[resource];

            if (!key) throw new Error('Ressource Inconnue');

            let data = null;

            if (resource === 'users' && id && subResource === 'posts') {
                // /users/1/posts
                data = await DataService.getPostsByUser(id);
            } else if (resource === 'users' && id && subResource === 'orders') {
                // /users/1/orders
                data = await DataService.getOrdersByUser(id);
            } else if (method === 'GET') {
                if (id) {
                    data = await DataService.getOne(key, id);
                } else {
                    data = await DataService.getAll(key);
                }
            } else if (method === 'POST') {
                data = await DataService.add(key, body);
            } else if (method === 'PUT') {
                if (!id) throw new Error('ID requis pour PUT');
                data = await DataService.update(key, id, body);
            } else if (method === 'DELETE') {
                if (!id) throw new Error('ID requis pour DELETE');
                data = await DataService.delete(key, id);
            }

            return data;

        } catch (error) {
            console.error('API Request Failed:', error);
            // alert('Network Error: ' + error.message);
            return null;
        } finally {
            Store.setLoading(false);
        }
    },

    get: (endpoint) => API.request(endpoint, { method: 'GET' }),

    post: (endpoint, body) => API.request(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }),

    put: (endpoint, body) => API.request(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }),

    delete: (endpoint) => API.request(endpoint, { method: 'DELETE' })
};
