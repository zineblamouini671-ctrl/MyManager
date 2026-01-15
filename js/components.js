const Components = {
    Navbar: () => {
        const user = Store.state.currentUser;
        const currentLang = localStorage.getItem('lang') || 'fr';

        return `
            <div class="flex items-center">
                <button id="sidebar-toggle" class="md:hidden mr-4 text-gray-500 hover:text-gray-700">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div class="text-xl font-bold text-primary flex items-center">
                    <span class="mr-2">🚀</span> MyManager
                </div>
            </div>

            <div class="flex items-center space-x-4">
                <!-- Menu déroulant de langue -->
                <div class="relative group">
                    <button class="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-primary transition">
                        <span>${currentLang.toUpperCase()}</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <a href="#" onclick="Utils.setLang('fr')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Français</a>
                        <a href="#" onclick="Utils.setLang('en')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">English</a>
                        <a href="#" onclick="Utils.setLang('ar')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right">العربية</a>
                    </div>
                </div>

                <div class="h-6 w-px bg-gray-300 mx-2"></div>

                <!-- Profil utilisateur -->
                <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                        ${user ? user.username.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span class="text-sm font-medium text-gray-700 hidden sm:block">${user ? user.name : 'Guest'}</span>
                    <button onclick="Auth.logout()" class="text-sm text-red-500 hover:text-red-700 ml-2" title="${Utils.t('logout')}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    </button>
                    <button onclick="Utils.resetData()" class="text-sm text-yellow-500 hover:text-yellow-700 ml-2" title="Réinitialiser les données">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    </button>
                </div>
            </div>
        `;
    },

    Sidebar: () => {
        const hash = window.location.hash || '#dashboard';
        const isActive = (path) => hash === path ? 'bg-gray-800 text-white border-l-4 border-secondary' : 'text-gray-400 hover:bg-gray-800 hover:text-white';

        return `
            <div class="flex items-center justify-center h-16 border-b border-gray-800">
                <span class="text-white text-lg font-bold">Admin Panel</span>
            </div>
            <nav class="flex-1 px-2 py-4 space-y-2">
                <a href="#dashboard" class="${isActive('#dashboard')} group flex items-center px-3 py-3 text-sm font-medium rounded-r-md transition-colors">
                    <svg class="mr-3 h-6 w-6 text-gray-500 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                    ${Utils.t('dashboard')}
                </a>
                <a href="#users" class="${isActive('#users')} group flex items-center px-3 py-3 text-sm font-medium rounded-r-md transition-colors">
                    <svg class="mr-3 h-6 w-6 text-gray-500 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    ${Utils.t('users')}
                </a>
               <a href="#products" class="${isActive('#products')} group flex items-center px-3 py-3 text-sm font-medium rounded-r-md transition-colors">
                    <svg class="mr-3 h-6 w-6 text-gray-500 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                    ${Utils.t('products')}
                </a>
                <a href="#orders" class="${isActive('#orders')} group flex items-center px-3 py-3 text-sm font-medium rounded-r-md transition-colors">
                    <svg class="mr-3 h-6 w-6 text-gray-500 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    ${Utils.t('orders')}
                </a>
                 <a href="#clients" class="${isActive('#clients')} group flex items-center px-3 py-3 text-sm font-medium rounded-r-md transition-colors">
                    <svg class="mr-3 h-6 w-6 text-gray-500 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Clients
                </a>
                 <a href="#invoices" class="${isActive('#invoices')} group flex items-center px-3 py-3 text-sm font-medium rounded-r-md transition-colors">
                    <svg class="mr-3 h-6 w-6 text-gray-500 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Invoices
                </a>
            </nav>
        `;
    }
};
