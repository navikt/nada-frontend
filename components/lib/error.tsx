import { ErrorFilled } from '@navikt/ds-icons'

interface errorMessageProps {
  error: Error
}

export const ErrorMessage = ({ error }: errorMessageProps) => {
  return (
    <div className="bg-feedback-danger-background rounded px-1 py-2">
      <div className="flex items-center text-base gap-1">
        <ErrorFilled />
        Feil
      </div>
      <p>{error.message}</p>
    </div>
  )
}

export default ErrorMessage
