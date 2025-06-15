
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface LeadsTableControlsProps {
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  totalItems: number;
}

export function LeadsTableControls({
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
}: LeadsTableControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 p-4 sm:p-0">
      <div className="text-sm text-gray-600 order-2 sm:order-1">
        Total de {totalItems} leads encontradas
      </div>
      <div className="flex flex-col space-y-2 w-full sm:w-auto order-1 sm:order-2">
        <Label htmlFor="items-per-page" className="text-sm">Itens por página</Label>
        <Input
          id="items-per-page"
          type="number"
          min="1"
          max="100"
          value={itemsPerPage}
          onChange={(e) => {
            const value = parseInt(e.target.value) || 1;
            onItemsPerPageChange(Math.max(1, Math.min(100, value)));
          }}
          className="w-full sm:w-[120px]"
        />
      </div>
    </div>
  );
}
