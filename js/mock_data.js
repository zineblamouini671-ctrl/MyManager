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
    orders: [
        { id: 101, customer: 'John Doe', total: 1329.98, status: 'Completed', date: '2023-10-01' },
        { id: 102, customer: 'Jane Smith', total: 45.00, status: 'Pending', date: '2023-10-02' },
        { id: 103, customer: 'Alice Johnson', total: 349.50, status: 'Shipped', date: '2023-10-03' },
        { id: 104, customer: 'Bob Brown', total: 89.99, status: 'Cancelled', date: '2023-10-04' },
        { id: 105, customer: 'Charlie Davis', total: 224.99, status: 'Completed', date: '2023-10-05' }
    ],
    clients: [
        { id: 1, name: 'Acme Corp', contact: 'John Manager', email: 'john@acme.com', country: 'USA' },
        { id: 2, name: 'Globex Inc', contact: 'Sarah Director', email: 'sarah@globex.com', country: 'Germany' },
        { id: 3, name: 'Soylent Corp', contact: 'Bill CEO', email: 'bill@soylent.com', country: 'UK' },
        { id: 4, name: 'Initech', contact: 'Peter Engineer', email: 'peter@initech.com', country: 'USA' },
        { id: 5, name: 'Umbrella Corp', contact: 'Albert Scientist', email: 'albert@umbrella.com', country: 'Raccoon City' }
    ],
    invoices: [
        { id: 'INV-001', client: 'Acme Corp', amount: 5000.00, dueDate: '2023-11-01', status: 'Paid' },
        { id: 'INV-002', client: 'Globex Inc', amount: 3200.50, dueDate: '2023-11-05', status: 'Unpaid' },
        { id: 'INV-003', client: 'Soylent Corp', amount: 1500.00, dueDate: '2023-11-10', status: 'Overdue' },
        { id: 'INV-004', client: 'Initech', amount: 750.00, dueDate: '2023-11-15', status: 'Paid' }
    ],

    init: () => {
        if (!localStorage.getItem('products')) localStorage.setItem('products', JSON.stringify(MockData.products));
        if (!localStorage.getItem('orders')) localStorage.setItem('orders', JSON.stringify(MockData.orders));
        if (!localStorage.getItem('clients')) localStorage.setItem('clients', JSON.stringify(MockData.clients));
        if (!localStorage.getItem('invoices')) localStorage.setItem('invoices', JSON.stringify(MockData.invoices));
    }
};
