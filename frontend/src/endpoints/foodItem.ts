import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

const FOOD_ITEMS_PATH = "/foodItems";
const FOOD_ITEMS_ALL_PATH = "/foodItems/all";

export interface FoodItem {
  id?: number;
  item_name: string;
  quantity: number;
  receipt_id?: number;
  receipt_date: string;
  unit: string;
  expiration_date: string;
  user_id?: string;
}

async function getUserFridge(): Promise<FoodItem[]> {
  const response = await api.get(FOOD_ITEMS_ALL_PATH);
  return response.data;
}

export function useGetUserFridge() {
  return useQuery({
    queryKey: ["foodItems"],
    queryFn: getUserFridge,
  });
}

async function addFoodItem(foodItem: FoodItem): Promise<void> {
  await api.post(FOOD_ITEMS_PATH, { foodItem });
}

export function useAddFoodItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFoodItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foodItems"] });
    },
  });
}

async function updateFoodItem(foodItem: FoodItem): Promise<void> {
  await api.put(FOOD_ITEMS_PATH, { foodItem });
}

export function useUpdateFoodItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFoodItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foodItems"] });
    },
  });
}

async function removeFoodItem(foodId: number): Promise<void> {
  await api.delete(`${FOOD_ITEMS_PATH}/${foodId}`);
}

export function useRemoveFoodItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFoodItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foodItems"] });
    },
  });
}
