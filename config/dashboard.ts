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
  adminNav: [
    {
      title: 'Calendario',
      href: '/dashboard/admin'
    },
    {
      title: 'Pacientes',
      href: '/dashboard/admin/pacients'
    },
    {
      title: 'Historiales clínicos',
      href: '/dashboard/admin/medical-history'
    },
    {
      title: 'Obra Sociales',
      href: '/dashboard/admin/obras-sociales'
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
