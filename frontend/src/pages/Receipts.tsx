import ReceiptModal from "@/components/receiptModal";
import { ReceiptRow } from "@/components/receiptRow";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteReceipt, useGetUserReceipts } from "@/endpoints/receipt";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Receipts() {
  const { data: Receipt, isLoading, isError, error } = useGetUserReceipts();
  const removeReceipt = useDeleteReceipt();
  const [isOpen, setIsOpen] = useState(false)

  //const [editingItemId, setEditingItemId] = useState<number | null>(null);

  // Handler functions
  const handleEdit = (id: number) => {
    console.log(`Editing item with ID: ${id}`);
    // setEditingItemId(id);
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting item with ID: ${id}`);
    removeReceipt.mutate(id);
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">Receipts</h1>
            <p className="text-muted-foreground">Manage Receipts To Group Food Items</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2" onClick={() => {setIsOpen((prev) => { return !prev })}}>
            <Plus size={18} />
            Add Receipt
          </Button>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-7 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground shadow-lg">
          <div className="col-span-3">Receipt Name</div>
          <div className="col-span-2 text-left">Shopping Date</div>
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
            <h1 className="text-3xl font-bold tracking-tight text-primary">Receipts</h1>
            <p className="text-muted-foreground">Manage Receipts To Group Food Items</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2" onClick={() => {setIsOpen((prev) => { return !prev })}}>
            <Plus size={18} />
            Add Receipt
          </Button>
        </div>

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
          <h1 className="text-3xl font-bold tracking-tight text-primary">Receipts</h1>
          <p className="text-muted-foreground">Manage Receipts To Group Food Items</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2" onClick={() => {setIsOpen((prev) => { return !prev })}}>
          <Plus size={18} />
          Add Receipt
        </Button>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-7 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground shadow-lg">
        <div className="col-span-3">Receipt Name</div>
        <div className="col-span-2 text-left">Shopping Date</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {(!Receipt || Receipt.receipts.length === 0) && (
        <div className="text-center py-12 bg-muted/30 rounded-md">
          <p className="text-muted-foreground">
            Your pantry is empty. Add some items to get started.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {Receipt &&
          Receipt.receipts.map((item) => (
            <ReceiptRow
              key={item.id}
              {...item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={removeReceipt.isPending && removeReceipt.variables === item.id}
            />
          ))}
      </div>
      <ReceiptModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
