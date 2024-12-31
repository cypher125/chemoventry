import Link from "next/link"
import { Home, FlaskRoundIcon as Flask, QrCode, FileText, Users, Bell, Settings, LogOut } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="flex flex-col justify-between w-64 bg-gray-800 text-white h-screen p-4 rounded-r-lg">
      <div>
        <div className="flex items-center mb-8">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 3V7M17 3V7M3 10H21M5 5H19C20.1046 5 21 5.89543 21 7V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7C3 5.89543 3.89543 5 5 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 14L9 17H15L12 14Z" fill="currentColor"/>
            <path d="M12 14L15 11H9L12 14Z" fill="currentColor"/>
          </svg>
          <span className="text-2xl font-bold">Chemoventry</span>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="flex items-center p-2 hover:bg-gray-700 hover:border-l-4 hover:border-blue-500 rounded transition-all duration-200">
                <Home className="mr-2" size={20} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/inventory" className="flex items-center p-2 hover:bg-gray-700 hover:border-l-4 hover:border-blue-500 rounded transition-all duration-200">
                <Flask className="mr-2" size={20} />
                Chemical Inventory
              </Link>
            </li>
            <li>
              <Link href="/qr-codes" className="flex items-center p-2 hover:bg-gray-700 hover:border-l-4 hover:border-blue-500 rounded transition-all duration-200">
                <QrCode className="mr-2" size={20} />
                QR Code Management
              </Link>
            </li>
            <li>
              <Link href="/reports" className="flex items-center p-2 hover:bg-gray-700 hover:border-l-4 hover:border-blue-500 rounded transition-all duration-200">
                <FileText className="mr-2" size={20} />
                Reports
              </Link>
            </li>
            <li>
              <Link href="/users" className="flex items-center p-2 hover:bg-gray-700 hover:border-l-4 hover:border-blue-500 rounded transition-all duration-200">
                <Users className="mr-2" size={20} />
                User Management
              </Link>
            </li>
            <li>
              <Link href="/notifications" className="flex items-center p-2 hover:bg-gray-700 hover:border-l-4 hover:border-blue-500 rounded transition-all duration-200">
                <Bell className="mr-2" size={20} />
                Notifications
              </Link>
            </li>
            <li>
              <Link href="/settings" className="flex items-center p-2 hover:bg-gray-700 hover:border-l-4 hover:border-blue-500 rounded transition-all duration-200">
                <Settings className="mr-2" size={20} />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mt-auto">
        <Link href="/login" className="flex items-center p-2 hover:bg-gray-700 hover:border-l-4 hover:border-blue-500 rounded transition-all duration-200">
          <LogOut className="mr-2" size={20} />
          Logout
        </Link>
        <div className="text-xs text-gray-400 mt-4 text-center">
          © {new Date().getFullYear()} Chemoventry. All rights reserved.
        </div>
      </div>
    </div>
  )
}

