"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { FileDown } from 'lucide-react'

export function ReportGenerator() {
  const [reportType, setReportType] = useState("")
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() })

  const handleGenerateReport = () => {
    // Here you would typically call an API to generate the report
    console.log("Generating report:", { reportType, dateRange })
  }

  const handleExport = (format: "pdf" | "excel") => {
    // Here you would typically call an API to export the report
    console.log(`Exporting report as ${format}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Report</CardTitle>
        <CardDescription>Select report type and date range to generate a report.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Select onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inventory">Inventory Summary</SelectItem>
              <SelectItem value="usage">Chemical Usage</SelectItem>
              <SelectItem value="expiration">Expiration</SelectItem>
              <SelectItem value="cost">Cost Analysis</SelectItem>
            </SelectContent>
          </Select>
          <DatePickerWithRange onDateRangeChange={setDateRange} />
        </div>
        <div className="flex space-x-4">
          <Button onClick={handleGenerateReport}>Generate Report</Button>
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <FileDown className="mr-2 h-4 w-4" /> Export as PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport("excel")}>
            <FileDown className="mr-2 h-4 w-4" /> Export as Excel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

