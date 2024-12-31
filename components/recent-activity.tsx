import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from 'lucide-react'

const recentActivities = [
  { id: 1, action: "Added", chemical: "Sodium Hydroxide", quantity: "500g", user: "John Doe" },
  { id: 2, action: "Updated", chemical: "Hydrochloric Acid", quantity: "2L", user: "Jane Smith" },
  { id: 3, action: "Removed", chemical: "Ethanol", quantity: "1L", user: "Bob Johnson" },
  { id: 4, action: "Added", chemical: "Sulfuric Acid", quantity: "1L", user: "Alice Brown" },
  { id: 5, action: "Updated", chemical: "Acetone", quantity: "3L", user: "Charlie Wilson" },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="flex items-center">
              <span className="w-20 font-medium">{activity.action}</span>
              <span className="flex-1">{activity.chemical}</span>
              <span className="w-16 text-right">{activity.quantity}</span>
              <span className="w-24 text-right text-sm text-muted-foreground">{activity.user}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

