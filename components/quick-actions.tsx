import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, QrCode, FileText, AlertTriangle } from 'lucide-react'

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add New Chemical
        </Button>
        <Button className="w-full" variant="outline">
          <QrCode className="mr-2 h-4 w-4" /> Generate QR Code
        </Button>
        <Button className="w-full" variant="outline">
          <FileText className="mr-2 h-4 w-4" /> Generate Report
        </Button>
        <Button className="w-full" variant="outline">
          <AlertTriangle className="mr-2 h-4 w-4" /> View Alerts
        </Button>
      </CardContent>
    </Card>
  )
}

