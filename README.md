# Racines-Windo
Connaître ses racines, unir les générations.
> Retrace tes origines — Application de généalogie familiale

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Vercel** (déploiement)

## Démarrage rapide

```bash
# 1. Cloner le repo
git clone https://github.com/<ton-user>/racines.git
cd racines

# 2. Installer les dépendances
npm install

# 3. Lancer en local
npm run dev
# → http://localhost:3000
```

## Structure

```
src/
├── app/
│   ├── globals.css       # Design tokens + animations globales
│   ├── layout.jsx        # Root layout
│   └── page.jsx          # Entry point → SplashScreen
├── components/
│   ├── SplashScreen.jsx  # ✅ Écran de démarrage
│   ├── BaobabSVG.jsx     # ✅ Baobab SVG réutilisable
│   ├── Dashboard.jsx     # 🔜 À venir
│   ├── FamilyTree.jsx    # 🔜 À venir
│   ├── MemberProfile.jsx # 🔜 À venir
│   ├── Messages.jsx      # 🔜 À venir
│   ├── Events.jsx        # 🔜 À venir
│   └── Gallery.jsx       # 🔜 À venir
```

## Design system

| Token       | Valeur      | Usage                  |
|-------------|-------------|------------------------|
| `gold`      | `#C8A96E`   | Accent principal       |
| `gold-light`| `#E2C99A`   | Titres                 |
| `green-deep`| `#1B3A2F`   | Fonds cards            |
| `green-mid` | `#2D5A45`   | Bordures               |
| `cream`     | `#FAF6EF`   | Texte clair            |
| `earth-dark`| `#0E1A15`   | Background global      |

Fonts : **Cormorant Garamond** (display) + **DM Sans** (body)

## Déploiement Vercel

```bash
# Connecter le repo GitHub dans le dashboard Vercel
# Framework preset : Next.js
# Aucune variable d'environnement requise pour le Splash
```
