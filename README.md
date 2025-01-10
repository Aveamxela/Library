# Library

Library est une application de gestion de bibliothèque. Elle permet aux utilisateurs d'emprunter et de retourner des livres.

## Fonctionnalités

- **Gestion des livres :** Ajouter, modifier, supprimer et rechercher des livres.
- **Emprunt de livres :** Vérification de la disponibilité des livres avant l'emprunt.
- **Authentification :** Système d'inscription, de connexion et de déconnexion sécurisé avec des jetons JWT.
- **API REST :** Développement backend avec Express.js et PostgreSQL.
- **Gestion front et back en mono-repo :** Architecture simplifiée pour faciliter la gestion des dépendances.

## Technologies utilisées

- **Backend :** Node.js, Express, Drizzle ORM, PostgreSQL.
- **Sécurité :** Argon2 pour le hashage des mots de passe, JWT pour l'authentification.
- **Gestion des dépendances :** PNPM.
- **Outils :** Drizzle Kit pour les migrations, Winston pour les logs.

---

## Installation et configuration

### Prérequis

- **Node.js**
- **PNPM**
- **PostgreSQL**

### Étapes d'installation
Cloner le projet
cd library
pnpm install
Créer un fichier .env dans packages/server
PORT=your_port
NODE_ENV=development
JWT_SECRET=your_secre_key
FRONTEND_URL=url_frontend
DATABASE_URL=postgresql://username:password@localhost:5432/library
dans packages/server
pnpm run generate
pnpm run migrate
Lancer le projet, sur Library
pnpm dev
