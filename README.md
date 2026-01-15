# MyManager - Application Backoffice

MyManager est une application de gestion backoffice moderne (SPA) développée en Vanilla JavaScript, conçue pour être légère, rapide et facile à maintenir.

## Fonctionnalités

- **Tableau de Bord** : Vue d'ensemble avec KPIs et graphiques interactifs (Chart.js).
- **Gestion CRUD** : Création, Lecture, Mise à jour et Suppression pour plusieurs entités (Utilisateurs, Produits, Commandes, etc.).
- **Architecture Générique** : Système de vue CRUD réutilisable pour ajouter rapidement de nouvelles entités.
- **Authentification** : Simulation de connexion sécurisée.
- **Responsive Design** : Interface adaptative utilisant Tailwind CSS.
- **Internationalization** : Prêt pour le multilingue (i18n).
- **Export** : Exportation des données en CSV et rapports PDF.

##  Structure du Code

Le projet suit une architecture modulaire sans framework JS lourd, favorisant la compréhension des concepts fondamentaux.

### Racine
- **`index.html`** : Point d'entrée unique. Contient la structure squelette (Sidebar, Navbar, Zone de contenu) et charge les dépendances.
- **`app.js`** : Script principal qui initialise l'application, configure les écouteurs globaux et lance le routeur.
- **`style.css`** : Surcharges et styles personnalisés spécifiques non couverts par Tailwind.

### Dossier `js/` (Cœur de l'application)

#### Noyau & Utilitaires
- **`router.js`** : Gère la navigation SPA via les ancres URL (Hash). Charge dynamiquement les vues dans le conteneur principal sans rechargement de page.
- **`api.js`** : Abstraction des appels réseaux. Intercepte les requêtes pour servir des données simulées (Mock) ou réelles, et simule la latence réseau.
- **`store.js`** : Gestionnaire d'état simple (State Management) pour partager des données entre les composants (ex: utilisateur connecté, état de chargement).
- **`auth.js`** : Gère la logique de connexion/déconnexion et la protection des routes.
- **`utils.js`** : Fonctions helpers (formatage de dates, devises, capitalisation, etc.).
- **`mock_data.js`** : Jeu de données initial pour peupler l'application au premier lancement.

#### Vues (`js/views/`)
Les "Vues" sont des objets ou classes responsables du rendu HTML et de la gestion des événements pour une page donnée.
- **`dashboard.js`** : Logique d'affichage du tableau de bord et initialisation des graphiques.
- **`crud-view.js`** : **Composant clé**. Une classe générique `GenericCrudView` capable de générer une interface de gestion complète (Tableau + Formulaire Modal) à partir d'une simple configuration de colonnes et de champs.
- **`users.js`** : Vue spécifique pour la gestion des utilisateurs (exemple d'implémentation personnalisée hors du CRUD générique).
- **`user-details.js`** : Vue détaillée d'un utilisateur avec historique des commandes.

#### Services (`js/services/`)
- **`data-service.js`** : Couche de persistance. Gère le stockage des données (actuellement via `localStorage` pour la persistance locale) et fournit des méthodes pour interagir avec les entités.

## Technologies

- **Frontend** : HTML5, CSS3, JavaScript (ES6+).
- **Styling** : Tailwind CSS (via CDN pour le prototypage rapide).
- **Bibliothèques** :
 - `**Chart.js**` : Pour les visualisations de données.
  
