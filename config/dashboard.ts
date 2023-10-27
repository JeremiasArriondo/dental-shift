import { DashboardConfig } from '@/types'

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Mis turnos',
      href: '/dashboard'
    },
    {
      title: 'Datos personales',
      href: '/dashboard/settings'
    }
  ],
  sidebarNav: [
    {
      title: 'Mis turnos',
      href: '/dashboard',
      icon: 'calendar'
    },
    {
      title: 'Datos personales',
      href: '/dashboard/settings',
      icon: 'settings'
    }
  ]
}
