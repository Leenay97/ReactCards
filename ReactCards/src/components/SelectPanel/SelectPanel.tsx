import './SelectPanel.scss'
import type { SelectPanelProps } from '../../types/types'
import { useState } from 'react'

const SelectPanel = ({ onChangeSelected, pack }: SelectPanelProps) => {
    const [selected, setSelected] = useState('Y2L2')

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value)
        if (onChangeSelected) {
            onChangeSelected(e.target.value)
        }
    }

    return (
        <select value={selected} onChange={handleSelect}>
            {pack.map(item => (
                <option key={item.name} value={item.name}>{item.name}</option>
            ))}
        </select>
    )
}
export default SelectPanel