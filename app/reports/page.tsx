import { ReportGenerator } from "@/components/report-generator"
import { ReportTable } from "@/components/report-table"

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Reports</h1>
      <ReportGenerator />
      <ReportTable />
    </div>
  )
}

