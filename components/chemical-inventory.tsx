"use client"

import { useState } from "react"
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useNotifications } from "@/contexts/NotificationContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"

type Chemical = {
  id: string
  name: string
  formula: string
  casNumber: string
  quantity: number
  unit: string
  location: string
  expirationDate: string
  reactivity: "Low" | "Moderate" | "High"
  organicState: "Solid" | "Liquid" | "Gas"
}

const initialChemicals: Chemical[] = [
  {
    id: "1",
    name: "Sodium Chloride",
    formula: "NaCl",
    casNumber: "7647-14-5",
    quantity: 500,
    unit: "g",
    location: "Shelf A1",
    expirationDate: "2024-12-31",
    reactivity: "Low",
    organicState: "Solid",
  },
  {
    id: "2",
    name: "Hydrochloric Acid",
    formula: "HCl",
    casNumber: "7647-01-0",
    quantity: 1,
    unit: "L",
    location: "Cabinet B2",
    expirationDate: "2023-10-15",
    reactivity: "High",
    organicState: "Liquid",
  },
  {
    id: "3",
    name: "Ethanol",
    formula: "C2H5OH",
    casNumber: "64-17-5",
    quantity: 2.5,
    unit: "L",
    location: "Flammables Cabinet",
    expirationDate: "2025-06-30",
    reactivity: "Moderate",
    organicState: "Liquid",
  },
]

export function ChemicalInventory() {
  const [chemicals, setChemicals] = useState<Chemical[]>(initialChemicals)
  const [searchTerm, setSearchTerm] = useState("")
  const [newChemical, setNewChemical] = useState<Partial<Chemical>>({})
  const [reactivityFilter, setReactivityFilter] = useState<Chemical['reactivity'] | 'All'>('All')
  const [organicStateFilter, setOrganicStateFilter] = useState<Chemical['organicState'] | 'All'>('All')
  const { addNotification } = useNotifications()

  const filteredChemicals = chemicals.filter((chemical) =>
    chemical.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (reactivityFilter === 'All' || chemical.reactivity === reactivityFilter) &&
    (organicStateFilter === 'All' || chemical.organicState === organicStateFilter)
  )

  const handleAddChemical = () => {
    if (newChemical.name && newChemical.formula && newChemical.casNumber) {
      const newChemicalWithId = {
        ...newChemical,
        id: (chemicals.length + 1).toString(),
      } as Chemical
      setChemicals([...chemicals, newChemicalWithId])
      setNewChemical({})
      addNotification({
        title: "Chemical Added",
        description: `${newChemicalWithId.name} has been added to the inventory.`,
        type: "success"
      })
    }
  }

  const handleDeleteChemical = (id: string) => {
    const chemicalToDelete = chemicals.find(c => c.id === id)
    setChemicals(chemicals.filter(c => c.id !== id))
    if (chemicalToDelete) {
      addNotification({
        title: "Chemical Deleted",
        description: `${chemicalToDelete.name} has been removed from the inventory.`,
        type: "error"
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chemical Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search chemicals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={reactivityFilter} onValueChange={(value) => setReactivityFilter(value as Chemical['reactivity'] | 'All')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Reactivity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Reactivity</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
            <Select value={organicStateFilter} onValueChange={(value) => setOrganicStateFilter(value as Chemical['organicState'] | 'All')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Organic State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All States</SelectItem>
                <SelectItem value="Solid">Solid</SelectItem>
                <SelectItem value="Liquid">Liquid</SelectItem>
                <SelectItem value="Gas">Gas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Chemical
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Chemical</DialogTitle>
                <DialogDescription>
                  Enter the details of the new chemical to add to the inventory.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newChemical.name || ""}
                    onChange={(e) =>
                      setNewChemical({ ...newChemical, name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="formula" className="text-right">
                    Formula
                  </Label>
                  <Input
                    id="formula"
                    value={newChemical.formula || ""}
                    onChange={(e) =>
                      setNewChemical({ ...newChemical, formula: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="casNumber" className="text-right">
                    CAS Number
                  </Label>
                  <Input
                    id="casNumber"
                    value={newChemical.casNumber || ""}
                    onChange={(e) =>
                      setNewChemical({ ...newChemical, casNumber: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reactivity" className="text-right">
                    Reactivity
                  </Label>
                  <Select
                    value={newChemical.reactivity}
                    onValueChange={(value) => setNewChemical({ ...newChemical, reactivity: value as Chemical['reactivity'] })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select reactivity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="organicState" className="text-right">
                    Organic State
                  </Label>
                  <Select
                    value={newChemical.organicState}
                    onValueChange={(value) => setNewChemical({ ...newChemical, organicState: value as Chemical['organicState'] })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select organic state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Solid">Solid</SelectItem>
                      <SelectItem value="Liquid">Liquid</SelectItem>
                      <SelectItem value="Gas">Gas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddChemical}>Add Chemical</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Formula</TableHead>
              <TableHead>CAS Number</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Expiration Date</TableHead>
              <TableHead>Reactivity</TableHead>
              <TableHead>Organic State</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredChemicals.map((chemical) => (
              <TableRow key={chemical.id}>
                <TableCell>
                  <Link href={`/inventory/${chemical.id}`} className="text-blue-500 hover:underline">
                    {chemical.name}
                  </Link>
                </TableCell>
                <TableCell>{chemical.formula}</TableCell>
                <TableCell>{chemical.casNumber}</TableCell>
                <TableCell>{`${chemical.quantity} ${chemical.unit}`}</TableCell>
                <TableCell>{chemical.location}</TableCell>
                <TableCell>{chemical.expirationDate}</TableCell>
                <TableCell>{chemical.reactivity}</TableCell>
                <TableCell>{chemical.organicState}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/inventory/${chemical.id}`}>View details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit chemical</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDeleteChemical(chemical.id)}>
                        Delete chemical
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

