interface CheckboxProps {
  value: boolean
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Checkbox({ value, onBlur, onChange }: CheckboxProps) {
  return (
    <input
      className="relative text-center h-[1.125rem] w-[1.125rem] appearance-none rounded-full border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:bg-blue-light cursor-pointer"
      type="checkbox"
      checked={value}
      onBlur={onBlur}
      onChange={onChange}
    />
  )
}
