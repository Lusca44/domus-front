
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
    <div className="flex justify-between items-center mb-4">
      <div className="text-sm text-gray-600">
        Total de {totalItems} leads encontradas
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="items-per-page">Itens por página</Label>
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
          className="w-[120px]"
        />
      </div>
    </div>
  );
}
