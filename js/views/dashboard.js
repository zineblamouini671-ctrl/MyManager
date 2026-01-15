const DashboardView = {
    render: () => {
        return `
            <div class="mb-6 flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-800">${Utils.t('dashboard')}</h1>
                <div class="flex space-x-2">
                    <button class="bg-white p-2 rounded shadow hover:bg-gray-50 text-gray-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    </button>
                    <button class="bg-primary text-white px-4 py-2 rounded shadow hover:bg-blue-600 font-medium">
                        Export Report
                    </button>
                </div>
            </div>

            <!-- Cartes KPI -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <!-- Carte 1 -->
                <div class="bg-white rounded-lg shadow p-6 border-l-4 border-primary card-hover">
                    <div class="flex items-center">
                        <div class="p-3 bg-blue-100 rounded-full text-blue-500 mr-4">
                            <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 font-bold uppercase">${Utils.t('totalUsers')}</p>
                            <p class="text-2xl font-bold text-gray-800" id="kpi-users">1,254</p>
                            <p class="text-xs text-green-500 font-medium font-mono">+12% <span class="text-gray-400">vs last month</span></p>
                        </div>
                    </div>
                </div>

                 <!-- Carte 2 -->
                <div class="bg-white rounded-lg shadow p-6 border-l-4 border-secondary card-hover">
                    <div class="flex items-center">
                        <div class="p-3 bg-green-100 rounded-full text-green-500 mr-4">
                           <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 font-bold uppercase">${Utils.t('revenue')}</p>
                            <p class="text-2xl font-bold text-gray-800" id="kpi-revenue">$0.00</p>
                             <p class="text-xs text-green-500 font-medium font-mono">+5% <span class="text-gray-400">vs last month</span></p>
                        </div>
                    </div>
                </div>

                <!-- Carte 3 -->
                <div class="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500 card-hover">
                    <div class="flex items-center">
                        <div class="p-3 bg-purple-100 rounded-full text-purple-500 mr-4">
                            <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        </div>
                        <div>
                             <p class="text-xs text-gray-500 font-bold uppercase">${Utils.t('orders')}</p>
                            <p class="text-2xl font-bold text-gray-800" id="kpi-orders">0</p>
                             <p class="text-xs text-red-500 font-medium font-mono">-2% <span class="text-gray-400">vs last month</span></p>
                        </div>
                    </div>
                </div>

                <!-- Carte 4 -->
                <div class="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500 card-hover">
                    <div class="flex items-center">
                         <div class="p-3 bg-yellow-100 rounded-full text-yellow-500 mr-4">
                           <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 font-bold uppercase">${Utils.t('products')}</p>
                            <p class="text-2xl font-bold text-gray-800" id="kpi-products">0</p>
                             <p class="text-xs text-green-500 font-medium font-mono">New</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Grille des graphiques -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <!-- Graphique linéaire -->
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-bold text-gray-700 mb-4">Revenue Growth</h3>
                    <div class="relative h-64 w-full">
                        <canvas id="lineChart"></canvas>
                    </div>
                </div>

                <!-- Graphique en barres -->
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-bold text-gray-700 mb-4">Users per Region</h3>
                    <div class="relative h-64 w-full">
                        <canvas id="barChart"></canvas>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <!-- Graphique en beignet -->
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-bold text-gray-700 mb-4">Device Usage</h3>
                    <div class="relative h-48 w-full flex justify-center">
                        <canvas id="doughnutChart"></canvas>
                    </div>
                </div>

                 <!-- Graphique circulaire -->
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-bold text-gray-700 mb-4">Order Status</h3>
                    <div class="relative h-48 w-full flex justify-center">
                        <canvas id="pieChart"></canvas>
                    </div>
                </div>

                <!-- Graphique en zone polaire -->
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-bold text-gray-700 mb-4">User Activity Impact</h3>
                    <div class="relative h-48 w-full flex justify-center">
                        <canvas id="polarChart"></canvas>
                    </div>
                </div>
            </div>
        `;
    },

    init: async () => {
        // Récupérer toutes les données nécessaires
        const [users, orders, products] = await Promise.all([
            DataService.getUsers(),
            DataService.getOrders(),
            DataService.getAll(DataService.KEYS.PRODUCTS)
        ]);

        // Calculer les revenus totaux (somme des commandes 'Completed')
        const totalRevenue = orders
            .filter(o => o.status === 'Completed')
            .reduce((acc, curr) => acc + (curr.total || 0), 0);

        // Mettre à jour les KPI du DOM
        document.getElementById('kpi-users').textContent = users.length;
        document.getElementById('kpi-revenue').textContent = '$' + totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById('kpi-orders').textContent = orders.length;
        document.getElementById('kpi-products').textContent = products.length;

        // Préparer les données pour les graphiques

        // 1. Graphique linéaire : Revenus par mois (Pour l'exemple, on simule une distribution sur les commandes)
        // Dans une vraie app, on grouperait orders par date.
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        // Simulation de données basées sur le total pour donner une forme réaliste
        const revenueData = months.map(() => Math.random() * (totalRevenue / 3));

        new Chart(document.getElementById('lineChart'), {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Revenue',
                    data: revenueData,
                    borderColor: '#3B82F6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });

        // 2. Graphique en barres : Utilisateurs par ville (Simulé car on a peu de villes dans le mock)
        // On essaie de grouper par ville si l'adresse existe
        const cities = {};
        users.forEach(u => {
            const city = (u.address && u.address.city) ? u.address.city : 'Unknown';
            cities[city] = (cities[city] || 0) + 1;
        });

        new Chart(document.getElementById('barChart'), {
            type: 'bar',
            data: {
                labels: Object.keys(cities),
                datasets: [{
                    label: 'Users',
                    data: Object.values(cities),
                    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });

        // 3. Graphique en beignet : Produits par catégorie
        const categories = {};
        products.forEach(p => {
            const cat = p.category || 'Other';
            categories[cat] = (categories[cat] || 0) + 1;
        });

        new Chart(document.getElementById('doughnutChart'), {
            type: 'doughnut',
            data: {
                labels: Object.keys(categories),
                datasets: [{
                    data: Object.values(categories),
                    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });

        // 4. Graphique circulaire : Statut des commandes
        const orderStatuses = {};
        orders.forEach(o => {
            const status = o.status || 'Unknown';
            orderStatuses[status] = (orderStatuses[status] || 0) + 1;
        });

        new Chart(document.getElementById('pieChart'), {
            type: 'pie',
            data: {
                labels: Object.keys(orderStatuses),
                datasets: [{
                    data: Object.values(orderStatuses),
                    backgroundColor: ['#10B981', '#F59E0B', '#EF4444', '#6B7280'],
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });

        // 5. Graphique polaire : Impact (Simulé)
        new Chart(document.getElementById('polarChart'), {
            type: 'polarArea',
            data: {
                labels: ['Likes', 'Comments', 'Shares', 'Views'],
                datasets: [{
                    data: [11, 16, 7, 14],
                    backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(255, 205, 86, 0.5)', 'rgba(201, 203, 207, 0.5)'],
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
};
