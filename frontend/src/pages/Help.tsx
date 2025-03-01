import { useNavigate } from "react-router-dom";

function Help() {
  const navigate = useNavigate();

  const handlePantry = () => {
    navigate("/pantry"); // Navigate to the pantry page
  };

  const handleRecipes = () => {
    navigate("/recipes"); // Navigate to the recipes page
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-background text-foreground p-6">
      <h1 className="text-5xl font-bold mb-6">Help</h1>
      <main className="flex flex-col justify-center items-center flex-grow space-y-6">
        <section className="text-center max-w-3xl">
          <h2 className="text-3xl font-semibold mb-4">
            Welcome to Your Pantry Assistant
          </h2>
          <p className="text-lg">
            This application helps you manage your pantry efficiently by
            tracking food items, monitoring expiration dates, and generating
            recipes based on what you have. Reduce food waste and plan meals
            effortlessly with our smart features.
          </p>
        </section>

        <section className="text-left max-w-3xl space-y-4">
          <h3 className="text-2xl font-semibold">Getting Started</h3>
          <ul className="list-disc pl-6">
            <li>
              <strong>Track Your Pantry:</strong> Add food items to your pantry,
              set quantities, and we will generate expiration dates.
            </li>
            <li>
              <strong>Generate Recipes:</strong> Use the ingredients in your
              pantry to generate recipes. Let ChatGPT suggest creative meal
              ideas based on what you already have.
            </li>
            <li>
              <strong>Save Recipes:</strong> Save your favorite recipes to
              easily access later. When selecting a recipe, ChatGPT will let you
              know if you have enough ingredients to make the recipe.
            </li>
          </ul>
        </section>

        <section className="text-left max-w-3xl space-y-4">
          <h3 className="text-2xl font-semibold">Features</h3>
          <ul className="list-disc pl-6">
            <li>
              <strong>Pantry Management:</strong> Keep track of all your pantry
              items, including quantities and expiration dates.
            </li>
            <li>
              <strong>Recipe Suggestions:</strong> Generate recipes based on the
              ingredients in your pantry or fridge.
            </li>
            <li>
              <strong>Meal Planning:</strong> Plan meals for the week and create
              organized shopping lists for missing ingredients.
            </li>
          </ul>
        </section>

        <section className="text-left max-w-3xl space-y-4">
          <h3 className="text-2xl font-semibold">Navigation</h3>
          <div className="space-y-2">
            <button
              onClick={handlePantry}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/80"
            >
              Go to Pantry
            </button>
            <button
              onClick={handleRecipes}
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 ml-4"
            >
              Go to Recipes
            </button>
          </div>
        </section>

        <section className="text-left max-w-3xl space-y-4">
          <h3 className="text-2xl font-semibold">
            Tips for Reducing Food Waste
          </h3>
          <ul className="list-disc pl-6">
            <li>
              Organize your pantry by categories (e.g., grains, spices, canned
              goods).
            </li>
            <li>Regularly check expiration dates and use older items first.</li>
            <li>
              Create weekly meal plans to avoid over-purchasing groceries.
            </li>
            <li>Use leftovers creatively in soups, salads, or stir-fries.</li>
          </ul>
        </section>

        <footer className="mt-auto text-sm text-muted">
          Need more help? Contact support at{" "}
          <a
            href="mailto:support@pantryapp.com"
            className="underline text-accent"
          >
            support@pantryapp.com
          </a>
          .
        </footer>
      </main>
    </div>
  );
}

export default Help;
