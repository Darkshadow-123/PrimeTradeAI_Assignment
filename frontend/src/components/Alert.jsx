export default function Alert({ type = 'info', message, onClose }) {
  const bgColor = {
    info: 'bg-blue-100',
    success: 'bg-green-100',
    error: 'bg-red-100',
    warning: 'bg-yellow-100',
  };

  const textColor = {
    info: 'text-blue-800',
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
  };

  const borderColor = {
    info: 'border-blue-400',
    success: 'border-green-400',
    error: 'border-red-400',
    warning: 'border-yellow-400',
  };

  return (
    <div
      className={`border-l-4 p-4 rounded ${bgColor[type]} ${textColor[type]} ${borderColor[type]} flex justify-between items-center`}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-xl font-bold ml-4 hover:opacity-75"
        >
          ×
        </button>
      )}
    </div>
  );
}
