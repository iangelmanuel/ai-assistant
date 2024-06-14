import '../styles/spinner.css'

export const Spinner = () => {
  return (
    <article className="flex flex-col justify-center items-center h-screen">
      <div className="loader"></div>

      <span className="text-xs mt-2 text-slate-400">
        This can take a few minutes
      </span>
    </article>
  )
}
