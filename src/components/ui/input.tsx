import * as React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  sizeType: string
  iconLeft?: React.ReactNode
}

export const Input = ({
  label,
  type,
  id,
  onChange,
  value,
  sizeType = 'sm',
  iconLeft,
  ...props
}: InputProps) => {
  return (
    <>
      {label ? (
        <div className="relative">
          <input
            type={type}
            id={id}
            className={`py-2 px-3 ${sizeType === 'sm' && 'w-[100px] text-center'} ${sizeType === 'md' && 'w-[200px] text-center'} ${sizeType === 'lg' && 'w-full'} font-medium text-white bg-blue border rounded-lg border-1 border-blue-light appearance-none focus:border-blue-light peer`}
            {...props}
            placeholder=" "
            value={value}
            onChange={onChange}
          />
          <label
            htmlFor={id}
            className="absolute flex  items-center text-sm text-white dark:text-gray-400 duration-300 z-0 transform -translate-y-4 scale-75 top-2 origin-[0] bg-blue dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            {iconLeft} {label}
          </label>
        </div>
      ) : (
        <div>
          <input
            type={type}
            id={id}
            data-sizetype={sizeType}
            className="py-2 px-3 data-[sizeType=sm]:w-[50px] data-[sizeType=md]:w-[200px] data-[sizeType=lg]:w-full font-medium text-white bg-blue border rounded-lg border-1 border-blue-light appearance-none focus:border-blue-light peer"
            {...props}
            placeholder=" "
            value={value}
            onChange={onChange}
          />
        </div>
      )}
    </>
  )
}
