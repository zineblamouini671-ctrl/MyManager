const UserDetailsView = {
    render: async () => {
        // Parse ID from hash: #user-details?id=1
        const params = new URLSearchParams(window.location.hash.split('?')[1]);
        const id = params.get('id');

        if (!id) return '<div class="p-6 text-red-500">User ID missing</div>';

        // Fetch single user
        // const user = await API.get(`/users/${id}`);
        const users = await API.get('/users');
        const user = users.find(u => u.id == id);

        // Fetch orders for this user - using special route supported by our new API.js logic
        const orders = await API.get(`/users/${id}/orders`) || []; // I need to implement this in API.js or use manual filter if not supported.
        .

        if(!user) return '<div class="p-6 text-red-500">User not found</div>';

    // PDF Export Handler attached to window or delegate
    window.exportUserPDF = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text(`User Report: ${user.name}`, 20, 20);

        doc.setFontSize(12);
        doc.text(`ID: ${user.id}`, 20, 30);
        doc.text(`Email: ${user.email}`, 20, 40);
        doc.text(`Phone: ${user.phone}`, 20, 50);
        doc.text(`Website: ${user.website}`, 20, 60);
        doc.text(`Company: ${user.company.name}`, 20, 70);

        doc.text('Recent Posts:', 20, 90);
        let y = 100;
        posts.slice(0, 5).forEach((p, i) => {
            doc.text(`${i + 1}. ${p.title.substring(0, 50)}...`, 20, y);
            y += 10;
        });

        doc.save(`User_${user.name}.pdf`);
    };

    return `
            <div class="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
                <div class="flex justify-between items-start mb-8 border-b pb-6">
                    <div class="flex items-center">
                        <div class="h-20 w-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold mr-6">
                            ${user.name.charAt(0)}
                        </div>
                        <div>
                            <h1 class="text-3xl font-bold text-gray-800">${user.name}</h1>
                            <p class="text-gray-500">@${user.username}</p>
                        </div>
                    </div>
                    <div class="flex space-x-3">
                        <button onclick="window.history.back()" class="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-600">
                             Back
                        </button>
                        <button onclick="window.exportUserPDF()" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Export PDF
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Contact Info -->
                    <div>
                        <h3 class="text-xl font-semibold mb-4 text-gray-700">Contact Information</h3>
                        <div class="space-y-3">
                            <div class="flex items-center">
                                <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                <span>${user.email}</span>
                            </div>
                            <div class="flex items-center">
                                <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                <span>${user.phone}</span>
                            </div>
                            <div class="flex items-center">
                                <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3"></path></svg>
                                <a href="http://${user.website}" target="_blank" class="text-blue-500 hover:underline">${user.website}</a>
                            </div>
                        </div>
                    </div>

                    <!-- Company Info -->
                     <div>
                        <h3 class="text-xl font-semibold mb-4 text-gray-700">Company</h3>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="font-bold text-lg">${user.company.name}</p>
                            <p class="italic text-gray-600 mb-2">"${user.company.catchPhrase}"</p>
                            <p class="text-sm text-gray-500">${user.company.bs}</p>
                        </div>
                    </div>
                </div>

                <!-- Address -->
                 <div class="mt-8">
                    <h3 class="text-xl font-semibold mb-4 text-gray-700">Address</h3>
                    <div class="bg-gray-50 p-4 rounded-lg flex items-start">
                         <svg class="w-6 h-6 text-gray-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                         <div>
                            <p>${user.address.street}, ${user.address.suite}</p>
                            <p>${user.address.city}, ${user.address.zipcode}</p>
                         </div>
                    </div>
                </div>

                <!-- Recent Orders -->
                <div class="mt-8">
                    <h3 class="text-xl font-semibold mb-4 text-gray-700">Recent Orders (${orders.length})</h3>
                    <div class="space-y-4">
                        ${orders.length > 0 ? orders.map(order => `
                            <div class="border rounded p-4 hover:shadow-md transition flex justify-between items-center">
                                <div>
                                    <h4 class="font-bold text-lg">Order #${order.id}</h4>
                                    <p class="text-gray-600 text-sm">Date: ${order.date || 'N/A'}</p>
                                </div>
                                <div class="text-right">
                                    <p class="font-bold text-gray-800">${Utils.formatCurrency(order.total)}</p>
                                    <span class="px-2 py-1 rounded-full text-xs font-semibold 
                                        ${order.status === 'Completed' ? 'bg-green-100 text-green-600' :
            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}">
                                        ${order.status}
                                    </span>
                                </div>
                            </div>
                        `).join('') : '<p class="text-gray-500">No recent orders found.</p>'}
                    </div>
                </div>
            </div>
        `;
}
};
