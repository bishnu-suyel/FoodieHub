# FoodieHub App

A simple recipe application that fetches recipes from a Strapi backend and displays them in a user-friendly interface using React. The app provides details such as ingredients, instructions, and cooking time for each recipe.

## Features:
- Fetch recipes from Strapi API.
- Display recipe details, including ingredients and instructions.
- Easy to expand with additional features like recipe search or filtering.

## Tech Stack:
- **Frontend:** React.js
- **Backend:** Strapi (Headless CMS)
- **Styling:** CSS

## Installation:
1. Clone the repository
    ```bash
    git clone https://github.com/bishnu-suyel/FoodieHub.git
    ```
2. Install dependencies

    a. Install backend (Strapi):
    ```bash
    cd FoodieHub
    npm install
    ```
    - Start the Strapi development server:
    ```bash
    npm run develop
    ```
    - Visit [http://localhost:1337/admin](http://localhost:1337/admin) to access the Strapi admin panel and manage content.

    b. Install frontend (React):
    ```bash
    cd frontend
    npm install
    ```

    - Run the React app
    ```bash
    npm start
    ```
    - The app will be available at [http://localhost:3000](http://localhost:3000).

3. Make sure both servers are running:

- Strapi should be running on [http://localhost:1337](http://localhost:1337) (backend).
- React should be running on [http://localhost:3000](http://localhost:3000) (frontend).

## License:
MIT License