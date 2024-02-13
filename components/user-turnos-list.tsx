import { CalendarCheck } from 'lucide-react'

export const UserTurnosList = ({ turnos }: { turnos: any }) => {
  return (
    <div>
      <h3 className="text-lg text-muted-foreground mb-2">
        Historial de turnos:
      </h3>
      {turnos.length > 0 ? (
        <ol className="relative ml-4 border-s border-gray-200">
          {turnos.map(({ date, hour, description }) => (
            <li className="mb-10 ms-8" key={turnos.id}>
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -start-3 ring-8 ring-white">
                <CalendarCheck />
              </span>
              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                {date}
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                Horario: {hour}hs
              </time>
              <p className="text-base font-normal text-gray-500">
                {description}
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <div>
          <h3 className="text-lg text-muted-foreground">
            Historial de turnos:
          </h3>
          <p>Acá apareceran tus turnos cuando agendes uno</p>
        </div>
      )}
    </div>
  )
}
