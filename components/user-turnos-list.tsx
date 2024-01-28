export const UserTurnosList = ({ turnos }: { turnos: any }) => {
  return (
    <div>
      {/* TODO: Recorrrer turnos */}
      <h3 className="text-lg text-muted-foreground">Historial de turnos:</h3>
      {turnos.length > 0 ? (
        <div className="divide-y divide-border rounded-md">
          {turnos.map((turno) => (
            <p>{turno.description}</p>
          ))}
        </div>
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
