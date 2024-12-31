"use client"

import { useState } from "react"
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import QRCode from "react-qr-code"

type QRCodeItem = {
  id: string
  chemicalName: string
  chemicalId: string
  dateCreated: string
}

const initialQRCodes: QRCodeItem[] = [
  { id: "1", chemicalName: "Sodium Chloride", chemicalId: "NaCl-001", dateCreated: "2023-06-15" },
  { id: "2", chemicalName: "Hydrochloric Acid", chemicalId: "HCl-002", dateCreated: "2023-06-10" },
  { id: "3", chemicalName: "Ethanol", chemicalId: "C2H5OH-003", dateCreated: "2023-06-12" },
  { id: "4", chemicalName: "Sulfuric Acid", chemicalId: "H2SO4-004", dateCreated: "2023-06-08" },
  { id: "5", chemicalName: "Sodium Hydroxide", chemicalId: "NaOH-005", dateCreated: "2023-06-14" },
]

export function QRCodeList() {
  const [qrCodes, setQRCodes] = useState<QRCodeItem[]>(initialQRCodes)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredQRCodes = qrCodes.filter((item) =>
    item.chemicalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.chemicalId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteQRCode = (id: string) => {
    setQRCodes(qrCodes.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search QR codes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Chemical Name</TableHead>
            <TableHead>Chemical ID</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredQRCodes.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.chemicalName}</TableCell>
              <TableCell>{item.chemicalId}</TableCell>
              <TableCell>{item.dateCreated}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mr-2">
                      View QR
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{item.chemicalName} QR Code</DialogTitle>
                      <DialogDescription>Scan this QR code to access chemical information.</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center">
                      <QRCode value={JSON.stringify({ name: item.chemicalName, id: item.chemicalId })} size={200} />
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm" onClick={() => handleDeleteQRCode(item.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

