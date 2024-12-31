"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const usageData = [
  { name: "Jan", total: 167 },
  { name: "Feb", total: 145 },
  { name: "Mar", total: 189 },
  { name: "Apr", total: 213 },
  { name: "May", total: 252 },
  { name: "Jun", total: 276 },
]

const expirationData = [
  { name: "Jul", total: 12 },
  { name: "Aug", total: 18 },
  { name: "Sep", total: 23 },
  { name: "Oct", total: 35 },
  { name: "Nov", total: 48 },
  { name: "Dec", total: 52 },
]

export function DashboardCharts({ fullWidth = false }: { fullWidth?: boolean }) {
  return (
    <>
      <Card className={fullWidth ? "col-span-2" : ""}>
        <CardHeader>
          <CardTitle>Chemical Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={usageData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      {fullWidth && (
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Chemical Expiration Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={expirationData}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </>
  )
}

