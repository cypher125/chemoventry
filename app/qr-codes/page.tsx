import { QRCodeGenerator } from "@/components/qr-code-generator"
import { QRCodeList } from "@/components/qr-code-list"

export default function QRCodeManagementPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">QR Code Management</h1>
      <QRCodeGenerator />
      <QRCodeList />
    </div>
  )
}

