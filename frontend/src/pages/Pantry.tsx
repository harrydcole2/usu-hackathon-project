import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PantryRow } from "@/components/pantryRow";
import { useGetUserFridge, useRemoveFoodItem } from "@/endpoints/foodItem";
import { useState, useEffect } from "react";
import Modal from "@/components/ui/modal";
import { Skeleton } from "@/components/ui/skeleton";

export default function Pantry() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: pantryItems, isLoading, isError, error } = useGetUserFridge();
  const removeFoodItem = useRemoveFoodItem();
  //const [editingItemId, setEditingItemId] = useState<number | null>(null);

  // Handler functions
  const handleEdit = (id: number) => {
    console.log(`Editing item with ID: ${id}`);
    // setEditingItemId(id);
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting item with ID: ${id}`);
    removeFoodItem.mutate(id);
  };

  // Render loading state
  if (isLoading) {
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
          <div className="flex items-center gap-2">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
              <Plus size={18} />
              Add Item
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2">
              <Plus size={18} />
              Add Receipt
            </Button>
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>

        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground">
          <div className="col-span-3">Item</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2">Purchase Date</div>
          <div className="col-span-3">Expiration Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="w-full">
              <Skeleton className="h-24 w-full rounded-md" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
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
          <div className="flex items-center gap-2">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
              <Plus size={18} />
              Add Item
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2">
              <Plus size={18} />
              Add Receipt
            </Button>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <div className="p-6 bg-destructive/10 rounded-md text-destructive text-center">
          <p>
            Error loading pantry items:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }
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
        <div className="flex items-center gap-2">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
              <Plus size={18} />
              Add Item
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2">
              <Plus size={18} />
              Add Receipt
            </Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      </div>

      {/* Column headers */}
      <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground shadow-lg">
        <div className="col-span-3">Item</div>
        <div className="col-span-2 text-center">Quantity</div>
        <div className="col-span-2">Purchase Date</div>
        <div className="col-span-3">Expiration Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {(!pantryItems || pantryItems.length === 0) && (
        <div className="text-center py-12 bg-muted/30 rounded-md">
          <p className="text-muted-foreground">
            Your pantry is empty. Add some items to get started.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {pantryItems &&
          pantryItems.map((item) => (
            <PantryRow
              key={item.id}
              {...item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={
                removeFoodItem.isPending && removeFoodItem.variables === item.id
              }
            />
          ))}
      </div>
    </div>
  );
}
