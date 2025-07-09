
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
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
      <div className="text-sm text-gray-600">
        Total de {totalItems} leads encontradas
      </div>
      <div className="flex flex-col space-y-2 w-full md:w-auto">
        <Label htmlFor="items-per-page" className="text-xs">Itens por página</Label>
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
          className="w-[120px] md:w-[120px]"
        />
      </div>
    </div>
  );
}
