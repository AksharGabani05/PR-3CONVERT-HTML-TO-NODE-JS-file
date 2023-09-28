
# Convert HTML to Node.js
## Recipe API and UI Implementation
<!-- Problem Statement -->
## Overview
In this project, you will create a Recipe API using Node.js and an accompanying user interface (UI) using HTML or EJS. The goal is to handle all cases and errors effectively.

### Total Marks: 10
### Ensure strict adherence to instructions.

## Setup
- Run your server on Port 8090.

## Initial Setup
1. Create a folder named "recipe" and place all your code within this folder.
2. Initialize an array with some initial recipes as follows:
```javascript

let initialRecipe = [
  {
    name: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish.',
    preparationTime: '15 minutes',
    cookingTime: '15',
    imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
    country: "India",
    veg: true,
    id: 1
  }
]

```


## Endpoints

### GET Route
- Create a GET route at the base URL ("/") that sends the response "Welcome to the Recipe API."

### Recipe Listing
- Create a GET route named "/recipe/all" to send all recipes.
- Develop an "index.html" file in the same folder and use it to fetch and display the data.
- Implement another GET route named "/index" to serve your "index.html" using Node.js.
- Create a div with an id="parent" to display all data within it.

### Recipe Form
- Design an HTML form in a file named "recipe.html."
- Establish a GET route named "/add" to serve your "recipe.html" code using Node.js.
- After clicking the "Add recipe" button on the UI, it should add the recipe to the database.

### POST Route
- Develop a POST route named "/recipe/add" to receive data from the UI using the   form and push it into "initialRecipe." Then, send all recipes as a response.

### Middleware
- Implement middleware to check for missing data while posting. If any fields are missing, return a "All fields are required" message with a status code of 400, referencing "initialRecipe."

### PATCH Route 
- Create a PATCH route named "/recipe/update/:id" to update recipes. Send all recipes as a response after updating.

### DELETE Route 
- Establish a DELETE route named "/recipe/delete/:id" to remove recipes from the database. Send all recipes as a response after deletion.

### Query Params Filter
- Implement a GET route named "/recipe/filter."
- Receive queries like "veg=true/false," "sort=lth/htl," or "country=India."
- Filter and sort recipes according to the received queries, which may include one or two of the mentioned options.

## Testing
1. Navigate to the 'test' directory using `cd test`.
2. Run 'npm i' to install dependencies. If you encounter any errors during installation, you can use the following command: `./node_modules/.bin/cypress install`.
3. Run tests using either `npx cypress open` or `npx cypress run`.

# Best of Luck!
```