import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChefHat, Plus } from "lucide-react";

interface Recipe {
  id: string;
  content: string;
}

interface RecipeOption {
  id: string;
  title: string;
  description: string;
}

const sampleRecipes: Recipe[] = [
  {
    id: "1",
    content:
      "Mediterranean Pasta Salad\n\nIngredients:\n- 2 cups rotini pasta\n- 1 cup cherry tomatoes\n- 1/2 cup feta cheese\n- 1/4 cup olives\n- 1/4 cup red onion\n- 2 tbsp olive oil\n- 1 tbsp lemon juice\n\nInstructions:\n1. Cook pasta according to package instructions.\n2. Slice tomatoes in half and dice red onion.\n3. Mix all ingredients together in a large bowl.\n4. Drizzle with olive oil and lemon juice.\n5. Season with salt and pepper to taste.",
  },
  {
    id: "2",
    content:
      "Vegetable Stir Fry\n\nIngredients:\n- 1 block firm tofu\n- 2 bell peppers\n- 1 cup broccoli florets\n- 1 cup snap peas\n- 2 carrots\n- 3 tbsp soy sauce\n- 1 tbsp sesame oil\n\nInstructions:\n1. Press and cube tofu, then pan fry until golden.\n2. Slice peppers and carrots thinly.\n3. Heat oil in a wok or large pan.\n4. Add vegetables and stir fry for 5-7 minutes.\n5. Add tofu and sauce, cooking for another 2 minutes.",
  },
];

const recipeOptions: RecipeOption[] = [
  {
    id: "opt1",
    title: "Chickpea Curry",
    description: "A hearty vegetarian curry that's simple to make.",
  },
  {
    id: "opt2",
    title: "Quinoa Stuffed Peppers",
    description: "Colorful bell peppers stuffed with quinoa and vegetables.",
  },
  {
    id: "opt3",
    title: "Lemon Garlic Roasted Chicken",
    description: "A simple and flavorful roasted chicken dish.",
  },
  {
    id: "opt4",
    title: "Berry Smoothie Bowl",
    description: "A nutritious and colorful breakfast bowl.",
  },
  {
    id: "opt5",
    title: "Mushroom Risotto",
    description: "A creamy and rich Italian rice dish.",
  },
];

const generateRecipeFromOption = (option: RecipeOption): Recipe => {
  return {
    id: `${Date.now()}`,
    content: `${option.title}\n\n${option.description}\n\nIngredients:\n- Ingredient 1\n- Ingredient 2\n- Ingredient 3\n- Ingredient 4\n- Ingredient 5\n\nInstructions:\n1. Step one of the recipe instructions.\n2. Step two with more details about cooking.\n3. Step three with additional information.\n4. Final step with serving suggestions.`,
  };
};

function AddRecipeDialog({
  isOpen,
  onClose,
  onAddRecipe,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddRecipe: (recipe: Recipe) => void;
}) {
  const handleSelectOption = (option: RecipeOption) => {
    const newRecipe = generateRecipeFromOption(option);
    onAddRecipe(newRecipe);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add a Recipe</DialogTitle>
          <DialogDescription>
            Choose from one of these recipe ideas to generate a full recipe.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4 pt-2">
            {recipeOptions.map((option) => (
              <Card
                key={option.id}
                className="cursor-pointer hover:border-primary transition-colors duration-200"
                onClick={() => handleSelectOption(option)}
              >
                <CardHeader className="pb-2">
                  <CardTitle>{option.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ViewRecipeDialog({
  recipe,
  isOpen,
  onClose,
}: {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!recipe) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{recipe.content.split("\n")[0]}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          <div className="whitespace-pre-line">
            {recipe.content.split("\n").slice(1).join("\n")}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function RecipeCard({
  recipe,
  index,
  onViewRecipe,
}: {
  recipe: Recipe;
  index: number;
  onViewRecipe: (recipe: Recipe) => void;
}) {
  const title = recipe.content.split("\n")[0] || `Recipe #${index + 1}`;

  return (
    <Card className="overflow-hidden flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>

      <CardContent className="pb-2 flex-grow">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {recipe.content.split("\n").slice(1).join(" ")}
        </p>
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onViewRecipe(recipe)}
        >
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // This is where we would use the useRecipeList hook in the future
  // Uncomment this when the hook is ready and remove the useState above
  /*
  const { 
    recipes, 
    isLoading, 
    isError, 
    addRecipe: addRecipeToList 
  } = useRecipeList();
  */

  const handleAddRecipe = (recipe: Recipe) => {
    setRecipes([...recipes, recipe]);
    // When using the hook, we would call this instead:
    // addRecipeToList(recipe);
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Recipes
          </h1>
          <p className="text-muted-foreground">
            Discover and save your favorite recipes
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus size={18} />
          Add Recipe
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            index={index}
            onViewRecipe={handleViewRecipe}
          />
        ))}
      </div>

      {recipes.length === 0 && (
        <div className="text-center py-16 bg-muted/30 rounded-md">
          <ChefHat className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No recipes yet</h3>
          <p className="mt-2 text-muted-foreground">
            Add a recipe to get started with your collection.
          </p>
        </div>
      )}

      <AddRecipeDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddRecipe={handleAddRecipe}
      />

      <ViewRecipeDialog
        recipe={selectedRecipe}
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
      />
    </div>
  );
}
