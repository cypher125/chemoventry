"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Toast } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'

type Notification = {
  id: string
  title: string
  description: string
  type: 'info' | 'success' | 'warning' | 'error'
}

type NotificationContextType = {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { toast } = useToast()

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications((prev) => [...prev, { ...notification, id }])
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  useEffect(() => {
    notifications.forEach((notification) => {
      toast({
        title: notification.title,
        description: notification.description,
        variant: notification.type === 'error' ? 'destructive' : 'default',
      })
      removeNotification(notification.id)
    })
  }, [notifications, toast])

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

