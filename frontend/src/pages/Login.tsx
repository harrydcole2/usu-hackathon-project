// Login.tsx
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
import { useLogin } from "@/endpoints/user";
import { Link } from "react-router-dom";

// Define the validation schema with Zod
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Infer the type from the schema
type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { mutate: login, isPending } = useLogin();
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
  
  const randomPosition = () => ({
    x: Math.random() * window.innerWidth - window.innerWidth / 2,
    y: Math.random() * window.innerHeight - window.innerHeight / 2
  });
  

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-b from-[#C9D6EA] to-[#E8F7EE] relative">
      <motion.div
        className="absolute top-8 left-1/2 transform -translate-x-1/2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full shadow-md">
          <Carrot className="text-orange-500" />
          <span className="font-bold text-lg text-gray-800">Pantry AI</span>
        </div>
      </motion.div>


      <Card className="w-full max-w-md shadow-xl z-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login to Pantry
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your pantry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
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
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
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

export default Login;
