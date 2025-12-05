import Button from './Button'

const Modal = ({ isOpen, title, children, onClose, onSubmit, submitText = 'Save', closeText = 'Cancel' }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            {closeText}
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            {submitText}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
