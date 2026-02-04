export default function Input({ 
  label, 
  icon, 
  error, 
  className = '', 
  ...props 
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full px-4 py-3 ${icon ? 'pl-12' : ''} border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
          {...props}
        />
        {icon && (
          <div className="absolute left-4 top-3.5 w-5 h-5 text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}