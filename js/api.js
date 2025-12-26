const API = {
    baseUrl: 'https://jsonplaceholder.typicode.com',

    request: async (endpoint, options = {}) => {
        Store.setLoading(true);
        try {
            const response = await fetch(`${API.baseUrl}${endpoint}`, options);
            if (!response.ok) throw new Error('API Error');
            return await response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            // alert('Network Error'); // Simple error handling
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
