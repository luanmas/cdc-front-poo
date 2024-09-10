import Checkbox from '@/components/Checkbox'
import { RenderCellProps } from '../types'
import Select from '@/components/SelectInput'
import { Input } from '@/components/ui/input'

export function RenderCell<T>({
  value,
  columnType,
  onChange,
  brandId,
}: RenderCellProps<T>) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (/^\d*$/.test(newValue)) {
      onChange(newValue)
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex
    const updatedOptions =
      value instanceof Array &&
      value.map((option, index) => ({
        ...option,
        selected: index === selectedIndex,
      }))
    onChange(updatedOptions)
  }

  switch (columnType) {
    case 'input':
      return (
        <Input
          sizeType="sm"
          type="text"
          value={value as string}
          onBlur={handleInputChange}
          onChange={handleInputChange}
          className="bg-gray-light w-[50px] text-center border border-white rounded-md py-1"
        />
      )

    case 'radio':
      return (
        <Checkbox
          onBlur={handleCheckboxChange}
          onChange={handleCheckboxChange}
          value={value as boolean}
        />
      )

    case 'select':
      if (Array.isArray(value)) {
        return (
          <Select
            className="bg-gray-light border border-white"
            onChange={handleSelectChange}
          >
            {value.map((option, index) => (
              <option
                key={index}
                value={option.name}
                selected={
                  brandId !== undefined && Number(brandId) === Number(option.id)
                }
                className="bg-white text-gray-dark"
              >
                {option.name}
              </option>
            ))}
          </Select>
        )
      }
      break

    default:
      return <>{value}</>
  }
}
