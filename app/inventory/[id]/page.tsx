"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useNotifications } from "@/contexts/NotificationContext"
import QRCode from "react-qr-code"
import { Edit, ArrowLeft, Beaker, AlertTriangle, Calendar, User, FlaskRoundIcon as Flask, Atom, Droplet } from 'lucide-react'
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Chemical = {
  id: string
  name: string
  quantity: number
  description: string
  vendor: string
  hazard_information: string
  molecular_formula: string
  reactivity_group: string
  chemical_type: string
  chemical_state: string
  shelf: string
  expires: string
  created_at: string
  updated_at: string
}

const reactivityGroups = [
  'Alkali', 'Alkaline Earth', 'Transition Metal', 'Lanthanide', 'Actinide',
  'Metal', 'Nonmetal', 'Halogen', 'Noble Gas', 'Other'
]

const chemicalTypes = ['Organic', 'Inorganic', 'Both']

const chemicalStates = ['Solid', 'Liquid', 'Gas', 'Plasma', 'Other']

export default function ChemicalDetailsPage({ params }: { params: { id: string } }) {
  const [chemical, setChemical] = useState<Chemical | null>(null)
  const [editedChemical, setEditedChemical] = useState<Chemical | null>(null)
  const router = useRouter()
  const { addNotification } = useNotifications()

  useEffect(() => {
    // In a real application, you would fetch the chemical data from an API
    // For this example, we'll use mock data
    const mockChemical: Chemical = {
      id: params.id,
      name: "Sodium Chloride",
      quantity: 500,
      description: "Common table salt",
      vendor: "ChemSupply Inc.",
      hazard_information: "May cause eye and skin irritation.",
      molecular_formula: "NaCl",
      reactivity_group: "Nonmetal",
      chemical_type: "Inorganic",
      chemical_state: "Solid",
      shelf: "A1",
      expires: "2024-12-31",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-06-15T12:30:00Z"
    }
    setChemical(mockChemical)
    setEditedChemical(mockChemical)
  }, [params.id])

  const handleEdit = () => {
    if (editedChemical) {
      setChemical(editedChemical)
      addNotification({
        title: "Chemical Updated",
        description: `${editedChemical.name} has been updated.`,
        type: "success"
      })
    }
  }

  if (!chemical) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <Link href="/inventory" className="flex items-center mb-4 text-blue-500 hover:underline">
        <ArrowLeft className="mr-2" /> Back to Inventory
      </Link>
      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Beaker className="mr-2" />
              {chemical.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Chemical Information</h3>
                <p><strong>Molecular Formula:</strong> {chemical.molecular_formula}</p>
                <p><strong>Quantity:</strong> {chemical.quantity}g</p>
                <p><strong>Vendor:</strong> {chemical.vendor}</p>
                <p><strong>Reactivity Group:</strong> {chemical.reactivity_group}</p>
                <p><strong>Chemical Type:</strong> {chemical.chemical_type}</p>
                <p><strong>Chemical State:</strong> {chemical.chemical_state}</p>
                <p><strong>Shelf:</strong> {chemical.shelf}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Dates</h3>
                <p><strong>Expiration Date:</strong> {chemical.expires}</p>
                <p><strong>Created At:</strong> {new Date(chemical.created_at).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(chemical.updated_at).toLocaleString()}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p>{chemical.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <AlertTriangle className="mr-2 text-yellow-500" />
                Hazard Information
              </h3>
              <p>{chemical.hazard_information}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>QR Code</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <QRCode value={JSON.stringify(chemical)} size={200} />
          </CardContent>
        </Card>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-6">
            <Edit className="mr-2 h-4 w-4" /> Edit Chemical
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Chemical</DialogTitle>
            <DialogDescription>
              Make changes to the chemical information here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editedChemical?.name || ""}
                  onChange={(e) =>
                    setEditedChemical(prev => ({ ...prev!, name: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (g)</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={editedChemical?.quantity || 0}
                  onChange={(e) =>
                    setEditedChemical(prev => ({ ...prev!, quantity: Number(e.target.value) }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Input
                  id="vendor"
                  value={editedChemical?.vendor || ""}
                  onChange={(e) =>
                    setEditedChemical(prev => ({ ...prev!, vendor: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="molecular_formula">Molecular Formula</Label>
                <Input
                  id="molecular_formula"
                  value={editedChemical?.molecular_formula || ""}
                  onChange={(e) =>
                    setEditedChemical(prev => ({ ...prev!, molecular_formula: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reactivity_group">Reactivity Group</Label>
                <Select
                  value={editedChemical?.reactivity_group}
                  onValueChange={(value) => setEditedChemical(prev => ({ ...prev!, reactivity_group: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select reactivity group" />
                  </SelectTrigger>
                  <SelectContent>
                    {reactivityGroups.map((group) => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chemical_type">Chemical Type</Label>
                <Select
                  value={editedChemical?.chemical_type}
                  onValueChange={(value) => setEditedChemical(prev => ({ ...prev!, chemical_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select chemical type" />
                  </SelectTrigger>
                  <SelectContent>
                    {chemicalTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="chemical_state">Chemical State</Label>
                <Select
                  value={editedChemical?.chemical_state}
                  onValueChange={(value) => setEditedChemical(prev => ({ ...prev!, chemical_state: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select chemical state" />
                  </SelectTrigger>
                  <SelectContent>
                    {chemicalStates.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shelf">Shelf</Label>
                <Input
                  id="shelf"
                  value={editedChemical?.shelf || ""}
                  onChange={(e) =>
                    setEditedChemical(prev => ({ ...prev!, shelf: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expires">Expiration Date</Label>
                <Input
                  id="expires"
                  type="date"
                  value={editedChemical?.expires || ""}
                  onChange={(e) =>
                    setEditedChemical(prev => ({ ...prev!, expires: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editedChemical?.description || ""}
                onChange={(e) =>
                  setEditedChemical(prev => ({ ...prev!, description: e.target.value }))
                }
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="hazard_information">Hazard Information</Label>
              <Textarea
                id="hazard_information"
                value={editedChemical?.hazard_information || ""}
                onChange={(e) =>
                  setEditedChemical(prev => ({ ...prev!, hazard_information: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

