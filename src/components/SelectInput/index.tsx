import { ChangeEvent, ReactNode } from 'react'

interface SelectProps {
  children: ReactNode
  label?: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  className?: string
  id: string
}

export default function Select({
  children,
  onChange,
  className,
  label,
  id,
}: SelectProps) {
  return (
    <div className="relative">
      <select
        onChange={onChange}
        id={id}
        className={`py-2 px-3 font-medium text-white bg-blue border rounded-lg border-1 border-blue-light appearance-none focus:border-blue-light peer ${className}`}
      >
        {children}
      </select>
      {label && (
        <label
          htmlFor={id}
          className="absolute px-2 text-blue-light text-base duration-300 z-0 transform -translate-y-4 scale-75 top-2 origin-[0] bg-blue dark:bg-gray-900 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          {label}
        </label>
      )}
    </div>
  )
}
