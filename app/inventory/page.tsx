import { ChemicalInventory } from "@/components/chemical-inventory"

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Chemical Inventory</h1>
      <ChemicalInventory />
    </div>
  )
}

