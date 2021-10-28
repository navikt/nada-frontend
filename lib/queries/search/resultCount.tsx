export interface ResultCountProps {
  resultCount?: number
}

export const ResultCount = ({ resultCount }: ResultCountProps) => {
  if (typeof resultCount === 'undefined') return <div>Søker...</div>
  return <div>{resultCount} treff:</div>
}
