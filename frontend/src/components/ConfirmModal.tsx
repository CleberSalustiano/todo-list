import { useEffect, useRef } from "react"

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const closeModalUsingEsc = () => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }

  useEffect(closeModalUsingEsc, [isOpen, onCancel])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 transition-opacity duration-300"
      onClick={onCancel}
      data-cy="confirm-modal-backdrop"
    >
      <div
        ref={modalRef}
        className="w-full max-w-md transform rounded-lg bg-white p-6 shadow-lg transition-all duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
        data-cy="confirm-modal"
      >
        <div className="mb-4 text-center">
          <h3 className="text-lg font-medium text-gray-900" data-cy="confirm-modal-title">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-500" data-cy="confirm-modal-message">
            {message}
          </p>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            onClick={onCancel}
            data-cy="confirm-modal-cancel"
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
            onClick={onConfirm}
            data-cy="confirm-modal-confirm"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
