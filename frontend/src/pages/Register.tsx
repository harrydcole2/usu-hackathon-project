import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Apple, Carrot, Leaf, Banana, Grape, Citrus, Egg, Cookie, Milk} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateUser, useLogin } from "@/endpoints/user";
import { Link } from "react-router-dom";

const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const { mutate: register, isPending: registerPending } = useCreateUser();
  const { mutate: login, isPending: loginPending } = useLogin();
  const produceItems = [
    { name: "Apple", icon: Apple, color: "text-red-500" },
    { name: "Carrot", icon: Carrot, color: "text-orange-500" },
    { name: "Lettuce", icon: Leaf, color: "text-green-500" },
    { name: "Banana", icon: Banana, color: "text-yellow-500" },
    { name: "Grape", icon: Grape, color: "text-purple-500" },
    { name: "Orange", icon: Citrus, color: "text-orange-500" },
    { name: "Milk", icon: Milk, color: "text-blue-500" },
    { name: "Egg", icon: Egg, color: "text-yellow-500" },
    { name: "Cookie", icon: Cookie, color: "text-[#d9be91]" },
  ]
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = data;
    register(registerData, {
      onSuccess: () => {
        login({ username: data.username, password: data.password });
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#C9D6EA] to-[#E8F7EE]">
      <Card className="w-full max-w-md z-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center">
            Register to start tracking your pantry inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Choose a username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={registerPending || loginPending}
              >
                {registerPending || loginPending
                  ? "Creating account..."
                  : "Register"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {produceItems.map((item, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth - 100,
              y: Math.random() * window.innerHeight - 100,
              opacity: 0.7,
              scale: 0.8,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth - 100,
                Math.random() * window.innerWidth - 100,
                Math.random() * window.innerWidth - 100,
              ],
              y: [
                Math.random() * window.innerHeight - 100,
                Math.random() * window.innerHeight - 100,
                Math.random() * window.innerHeight - 100,
              ],
              rotate: [0, 10, -10, 5, 0],
              opacity: [0.7, 0.9, 0.7],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 15 + Math.random() * 10,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
          >
            <div className={`${item.color} bg-white/80 p-3 rounded-full shadow-md`}>
              <item.icon size={48} />
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default Register;
