# PokéApp

Aplicación web que consume la PokeAPI y JSONPlaceholder, mostrando información de pokémon de forma dinámica, interactiva y funcional. Desarrollada como prueba técnica para Devdatep.
## Tecnologías usadas
- React + Vite
- React Router
- React Query
- React Hook Form
- Tailwind CSS v3
- Zod

## Funcionalidades - Nivel 2
- Vista de detalle al hacer clic en una tarjeta de pokémon
- Navegación entre páginas con React Router
- Paginación con botones Anterior y Siguiente
- Formulario de creación de posts validado con Zod
- Consumo de JSONPlaceholder con método POST

## Estructura de carpetas
```
src/
├── components/
│   ├── PokemonCard.jsx
│   └── PokemonSkeleton.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── PokemonDetailPage.jsx
│   └── FormularioPokemon.jsx
├── hooks/
│   └── usePokemons.js
└── services/
    └── pokemonService.js
```

## Cómo correr el proyecto
1. Clonar el repositorio
git clone https://github.com/Mrxz2203/devdatep-prueba-tecnica
2. Instalar dependencias
npm install
3. Correr en local
npm run dev
##  APIs usadas
- [PokeAPI](https://pokeapi.co/) → Lista, búsqueda y detalle de pokémon
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) → Formulario de creación de posts
