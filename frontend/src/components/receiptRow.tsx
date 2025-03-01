import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Loader2 } from "lucide-react";
import { Receipt } from "@/endpoints/receipt";

interface ReceiptItemProps extends Receipt {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

export const ReceiptRow = ({
  id,
  name,
  date,
  onEdit,
  onDelete,
  isDeleting = false,
}: ReceiptItemProps) => {
  
  return (
    <Card className="overflow-hidden border-border">
      <CardContent className="p-0">
        <div className="grid grid-cols-7 gap-4 items-center px-4 py-4">
          <div className="col-span-3">
            <h3 className="font-medium text-primary">{name}</h3>
          </div>
          <div className="col-span-2 text-sm text-muted-foreground">
            {date.substring(0, 10)}
          </div>
          <div className="col-span-2 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-primary/30 text-primary hover:bg-primary/10"
              onClick={() => onEdit(id)}
              disabled={isDeleting}
            >
              <Edit size={16} className="mr-1" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(id)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
