# PokéApp -

Aplicación web SPA desarrollada como prueba técnica para Devdatep. Consume la PokeAPI y JSONPlaceholder con una arquitectura modular avanzada.

##  Programa Desplegado en Vercel
[Ver aplicación desplegada](https://devdatep-prueba-tecnica.vercel.app)

## Tecnologías usadas
- React + Vite
- React Router
- React Query
- React Hook Form
- Tailwind CSS v3
- Zod
- Axios
- Lucide React
- React Hot Toast
- React Router Hash Link

##  Funcionalidades por nivel

### Nivel 1
- Lista de 20 pokémon desde la PokeAPI
- Búsqueda fonética
- Skeletons de carga animados
- Diseño responsivo

### Nivel 2
- Vista de detalle de cada pokémon
- Navegación con React Router
- Paginación
- Formulario validado con Zod

### Nivel 3
- CRUD completo de posts con Axios
- Manejo de errores con React Hot Toast
- Modularización avanzada por features
- Componentes reutilizables
- Deploy en Vercel
- WelcomePage con navbar, hero, características y footer

##  Estructura de carpetas
```
src/
├── components/
│   ├── Button.jsx
│   ├── Input.jsx
│   └── PageLoader.jsx
├── features/
│   ├── pokemon/
│   │   ├── components/
│   │   │   ├── PokemonCard.jsx
│   │   │   └── PokemonSkeleton.jsx
│   │   ├── hooks/
│   │   │   └── usePokemons.js
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── PokemonDetailPage.jsx
│   │   └── services/
│   │       └── pokemonService.js
│   └── posts/
│       ├── hooks/
│       │   └── usePosts.js
│       ├── pages/
│       │   ├── FormularioPokemon.jsx
│       │   ├── PostsPage.jsx
│       │   └── PostDetailPage.jsx
│       ├── schemas/
│       │   └── postSchema.js
│       └── services/
│           └── postsService.js
├── pages/
│   └── WelcomePage.jsx
├── App.jsx
└── main.jsx
```

##  Cómo correr el proyecto
1. Clonar el repositorio
```
git clone https://github.com/Mrxz2203/devdatep-prueba-tecnica
```
2. Instalar dependencias
```
npm install
```
3. Correr en local
```
npm run dev
```

##  Rutas de la aplicación
- `/` → WelcomePage
- `/home` → Lista de pokémon
- `/pokemon/:name` → Detalle de pokémon
- `/formulario` → Formulario de posts
- `/posts` → Lista de posts CRUD
- `/posts/:id` → Detalle y edición de post

##  Ramas
- `main` → código final
- `level-1` → Nivel 1 completo
- `level-2` → Nivel 2 completo
- `level-3` → Nivel 3 completo

## APIs usadas
- [PokeAPI](https://pokeapi.co/) → Lista, búsqueda y detalle de pokémon
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) → CRUD completo de posts