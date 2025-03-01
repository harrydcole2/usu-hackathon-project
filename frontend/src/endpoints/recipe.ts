import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

// Define the Recipe type
export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  preparationTime: number; // in minutes
  cookingTime: number; // in minutes
  servings: number;
  imageUrl?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// Define the input for creating/updating a recipe
export type RecipeInput = Omit<Recipe, "id" | "createdAt" | "updatedAt">;

// API paths
const RECIPES_PATH = "/recipes";

// API functions
async function fetchRecipes(): Promise<Recipe[]> {
  const response = await api.get(RECIPES_PATH);
  return response.data;
}

async function fetchRecipeById(id: string): Promise<Recipe> {
  const response = await api.get(`${RECIPES_PATH}/${id}`);
  return response.data;
}

async function createRecipe(recipe: RecipeInput): Promise<Recipe> {
  const response = await api.post(RECIPES_PATH, recipe);
  return response.data;
}

async function updateRecipe({
  id,
  recipe,
}: {
  id: string;
  recipe: Partial<RecipeInput>;
}): Promise<Recipe> {
  const response = await api.put(`${RECIPES_PATH}/${id}`, recipe);
  return response.data;
}

async function deleteRecipe(id: string): Promise<void> {
  await api.delete(`${RECIPES_PATH}/${id}`);
}

// React Query hooks
export function useRecipes() {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
  });
}

export function useRecipe(id: string) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipeById(id),
    enabled: !!id, // Only fetch when id is truthy
  });
}

export function useCreateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRecipe,
    onSuccess: (newRecipe) => {
      // Invalidate the recipes list query to refetch
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      // Optionally update the cache directly
      queryClient.setQueryData(["recipe", newRecipe.id], newRecipe);
    },
  });
}

export function useUpdateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRecipe,
    onSuccess: (updatedRecipe) => {
      // Invalidate the recipes list and the specific recipe
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      queryClient.invalidateQueries({ queryKey: ["recipe", updatedRecipe.id] });
    },
  });
}

export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecipe,
    onSuccess: (_, variables) => {
      // Invalidate the recipes list and remove the specific recipe from cache
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      queryClient.removeQueries({ queryKey: ["recipe", variables] });
    },
  });
}
