import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

const RECEIPTS_PATH = "/receipts";
const RECEIPT_PARSER_PATH = "/receiptParser";

export interface Receipt {
  id: number;
  name: string;
  date: string;
  user_id?: string;
}

export interface ReceiptData {
  name: string;
  date: string;
}

export interface ReceiptUpdateData {
  id: number;
  name: string;
  date: string;
}

export interface ReceiptParseRequest {
  receiptString: string;
  receiptId: number;
}

async function getUserReceipts(): Promise<{ receipts: Receipt[] }> {
  const response = await api.get(RECEIPTS_PATH);
  return response.data;
}

export function useGetUserReceipts() {
  return useQuery({
    queryKey: ["receipts"],
    queryFn: getUserReceipts,
  });
}

async function createReceipt(
  receiptData: ReceiptData
): Promise<{ message: string; newReceiptId: number }> {
  const response = await api.post(RECEIPTS_PATH, { receiptData });
  return response.data;
}

export function useCreateReceipt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReceipt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receipts"] });
    },
  });
}

async function updateReceipt(receiptData: ReceiptUpdateData): Promise<void> {
  await api.put(RECEIPTS_PATH, { receiptData });
}

export function useUpdateReceipt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReceipt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receipts"] });
    },
  });
}

async function deleteReceipt(receiptId: number): Promise<void> {
  await api.delete(`${RECEIPTS_PATH}/${receiptId}`);
}

export function useDeleteReceipt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReceipt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receipts"] });
      queryClient.invalidateQueries({ queryKey: ["foodItems"] });
    },
  });
}

async function parseReceiptIntoFoodItems(
  data: ReceiptParseRequest
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const response = await api.post(RECEIPT_PARSER_PATH, { receipt: data });
  return response.data;
}

export function useParseReceiptIntoFoodItems() {
  return useMutation({
    mutationFn: parseReceiptIntoFoodItems,
  });
}
