import { ChangeEvent, useEffect, useState } from "react"
import shallow from "zustand/shallow"
import { useStoreList } from "../../store"
import { PriceType } from "../../store/type"


export default function StoreFilter() {
  const { updateIsOpen, updatePrice } = useStoreList(state => ({
    updateIsOpen: state.updateIsOpen,
    updatePrice: state.updatePrice
  }), shallow)

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    updateIsOpen(e.target.checked as boolean)
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    updatePrice(e.target.value as PriceType)
  }

  return (
    <div className="flex items-center px-4 py-5">
      <span className="mr-8 text-gray-600">Filter By:</span>
      <div className="flex flex-1 h-8 ">
        <div className="flex items-center">
          <input
            className="mr-2"
            type="checkbox"
            id="isopen"
            onChange={handleChecked}
          />
          <label htmlFor="isopen">
            open now
          </label>
        </div>
        <div className="flex ml-4">
          <select
            name="price"
            id="price"
            className="w-[200px] border-2"
            onChange={handleSelect}
          >
            <option value="">all</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
            <option value="$$$$">$$$$</option>
          </select>
        </div>
      </div>
    </div>
  )
}