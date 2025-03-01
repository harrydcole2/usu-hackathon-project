import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

// Define the User type
export interface User {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginResponse {
  token: string;
}

const USERS_PATH = "/users";
const LOGIN_PATH = "/login";
const NEW_USER_PATH = "/newUser";

// API functions
async function loginUser(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await api.post(LOGIN_PATH, { username, password });
  return response.data;
}

async function createUser(user: User): Promise<void> {
  await api.post(NEW_USER_PATH, user);
}

async function updateUserPassword(password: string): Promise<void> {
  await api.put(USERS_PATH, { password });
}

async function deleteUser(): Promise<void> {
  await api.delete(USERS_PATH);
}

// React Query hooks
export function useLogin() {
  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => loginUser(username, password),
  });
}

export function useCreateUser() {
  return useMutation({
    mutationFn: createUser,
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: updateUserPassword,
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
