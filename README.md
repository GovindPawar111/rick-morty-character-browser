# Rick & Morty Character Browser

A React-based single-page application to browse Rick & Morty characters using the official API.

---

## Installation & Setup

1. **Clone the repository**
    
    ```bash
    git clone https://github.com/GovindPawar111/rick-morty-character-browser.git
    
    ```
    
2. **Navigate to the project directory**
    
    ```bash
    cd rick-morty-character-browser
    
    ```
    
3. **Install dependencies**
    
    ```bash
    npm install
    
    ```
    
4. **Start the development server**
    
    ```bash
    npm run dev
    
    ```
    
5. **Open your browser and visit**
    
    ```
    http://localhost:5173
    
    ```
    

---

## Available Scripts

- `npm run dev` - Starts the development server with hot reload
- `npm run build` - Builds the production-ready app
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint to analyze code quality

---

## Project Structure & Routes

| Route | Description | Component |
| --- | --- | --- |
| `/` | Home page | `HomePage` |
| `/characters` | Paginated list of characters | `CharacterList` |
| `/character/:id` | Character detail page | `CharacterDetail` |

---

## Main Libraries Used

| Library | Purpose |
| --- | --- |
| React (v19) | UI framework |
| Vite | Build tool & dev server |
| TypeScript | Static typing |
| @tanstack/react-router | Client-side routing |
| @tanstack/react-query | Data fetching & caching |
| @tanstack/react-table | Table rendering (character list) |

---

## API Endpoints Used

- Base URL: `https://rickandmortyapi.com/api`

| Endpoint | Description |
| --- | --- |
| `/character?page={page}` | Fetch paginated characters |
| `/character/{id}` | Fetch character details by ID |

---

## License

This project is licensed under the MIT License.