// Données fictives
const MockData = {
    products: [
        { id: 1, name: 'Laptop Pro X', price: 1299.99, category: 'Electronics', stock: 50 },
        { id: 2, name: 'Wireless Mouse', price: 29.99, category: 'Accessories', stock: 200 },
        { id: 3, name: '4K Monitor', price: 349.50, category: 'Electronics', stock: 30 },
        { id: 4, name: 'Mechanical Keyboard', price: 89.99, category: 'Accessories', stock: 75 },
        { id: 5, name: 'USB-C Hub', price: 45.00, category: 'Accessories', stock: 120 },
        { id: 6, name: 'Gaming Chair', price: 199.99, category: 'Furniture', stock: 15 },
        { id: 7, name: 'Desk Lamp', price: 25.00, category: 'Furniture', stock: 60 },
        { id: 8, name: 'Headphones', price: 150.00, category: 'Audio', stock: 45 }
    ],
    users: [
        { id: 1, name: 'Yassine Bonou', email: 'y.bonou@example.com', role: 'Admin', website: 'bonou.dev', phone: '0600000001', company: { name: 'Atlas Corp', catchPhrase: 'Solutions durables', bs: 'tech marketing' }, address: { street: 'Av. Mohammed V', suite: 'Apt. 101', city: 'Casablanca', zipcode: '20000' } },
        { id: 2, name: 'Houda Benyamina', email: 'h.benyamina@example.com', role: 'User', website: 'houda.design', phone: '0600000002', company: { name: 'Creativa', catchPhrase: 'Design innovant', bs: 'media design' }, address: { street: 'Rue Zerktouni', suite: 'Suite 200', city: 'Rabat', zipcode: '10000' } },
        { id: 3, name: 'Mehdi El Glaoui', email: 'm.elglaoui@example.com', role: 'User', website: 'mehdi.codes', phone: '0600000003', company: { name: 'Maroc Digital', catchPhrase: 'Transformation numérique', bs: 'consulting' }, address: { street: 'Bd Anfa', suite: 'Etage 5', city: 'Casablanca', zipcode: '20100' } },
        { id: 4, name: 'Sofia Amrani', email: 's.amrani@example.com', role: 'Manager', website: 'sofia.biz', phone: '0600000004', company: { name: 'Invest MA', catchPhrase: 'Investir pour demain', bs: 'finance' }, address: { street: 'Av. Hassan II', suite: 'Bureau 12', city: 'Marrakech', zipcode: '40000' } },
        { id: 5, name: 'Omar Kabbaj', email: 'o.kabbaj@example.com', role: 'User', website: 'kabbaj.logistics', phone: '0600000005', company: { name: 'TransLog', catchPhrase: 'Logistique rapide', bs: 'logistics' }, address: { street: 'Zone Industrielle', suite: 'Hangar 3', city: 'Tanger', zipcode: '90000' } }
    ],
    orders: [
        { id: 101, customer: 'Mohammed Amine', total: 1329.98, status: 'Completed', date: '2023-10-01' },
        { id: 102, customer: 'Salma Bennani', total: 45.00, status: 'Pending', date: '2023-10-02' },
        { id: 103, customer: 'Youssef El Fassi', total: 349.50, status: 'Shipped', date: '2023-10-03' },
        { id: 104, customer: 'Hajar Tazi', total: 89.99, status: 'Cancelled', date: '2023-10-04' },
        { id: 105, customer: 'Omar Berrada', total: 224.99, status: 'Completed', date: '2023-10-05' }
    ],
    clients: [
        { id: 1, name: 'Maroc Telecom', contact: 'Ahmed Alami', email: 'ahmed.alami@iam.ma', country: 'Maroc' },
        { id: 2, name: 'OCP Group', contact: 'Fatima Zahra', email: 'f.zahra@ocp.ma', country: 'Maroc' },
        { id: 3, name: 'Attijariwafa Bank', contact: 'Karim Benjelloun', email: 'k.benjelloun@attijariwafa.com', country: 'Maroc' },
        { id: 4, name: 'Afriquia', contact: 'Rachid Idrissi', email: 'r.idrissi@afriquia.ma', country: 'Maroc' },
        { id: 5, name: 'Marjane Holding', contact: 'Layla Mansouri', email: 'l.mansouri@marjane.ma', country: 'Maroc' }
    ],
    invoices: [
        { id: 'INV-001', client: 'Maroc Telecom', amount: 5000.00, dueDate: '2023-11-01', status: 'Paid' },
        { id: 'INV-002', client: 'OCP Group', amount: 3200.50, dueDate: '2023-11-05', status: 'Unpaid' },
        { id: 'INV-003', client: 'Attijariwafa Bank', amount: 1500.00, dueDate: '2023-11-10', status: 'Overdue' },
        { id: 'INV-004', client: 'Afriquia', amount: 750.00, dueDate: '2023-11-15', status: 'Paid' }
    ],

    init: () => {
        if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify(MockData.users));
        if (!localStorage.getItem('products')) localStorage.setItem('products', JSON.stringify(MockData.products));
        if (!localStorage.getItem('orders')) localStorage.setItem('orders', JSON.stringify(MockData.orders));
        if (!localStorage.getItem('clients')) localStorage.setItem('clients', JSON.stringify(MockData.clients));
        if (!localStorage.getItem('invoices')) localStorage.setItem('invoices', JSON.stringify(MockData.invoices));
    }
};
