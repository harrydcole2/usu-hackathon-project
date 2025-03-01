import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Loader2 } from "lucide-react";
import { formatDistanceToNow, parseISO, differenceInDays } from "date-fns";
import { FoodItem } from "@/endpoints/foodItem";

interface PantryItemProps extends FoodItem {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

export const PantryRow = ({
  id,
  item_name,
  quantity,
  unit,
  expiration_date,
  receipt_date,
  onEdit,
  onDelete,
  isDeleting = false,
}: PantryItemProps) => {
  const purchaseDate = receipt_date ? parseISO(receipt_date) : new Date();
  const expiryDate = parseISO(expiration_date);
  const today = new Date();

  const daysRemaining = differenceInDays(expiryDate, today);
  const totalDays = differenceInDays(expiryDate, purchaseDate);
  const daysUsed = differenceInDays(today, purchaseDate);

  const progressPercentage = Math.max(
    0,
    Math.min(100, (daysUsed / totalDays) * 100)
  );

  const getProgressColor = () => {
    return "bg-[#AA4A44]";
  };

  const purchaseDateFormatted = formatDistanceToNow(purchaseDate, {
    addSuffix: true,
  });

  const expiryDateFormatted =
    daysRemaining < 0
      ? `Expired ${formatDistanceToNow(expiryDate, { addSuffix: false })} ago`
      : `Expires in ${daysRemaining} days`;

  if (!id) return null;

  return (
    <Card className="overflow-hidden border-border">
      <CardContent className="p-0">
        <div className="grid grid-cols-12 gap-4 items-center px-4 py-4">
          <div className="col-span-3">
            <h3 className="font-medium text-primary">{item_name}</h3>
          </div>
          <div className="col-span-2 text-center">
            <Badge
              variant="outline"
              className="bg-secondary/30 text-secondary-foreground border-secondary"
            >
              {quantity} {unit}
            </Badge>
          </div>
          <div className="col-span-2 text-sm text-muted-foreground">
            Purchased {purchaseDateFormatted}
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <div className="text-sm text-muted-foreground">
                {expiryDateFormatted}
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getProgressColor()}`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
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
