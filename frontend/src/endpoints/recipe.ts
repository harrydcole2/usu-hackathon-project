import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

const RECIPE_PATH = "/recipe";
const RECIPE_DETAIL_PATH = "/recipe/detail";
const RECIPE_ALL_PATH = "/recipe/all";
const RECIPE_SAVE_PATH = "/recipe/save";

export interface Recipe {
  recipe_string: string;
  id?: number;
}

interface RecipeModificationRequest {
  recipe_id: string;
}

interface DetailedRecipeRequest {
  recipe: string;
}

interface SaveRecipeRequest {
  recipe: string;
}

// Get recipe recommendations based on user's fridge
async function getRecipes(): Promise<string[]> {
  const response = await api.get(RECIPE_PATH);
  return response.data;
}

export function useGetRecipes() {
  return useQuery({
    queryKey: ["recommendedRecipes"],
    queryFn: getRecipes,
  });
}

// Get all saved recipes belonging to a user
async function getUserRecipes(): Promise<Recipe[]> {
  const response = await api.get(RECIPE_ALL_PATH);
  return response.data;
}

export function useGetUserRecipes() {
  return useQuery({
    queryKey: ["userRecipes"],
    queryFn: getUserRecipes,
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
      queryClient.invalidateQueries({ queryKey: ["recommendedRecipes"] });
      queryClient.invalidateQueries({ queryKey: ["userRecipes"] });
    },
  });
}

// Get detailed recipe information
async function getDetailedRecipe(data: DetailedRecipeRequest): Promise<string> {
  const response = await api.post(RECIPE_DETAIL_PATH, { recipe: data.recipe });
  return response.data;
}

export function useGetDetailedRecipe() {
  return useMutation({
    mutationFn: getDetailedRecipe,
  });
}

// Save a new recipe
async function saveRecipe(data: SaveRecipeRequest): Promise<Recipe[]> {
  const response = await api.put(RECIPE_SAVE_PATH, data);
  return response.data;
}

export function useSaveRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRecipes"] });
    },
  });
}
