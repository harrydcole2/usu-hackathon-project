import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

const RECIPE_PATH = "/recipe";

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  // Add other recipe properties as needed
}

interface RecipeModificationRequest {
  recipe_id: string;
}

// Get recipe recommendations based on user's fridge
async function getRecipes(): Promise<Recipe[]> {
  const response = await api.get(RECIPE_PATH);
  return response.data;
}

export function useGetRecipes() {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });
}

// Check and modify a recipe based on available ingredients
async function checkAndModifyRecipe(
  data: RecipeModificationRequest
): Promise<Recipe> {
  const response = await api.put(RECIPE_PATH, data);
  return response.data;
}

export function useCheckAndModifyRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkAndModifyRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
}
