export const Spinner = () => {
  return (
    <div
      className="w-8 h-8 animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-greenDark rounded-full"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Cargando...</span>
    </div>
  )
}
