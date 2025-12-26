class GenericCrudView {
    constructor(endpoint, columns, formFields) {
        this.endpoint = endpoint;
        this.columns = columns;
        this.formFields = formFields;
        this.state = {
            data: [],
            filteredData: [],
            currentPage: 1,
            itemsPerPage: 5,
            searchTerm: '',
            sortBy: 'id',
            sortOrder: 'asc'
        };
    }

    render() {
        // Set global reference for Router to call init()
        window.CurrentCrudView = this;
        // Set global reference for DOM event handlers
        window.ActiveCrudView = this;

        const title = Utils.capitalize(this.endpoint);

        return `
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h1 class="text-2xl font-bold text-gray-800">${Utils.t(this.endpoint) || title} Management</h1>
                    <div class="flex flex-wrap gap-2">
                        <div class="relative">
                            <input type="text" id="crud-search" placeholder="${Utils.t('search')}" 
                                oninput="ActiveCrudView.handleSearch(this.value)"
                                class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <button onclick="ActiveCrudView.openModal()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            Add ${title.slice(0, -1)}
                        </button>
                        <button onclick="ActiveCrudView.exportCSV()" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                            CSV
                        </button>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                ${this.columns.map(col => `
                                    <th onclick="ActiveCrudView.handleSort('${col.key}')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                        ${col.label} <span class="sort-icon ml-1 inline-block" data-col="${col.key}"></span>
                                    </th>
                                `).join('')}
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ${Utils.t('actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody id="crud-table-body" class="bg-white divide-y divide-gray-200">
                            <!-- Rows rendered via JS -->
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="flex justify-between items-center mt-4">
                    <span class="text-sm text-gray-700">
                        Showing <span id="start-index">0</span> to <span id="end-index">0</span> of <span id="total-items">0</span> results
                    </span>
                    <div class="inline-flex rounded-md shadow-sm -space-x-px">
                        <button id="prev-btn" onclick="ActiveCrudView.prevPage()" class="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-md">Previous</button>
                        <button id="next-btn" onclick="ActiveCrudView.nextPage()" class="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-r-md">Next</button>
                    </div>
                </div>
            </div>
            
            <!-- Generic Modal -->
            <div id="crud-modal" class="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 hidden flex items-center justify-center">
                <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                    <h2 id="modal-title" class="text-xl font-bold mb-4">Add Item</h2>
                    <form id="crud-form" onsubmit="event.preventDefault(); ActiveCrudView.handleSubmit();">
                        <input type="hidden" id="item-id">
                        <div id="form-fields">
                            ${this.renderFormFields()}
                        </div>
                        <div class="flex justify-end space-x-2 mt-4">
                            <button type="button" onclick="ActiveCrudView.closeModal()" class="px-4 py-2 border rounded-md hover:bg-gray-50">${Utils.t('cancel')}</button>
                            <button type="submit" class="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600">${Utils.t('save')}</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    renderFormFields() {
        return this.formFields.map(field => {
            const required = field.required ? 'required' : '';
            if (field.type === 'textarea') {
                return `
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">${field.label}</label>
                        <textarea id="field-${field.key}" ${required} class="w-full border rounded-md px-3 py-2"></textarea>
                    </div>
                `;
            }
            return `
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">${field.label}</label>
                    <input type="${field.type}" id="field-${field.key}" ${required} class="w-full border rounded-md px-3 py-2">
                </div>
            `;
        }).join('');
    }

    async init() {
        const data = await API.get(`/${this.endpoint}`);
        // If data is null/undefined, default to empty array or try fetching from MockData if needed
        // Assuming API works or MockData is populated in API response
        this.state.data = Array.isArray(data) ? data : [];

        // If empty and we have mock data locally (as fallback), strict API might not use it, 
        // but let's trust API or MockData fallback.
        // Actually MockData isn't automatically used by API object unless implemented.
        // But let's assume API works.

        this.filterAndSort();
        this.renderTable();
    }

    renderTable() {
        const tbody = document.getElementById('crud-table-body');
        if (!tbody) return;

        const { filteredData, currentPage, itemsPerPage } = this.state;

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = filteredData.slice(start, end);

        // Update counts
        document.getElementById('start-index').textContent = filteredData.length > 0 ? start + 1 : 0;
        document.getElementById('end-index').textContent = Math.min(end, filteredData.length);
        document.getElementById('total-items').textContent = filteredData.length;

        tbody.innerHTML = pageItems.map(item => `
            <tr>
                ${this.columns.map(col => {
            let val = item[col.key];
            if (col.type === 'currency') val = Utils.formatCurrency(val);
            return `<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${val || '-'}</td>`;
        }).join('')}
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onclick="ActiveCrudView.editItem(${item.id || `'${item.id}'`})" class="text-indigo-600 hover:text-indigo-900 mr-3" title="${Utils.t('edit')}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button onclick="ActiveCrudView.deleteItem(${item.id || `'${item.id}'`})" class="text-red-600 hover:text-red-900" title="${Utils.t('delete')}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </td>
            </tr>
        `).join('');

        // Update Buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const maxPage = Math.ceil(filteredData.length / itemsPerPage);

        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
            prevBtn.classList.toggle('opacity-50', currentPage === 1);
        }
        if (nextBtn) {
            nextBtn.disabled = currentPage === maxPage || maxPage === 0;
            nextBtn.classList.toggle('opacity-50', currentPage === maxPage || maxPage === 0);
        }
    }

    handleSearch(val) {
        this.state.searchTerm = val;
        this.state.currentPage = 1;
        this.filterAndSort();
        this.renderTable();
    }

    handleSort(key) {
        if (this.state.sortBy === key) {
            this.state.sortOrder = this.state.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            this.state.sortBy = key;
            this.state.sortOrder = 'asc';
        }
        this.filterAndSort();
        this.renderTable();
        this.updateSortIcons();
    }

    updateSortIcons() {
        document.querySelectorAll('.sort-icon').forEach(icon => icon.textContent = '');
        const currentHeader = document.querySelector(`.sort-icon[data-col="${this.state.sortBy}"]`);
        if (currentHeader) {
            currentHeader.textContent = this.state.sortOrder === 'asc' ? '↑' : '↓';
        }
    }

    prevPage() {
        if (this.state.currentPage > 1) {
            this.state.currentPage--;
            this.renderTable();
        }
    }

    nextPage() {
        const maxPage = Math.ceil(this.state.filteredData.length / this.state.itemsPerPage);
        if (this.state.currentPage < maxPage) {
            this.state.currentPage++;
            this.renderTable();
        }
    }

    filterAndSort() {
        let result = [...this.state.data];

        // Filter
        if (this.state.searchTerm) {
            const term = this.state.searchTerm.toLowerCase();
            result = result.filter(item => {
                return Object.values(item).some(val =>
                    String(val).toLowerCase().includes(term)
                );
            });
        }

        // Sort
        const { sortBy, sortOrder } = this.state;
        result.sort((a, b) => {
            let valA = a[sortBy];
            let valB = b[sortBy];

            if (valA == null) valA = '';
            if (valB == null) valB = '';

            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();

            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        this.state.filteredData = result;
    }

    // Actions
    async deleteItem(id) {
        if (confirm('Are you sure?')) {
            await API.delete(`/${this.endpoint}/${id}`);
            this.state.data = this.state.data.filter(i => i.id != id);
            this.filterAndSort();
            this.renderTable();
        }
    }

    openModal(isEdit = false) {
        const modal = document.getElementById('crud-modal');
        const title = document.getElementById('modal-title');
        if (modal) {
            modal.classList.remove('hidden');
            title.textContent = isEdit ? 'Edit Item' : 'Add Item';
        }
    }

    closeModal() {
        document.getElementById('crud-modal').classList.add('hidden');
        document.getElementById('crud-form').reset();
        document.getElementById('item-id').value = '';
    }

    editItem(id) {
        const item = this.state.data.find(i => i.id == id);
        if (item) {
            document.getElementById('item-id').value = item.id;
            this.formFields.forEach(f => {
                const el = document.getElementById(`field-${f.key}`);
                if (el) el.value = item[f.key] || '';
            });
            this.openModal(true);
        }
    }

    async handleSubmit() {
        const id = document.getElementById('item-id').value;
        const formData = {};
        this.formFields.forEach(f => {
            formData[f.key] = document.getElementById(`field-${f.key}`).value;
        });

        if (id) {
            // Update
            await API.put(`/${this.endpoint}/${id}`, formData);
            const idx = this.state.data.findIndex(i => i.id == id);
            if (idx !== -1) {
                this.state.data[idx] = { ...this.state.data[idx], ...formData };
            }
        } else {
            // Create
            const newItem = await API.post(`/${this.endpoint}`, formData);
            if (!newItem.id) newItem.id = Math.floor(Math.random() * 10000); // shim
            this.state.data.push(newItem);
        }

        this.closeModal();
        this.filterAndSort();
        this.renderTable();
    }

    exportCSV() {
        const headers = this.columns.map(c => c.label);
        const rows = this.state.filteredData.map(item =>
            this.columns.map(c => item[c.key])
        );

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${this.endpoint}_export.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
