const UsersView = {
    // État pour cette vue
    state: {
        users: [],
        filteredUsers: [],
        currentPage: 1,
        itemsPerPage: 5,
        searchTerm: '',
        sortBy: 'id',
        sortOrder: 'asc' // asc or desc
    },

    init: async () => {
        // Récupérer les utilisateurs s'ils ne sont pas déjà dans le store (ou en récupérer de nouveaux)
        // Pour cette démo, récupérons-en de nouveaux ou utilisons le Store s'il est entièrement implémenté
        const users = await API.get('/users');
        if (users) {
            UsersView.state.users = users;
            UsersView.filterAndSort();
            UsersView.renderTable();
        }

        // Attacher les écouteurs d'événements (Puisque render() écrase le DOM, nous devrons peut-être les réattacher ou déléguer)
        // Meilleure approche : Attacher au conteneur statique ou réattacher après le rendu.
        // Ici, nous attacherons au conteneur dans renderTable ou une configuration séparée.
        UsersView.setupEventListeners();
    },

    setupEventListeners: () => {
        // Champ de recherche
        const searchInput = document.getElementById('user-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                UsersView.state.searchTerm = e.target.value;
                UsersView.state.currentPage = 1; // Réinitialiser à la première page
                UsersView.filterAndSort();
                UsersView.renderTable();
            });
        }

        // En-têtes de tri
        const headers = document.querySelectorAll('th[data-sort]');
        headers.forEach(th => {
            th.addEventListener('click', () => {
                const column = th.dataset.sort;
                if (UsersView.state.sortBy === column) {
                    UsersView.state.sortOrder = UsersView.state.sortOrder === 'asc' ? 'desc' : 'asc';
                } else {
                    UsersView.state.sortBy = column;
                    UsersView.state.sortOrder = 'asc';
                }
                UsersView.filterAndSort();
                UsersView.renderTable();
                UsersView.updateSortIcons();
            });
        });

        // Boutons de pagination
        document.getElementById('prev-btn')?.addEventListener('click', () => {
            if (UsersView.state.currentPage > 1) {
                UsersView.state.currentPage--;
                UsersView.renderTable();
            }
        });

        document.getElementById('next-btn')?.addEventListener('click', () => {
            const maxPage = Math.ceil(UsersView.state.filteredUsers.length / UsersView.state.itemsPerPage);
            if (UsersView.state.currentPage < maxPage) {
                UsersView.state.currentPage++;
                UsersView.renderTable();
            }
        });

        // Boutons d'exportation
        document.getElementById('export-csv')?.addEventListener('click', UsersView.exportCSV);
        document.getElementById('add-user-btn')?.addEventListener('click', () => UsersView.openModal());
    },

    filterAndSort: () => {
        let result = [...UsersView.state.users];

        // Recherche
        if (UsersView.state.searchTerm) {
            const term = UsersView.state.searchTerm.toLowerCase();
            result = result.filter(user =>
                user.name.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term)
            );
        }

        // Tri
        const { sortBy, sortOrder } = UsersView.state;
        result.sort((a, b) => {
            let valA = a[sortBy];
            let valB = b[sortBy];

            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();

            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        UsersView.state.filteredUsers = result;
    },

    render: () => {
        return `
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h1 class="text-2xl font-bold text-gray-800">${Utils.t('users')} Management</h1>
                    <div class="flex flex-wrap gap-2">
                        <div class="relative">
                            <input type="text" id="user-search" placeholder="${Utils.t('search')}" 
                                class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <button id="add-user-btn" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            Add User
                        </button>
                        <button id="export-csv" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                            CSV
                        </button>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th data-sort="id" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                    ${Utils.t('id')} <span class="sort-icon ml-1 inline-block"></span>
                                </th>
                                <th data-sort="name" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                    ${Utils.t('name')} <span class="sort-icon ml-1 inline-block"></span>
                                </th>
                                <th data-sort="email" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                    ${Utils.t('email')} <span class="sort-icon ml-1 inline-block"></span>
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Website
                                </th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ${Utils.t('actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody id="users-table-body" class="bg-white divide-y divide-gray-200">
                            <!-- Lignes rendues via JS -->
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="flex justify-between items-center mt-4">
                    <span class="text-sm text-gray-700">
                        Showing <span id="start-index">0</span> to <span id="end-index">0</span> of <span id="total-items">0</span> results
                    </span>
                    <div class="inline-flex rounded-md shadow-sm -space-x-px">
                        <button id="prev-btn" class="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-md">Previous</button>
                        <button id="next-btn" class="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-r-md">Next</button>
                    </div>
                </div>
            </div>
            
            <!-- Modal Utilisateur (Créer/Modifier) -->
            <div id="user-modal" class="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 hidden flex items-center justify-center">
                <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                    <h2 id="modal-title" class="text-xl font-bold mb-4">Add User</h2>
                    <form id="user-form">
                        <input type="hidden" id="user-id">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input type="text" id="user-name" required class="w-full border rounded-md px-3 py-2">
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" id="user-email" required class="w-full border rounded-md px-3 py-2">
                        </div>
                         <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Website</label>
                            <input type="text" id="user-website" class="w-full border rounded-md px-3 py-2">
                        </div>
                        <div class="flex justify-end space-x-2">
                            <button type="button" onclick="UsersView.closeModal()" class="px-4 py-2 border rounded-md hover:bg-gray-50">${Utils.t('cancel')}</button>
                            <button type="submit" class="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600">${Utils.t('save')}</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    },

    renderTable: () => {
        const tbody = document.getElementById('users-table-body');
        if (!tbody) return;

        const { filteredUsers, currentPage, itemsPerPage } = UsersView.state;

        // Logique de pagination
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = filteredUsers.slice(start, end);

        // Mettre à jour les comptes
        document.getElementById('start-index').textContent = filteredUsers.length > 0 ? start + 1 : 0;
        document.getElementById('end-index').textContent = Math.min(end, filteredUsers.length);
        document.getElementById('total-items').textContent = filteredUsers.length;

        tbody.innerHTML = pageItems.map(user => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#${user.id}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="h-8 w-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center font-bold mr-3">
                            ${user.name.charAt(0)}
                        </div>
                        <div class="text-sm font-medium text-gray-900">${user.name}</div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.email}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.website || '-'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <button onclick="UsersView.viewDetails(${user.id})" class="text-blue-600 hover:text-blue-900 mr-3" title="Details">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    </button>
                    <button onclick="UsersView.editUser(${user.id})" class="text-indigo-600 hover:text-indigo-900 mr-3" title="${Utils.t('edit')}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button onclick="UsersView.deleteUser(${user.id})" class="text-red-600 hover:text-red-900" title="${Utils.t('delete')}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </td>
            </tr>
        `).join('');

        // Désactiver les boutons si nécessaire
        document.getElementById('prev-btn').disabled = currentPage === 1;
        document.getElementById('prev-btn').classList.toggle('opacity-50', currentPage === 1);
        const maxPage = Math.ceil(filteredUsers.length / itemsPerPage);
        document.getElementById('next-btn').disabled = currentPage === maxPage || maxPage === 0;
        document.getElementById('next-btn').classList.toggle('opacity-50', currentPage === maxPage || maxPage === 0);
    },

    updateSortIcons: () => {
        document.querySelectorAll('.sort-icon').forEach(icon => icon.textContent = '');
        const currentHeader = document.querySelector(`th[data-sort="${UsersView.state.sortBy}"]`);
        if (currentHeader) {
            const icon = currentHeader.querySelector('.sort-icon');
            icon.textContent = UsersView.state.sortOrder === 'asc' ? '↑' : '↓';
        }
    },

    // Actions
    deleteUser: async (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            await API.delete(`/users/${id}`);
            // Mise à jour optimiste
            UsersView.state.users = UsersView.state.users.filter(u => u.id !== id);
            UsersView.filterAndSort();
            UsersView.renderTable();
            alert('User deleted successfully');
        }
    },

    openModal: (isEdit = false) => {
        document.getElementById('user-modal').classList.remove('hidden');
        document.getElementById('modal-title').textContent = isEdit ? 'Edit User' : 'Add User';

        // Gestionnaire de soumission de formulaire
        const form = document.getElementById('user-form');
        form.onsubmit = async (e) => {
            e.preventDefault();
            const id = document.getElementById('user-id').value;
            const name = document.getElementById('user-name').value;
            const email = document.getElementById('user-email').value;
            const website = document.getElementById('user-website').value;

            const userData = { name, email, website };

            if (isEdit && id) {
                // Mettre à jour
                await API.put(`/users/${id}`, userData);
                // Mettre à jour l'état local
                const idx = UsersView.state.users.findIndex(u => u.id == id);
                if (idx !== -1) {
                    UsersView.state.users[idx] = { ...UsersView.state.users[idx], ...userData };
                }
            } else {
                // Créer
                const newUser = await API.post('/users', userData);
                UsersView.state.users.push(newUser);
            }

            UsersView.closeModal();
            UsersView.filterAndSort();
            UsersView.renderTable();
        };
    },

    closeModal: () => {
        document.getElementById('user-modal').classList.add('hidden');
        document.getElementById('user-form').reset();
        document.getElementById('user-id').value = '';
    },

    editUser: (id) => {
        const user = UsersView.state.users.find(u => u.id === id);
        if (user) {
            document.getElementById('user-id').value = user.id;
            document.getElementById('user-name').value = user.name;
            document.getElementById('user-email').value = user.email;
            document.getElementById('user-website').value = user.website;
            UsersView.openModal(true);
        }
    },

    viewDetails: (id) => {
        // Naviguer vers les détails (en utilisant un paramètre de hachage ou une session)
        window.location.hash = `#user-details?id=${id}`;
    },

    exportCSV: () => {
        const headers = ['ID', 'Name', 'Email', 'Website'];
        const rows = UsersView.state.filteredUsers.map(u => [u.id, u.name, u.email, u.website]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "users_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
