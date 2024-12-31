"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

type ReportData = {
  id: string
  chemical: string
  quantity: number
  unit: string
  location: string
  lastUsed: string
}

const initialReportData: ReportData[] = [
  { id: "1", chemical: "Sodium Chloride", quantity: 500, unit: "g", location: "Shelf A1", lastUsed: "2023-06-15" },
  { id: "2", chemical: "Hydrochloric Acid", quantity: 1, unit: "L", location: "Cabinet B2", lastUsed: "2023-06-10" },
  { id: "3", chemical: "Ethanol", quantity: 2.5, unit: "L", location: "Flammables Cabinet", lastUsed: "2023-06-12" },
  { id: "4", chemical: "Sulfuric Acid", quantity: 750, unit: "mL", location: "Acid Cabinet", lastUsed: "2023-06-08" },
  { id: "5", chemical: "Sodium Hydroxide", quantity: 250, unit: "g", location: "Shelf C3", lastUsed: "2023-06-14" },
]

export function ReportTable() {
  const [reportData, setReportData] = useState<ReportData[]>(initialReportData)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = reportData.filter((item) =>
    item.chemical.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search chemicals..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Chemical</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Last Used</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.chemical}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.lastUsed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

