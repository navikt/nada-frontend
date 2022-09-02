export interface ResultCountProps {
  resultCount?: number
}

export const ResultCount = ({ resultCount }: ResultCountProps) => {
  if (typeof resultCount === 'undefined') return <div>Søker...</div>
  if (resultCount)
    return <div className="pl-3 my-8">Søket ga {resultCount} treff</div>
  return <div className="pl-3 my-8">Søket ga ingen resultater!</div>
}
