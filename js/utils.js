const Utils = {
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    },

    capitalize: (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    // Pub/Sub simple pour les événements
    events: {},
    on: (event, callback) => {
        if (!Utils.events[event]) Utils.events[event] = [];
        Utils.events[event].push(callback);
    },
    emit: (event, data) => {
        if (Utils.events[event]) Utils.events[event].forEach(cb => cb(data));
    },

    // Dictionnaire i18n
    translations: {
        en: {
            dashboard: 'Dashboard',
            users: 'Users',
            products: 'Products',
            orders: 'Orders',
            logout: 'Logout',
            welcome: 'Welcome',
            totalUsers: 'Total Users',
            revenue: 'Revenue',
            search: 'Search...',
            actions: 'Actions',
            edit: 'Edit',
            delete: 'Delete',
            save: 'Save',
            cancel: 'Cancel',
            id: 'ID',
            name: 'Name',
            email: 'Email',
            role: 'Role',
        },
        fr: {
            dashboard: 'Tableau de bord',
            users: 'Utilisateurs',
            products: 'Produits',
            orders: 'Commandes',
            logout: 'Déconnexion',
            welcome: 'Bienvenue',
            totalUsers: 'Utilisateurs Total',
            revenue: 'Revenus',
            search: 'Rechercher...',
            actions: 'Actions',
            edit: 'Modifier',
            delete: 'Supprimer',
            save: 'Enregistrer',
            cancel: 'Annuler',
            id: 'ID',
            name: 'Nom',
            email: 'Email',
            role: 'Rôle',
        },
        ar: {
            dashboard: 'لوحة القيادة',
            users: 'المستخدمين',
            products: 'المنتجات',
            orders: 'الطلبات',
            logout: 'تسجيل خروج',
            welcome: 'أهلا بك',
            totalUsers: 'إجمالي المستخدمين',
            revenue: 'الإيرادات',
            search: 'يبحث...',
            actions: 'إجراءات',
            edit: 'تعديل',
            delete: 'حذف',
            save: 'حفظ',
            cancel: 'إلغاء',
            id: 'هوية شخصية',
            name: 'اسم',
            email: 'بريد إلكتروني',
            role: 'دور',
        }
    },

    t: (key) => {
        const lang = localStorage.getItem('lang') || 'fr';
        return Utils.translations[lang][key] || key;
    },

    setLang: (lang) => {
        localStorage.setItem('lang', lang);
        location.reload(); // Rechargement simple pour appliquer les changements
    },

    resetData: () => {
        if (confirm('Voulez-vous vraiment réinitialiser toutes les données ? Cela effacera vos modifications et rechargera les données fictives.')) {
            localStorage.clear();
            location.reload();
        }
    }
};
