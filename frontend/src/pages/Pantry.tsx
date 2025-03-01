import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PantryRow } from "@/components/pantryRow";

interface Receipt {
  id: string;
  date: string;
}

interface PantryItem {
  id: string;
  user_id: string;
  item_name: string;
  quantity: number;
  receipt_id: string;
  unit: string;
  expiration_date: string;
  receipt: Receipt;
}

export default function Pantry() {
  // Sample data matching your schema
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    {
      id: "1",
      user_id: "user123",
      item_name: "Organic Brown Rice",
      quantity: 5,
      receipt_id: "receipt1",
      unit: "lbs",
      expiration_date: "2025-05-15T00:00:00Z",
      receipt: {
        id: "receipt1",
        date: "2025-01-15T00:00:00Z",
      },
    },
    {
      id: "2",
      user_id: "user123",
      item_name: "Extra Virgin Olive Oil",
      quantity: 2,
      receipt_id: "receipt2",
      unit: "bottles",
      expiration_date: "2025-08-10T00:00:00Z",
      receipt: {
        id: "receipt2",
        date: "2025-02-10T00:00:00Z",
      },
    },
    {
      id: "3",
      user_id: "user123",
      item_name: "Black Beans",
      quantity: 8,
      receipt_id: "receipt3",
      unit: "cans",
      expiration_date: "2025-03-15T00:00:00Z", // Soon to expire
      receipt: {
        id: "receipt3",
        date: "2024-09-15T00:00:00Z",
      },
    },
    {
      id: "4",
      user_id: "user123",
      item_name: "Almond Flour",
      quantity: 1,
      receipt_id: "receipt4",
      unit: "bag",
      expiration_date: "2024-03-01T00:00:00Z", // Already expired
      receipt: {
        id: "receipt4",
        date: "2024-12-01T00:00:00Z",
      },
    },
  ]);

  // Handler functions
  const handleEdit = (id: string) => {
    console.log(`Editing item with ID: ${id}`);
    // Implement edit functionality
  };

  const handleDelete = (id: string) => {
    console.log(`Deleting item with ID: ${id}`);
    setPantryItems(pantryItems.filter((item) => item.id !== id));
  };

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

      {/* Column headers */}
      <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground shadow-lg">
        <div className="col-span-3">Item</div>
        <div className="col-span-2 text-center">Quantity</div>
        <div className="col-span-2">Purchase Date</div>
        <div className="col-span-3">Expiration Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      <div className="space-y-3">
        {pantryItems.map((item) => (
          <PantryRow
            key={item.id}
            {...item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
