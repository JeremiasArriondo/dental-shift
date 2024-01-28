export const UserTurnosList = () => {
  return (
    <div>
      {/* TODO: Recorrrer turnos */}
      {[].length > 0 ? (
        <div className="divide-y divide-border rounded-md border">
          <h3>Mis turnos:</h3>
          {/* {posts.map((post) => (
    <PostItem key={post.id} post={post} />
  ))} */}
        </div>
      ) : (
        <div>
          <h3 className="text-lg text-muted-foreground">Mis turnos:</h3>
          <p>Acá apareceran tus turnos cuando agendes uno</p>
        </div>
      )}
    </div>
  )
}
