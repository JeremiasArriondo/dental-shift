import { DashboardConfig } from '@/types'

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Mis turnos',
      href: '/dashboard/turnos'
    },
    {
      title: 'Datos personales',
      href: '/dashboard/settings'
    }
  ],
  sidebarNav: [
    {
      title: 'Mis turnos',
      href: '/dashboard/turnos',
      icon: 'calendar'
    },
    {
      title: 'Datos personales',
      href: '/dashboard/settings',
      icon: 'settings'
    }
  ]
}
