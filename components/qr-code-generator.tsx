"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import QRCode from "react-qr-code"

export function QRCodeGenerator() {
  const [chemicalName, setChemicalName] = useState("")
  const [chemicalId, setChemicalId] = useState("")
  const [generatedQR, setGeneratedQR] = useState("")

  const handleGenerateQR = () => {
    if (chemicalName && chemicalId) {
      const qrData = JSON.stringify({ name: chemicalName, id: chemicalId })
      setGeneratedQR(qrData)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate QR Code</CardTitle>
        <CardDescription>Create a QR code for a chemical in your inventory.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="chemical-name">Chemical Name</Label>
          <Input
            id="chemical-name"
            value={chemicalName}
            onChange={(e) => setChemicalName(e.target.value)}
            placeholder="Enter chemical name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="chemical-id">Chemical ID</Label>
          <Input
            id="chemical-id"
            value={chemicalId}
            onChange={(e) => setChemicalId(e.target.value)}
            placeholder="Enter chemical ID"
          />
        </div>
        <Button onClick={handleGenerateQR}>Generate QR Code</Button>
        {generatedQR && (
          <div className="mt-4 flex justify-center">
            <QRCode value={generatedQR} size={200} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

