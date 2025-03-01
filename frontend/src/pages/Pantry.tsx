import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";

// Define the pantry item type
interface PantryItem {
  id: string;
  title: string;
  description: string;
  quantity: number;
  unit: string;
  cost: number;
}

export default function Pantry() {
  // Sample data
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    {
      id: "1",
      title: "Organic Brown Rice",
      description: "Whole grain rice for healthy meals",
      quantity: 5,
      unit: "lbs",
      cost: 12.99,
    },
    {
      id: "2",
      title: "Extra Virgin Olive Oil",
      description: "Cold-pressed premium olive oil",
      quantity: 2,
      unit: "bottles",
      cost: 18.5,
    },
    {
      id: "3",
      title: "Black Beans",
      description: "Canned organic black beans",
      quantity: 8,
      unit: "cans",
      cost: 1.99,
    },
    {
      id: "4",
      title: "Almond Flour",
      description: "Gluten-free baking essential",
      quantity: 1,
      unit: "bag",
      cost: 9.75,
    },
  ]);

  console.log(pantryItems, typeof setPantryItems); // TODO: Remove

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Pantry
          </h1>
          <p className="text-muted-foreground">
            Manage your pantry ingredients
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2">
          <Plus size={18} />
          Add Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pantryItems.map((item) => (
          <Card key={item.id} className="overflow-hidden border-border">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-primary">{item.title}</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-secondary/30 text-secondary-foreground border-secondary"
                >
                  {item.quantity} {item.unit}
                </Badge>
              </div>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold">
                ${item.cost.toFixed(2)}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 bg-muted/10 py-2">
              <Button
                variant="outline"
                size="sm"
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                <Edit size={16} className="mr-1" />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 size={16} className="mr-1" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
