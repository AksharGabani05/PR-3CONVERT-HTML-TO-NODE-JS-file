describe("API Tests", () => {
  let totalMarks = 0;

  before(() => {
    Cypress.config("baseUrl", "http://localhost:8090"); // Set your API base URL here
    totalMarks = 0; // Reset total marks before running the tests
  });

  beforeEach(() => {
    cy.visit("http://localhost:8090"); // Adjust the URL accordingly
  });

  it("should retrieve a list of recipes - marks 1", () => {
    cy.request("/recipe/all").its("status").should("eq", 200);

    cy.request("/recipe/all").its("body").should("have.length.gte", 1); // Assuming there's at least one initial recipe
  });

  it("Should check if the parent <div> contains at least one child element marks 1", () => {
    // Visit your webpage with the full URL, including the protocol
    cy.visit("/index");

    // Use a Cypress selector to target the parent <div> (replace '.parent-div' with your actual selector)
    cy.get("#parent")
      .children() // Select all child elements
      .should("have.length.gt", 0); // Assert that there is at least one child element
  });


  
// Describe the test scenario
it('should submit the form and add a new recipe to the database - marks 1', () => {
  // Intercept the network request for adding a recipe
  cy.intercept('POST', '/recipe/add', {}).as('addRecipeRequest');

  // Fill out the form fields
  cy.visit('/add'); // Visit the form page
  cy.get('input[name="name"]').type('New Recipe Name'); // Fill in the recipe name
  cy.get('input[name="description"]').type('Description of the new recipe.'); // Add recipe description
  cy.get('input[name="preparationTime"]').type('30'); // Set preparation time
  cy.get('input[name="cookingTime"]').type('45'); // Set cooking time
  cy.get('input[name="imageUrl"]').type('https://example.com/image.jpg'); // Add an image URL
  cy.get('input[name="country"]').type('United States'); // Set the country
  cy.get('input[name="veg"]').type("true"); // Check the vegetarian checkbox

  // Submit the form
  
});









  
  it("should add a new recipe - marks 1", () => {
    cy.request("POST", "/recipe/add", {
      name: "New Recipe",
      description: "Test description",
      preparationTime: "10 minutes",
      cookingTime: 20,
      imageUrl: "https://example.com/image.jpg",
      country: "TestCountry",
      veg: true,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.greaterThan(1); // Assuming it's more than 1 after adding a new recipe
    });
  });

  it("should update an existing recipe - marks 1", () => {
    const recipeId = 1; // Replace with the actual ID
    cy.request("PATCH", `/recipe/update/${recipeId}`, {
      name: "Updated Recipe",
      description: "Updated description",
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(
        response.body.find((recipe) => recipe.id === recipeId).name
      ).to.equal("Updated Recipe");
    });
  });

  it("should delete an existing recipe dynamically - marks 1", () => {
    cy.request("/recipe/all")
      .its("body")
      .then((recipes) => {
        if (recipes.length > 0) {
          const recipeIdToDelete = recipes[0].id; // Assuming you want to delete the first recipe
          cy.request("DELETE", `/recipe/delete/${recipeIdToDelete}`).then(
            (response) => {
              expect(response.status).to.equal(200);
              expect(
                response.body.find((recipe) => recipe.id === recipeIdToDelete)
              ).to.be.undefined;
            }
          );
        } else {
          cy.log("No recipes available to delete.");
        }
      });
  });

  it("should handle missing data and return an error - marks 1", () => {
    cy.request({
      method: "POST",
      url: "/recipe/add",
      failOnStatusCode: false,
      body: {
        // Missing required fields here, adjust as needed
        description: "Test description",
        preparationTime: "10 minutes",
        cookingTime: "20 minutes",
        imageUrl: "https://example.com/image.jpg",
        country: "TestCountry",
        veg: true,
      },
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.equal("All fields are required.");
    });
  });

  it("should filter recipes by vegetarian (veg=true)  - marks 1", () => {
    cy.request("/recipe/filter?veg=true").then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.every((recipe) => recipe.veg)).to.be.true;
    });
  });

  it("should filter recipes by non-vegetarian (veg=false) - marks 0", () => {
    cy.request("/recipe/filter?veg=false").then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.every((recipe) => !recipe.veg)).to.be.true;
    });
  });

  it("should sort recipes by cooking time (sort=lth) - marks 1", () => {
    cy.request("/recipe/filter?sort=lth").then((response) => {
      expect(response.status).to.equal(200);
      const cookingTimes = response.body.map((recipe) =>
        parseInt(recipe.cookingTime)
      );
      expect(cookingTimes).to.eql(cookingTimes.slice().sort((a, b) => a - b));
    });
  });

  it("should sort recipes by cooking time (sort=htl) - marks 0", () => {
    cy.request("/recipe/filter?sort=htl").then((response) => {
      expect(response.status).to.equal(200);
      const cookingTimes = response.body.map((recipe) =>
        parseInt(recipe.cookingTime)
      );
      expect(cookingTimes).to.eql(cookingTimes.slice().sort((a, b) => b - a));
    });
  });

  it("should filter recipes by country - marks 1", () => {
    const countryToFilter = "TestCountry"; // Replace with an actual country
    cy.request(`/recipe/filter?country=${countryToFilter}`).then((response) => {
      expect(response.status).to.equal(200);
      expect(
        response.body.every((recipe) => recipe.country === countryToFilter)
      ).to.be.true;
    });
  });

  Cypress.on("test:after:run", (test, runnable) => {
    if (test.state === "passed") {
      // If the test passed, add its marks
      const marks = parseInt(runnable.title.match(/marks (\d+)/)[1]);
      totalMarks += marks;
    } else if (test.state === "failed") {
      // If the test failed, add 0 marks
      totalMarks += 0;
    }
  });

  it("should be load the page - marks 0", () => {
    cy.request("/").its("status").should("eq", 200);
    cy.contains("welcome to the recipe api");
  });

  after(() => {

    cy.log(`Total Marks: ${totalMarks}`);
  });
});
