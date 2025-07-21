import { AlertCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ErrorMessageProps {
  title?: string
  message: string
  variant?: 'error' | 'warning'
  onRetry?: () => void
  className?: string
}

export function ErrorMessage({
  title,
  message,
  variant = 'error',
  onRetry,
  className,
}: ErrorMessageProps) {
  const Icon = variant === 'error' ? XCircle : AlertCircle
  const colorClasses = variant === 'error' 
    ? 'bg-red-50 border-red-200 text-red-800'
    : 'bg-yellow-50 border-yellow-200 text-yellow-800'

  return (
    <div
      className={cn(
        'rounded-md border p-4',
        colorClasses,
        className
      )}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium mb-1">{title}</h3>
          )}
          <div className="text-sm">
            <p>{message}</p>
          </div>
          {onRetry && (
            <div className="mt-3">
              <button
                onClick={onRetry}
                className="text-sm font-medium underline hover:no-underline"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}