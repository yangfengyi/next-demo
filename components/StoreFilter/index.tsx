import { Fragment } from "react"
import shallow from "zustand/shallow"
import { useStoreList } from "../../store"
import { PriceType } from "../../store/type"
import { Switch, Listbox, Transition  } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import CotFilter from "./CotFilter"

const selectValue = [
  {name: 'all'},
  {name: '$'},
  {name: '$$'},
  {name: '$$$'},
  {name: '$$$$'},
]

export default function StoreFilter() {
  const {
    isOpen,
    price,
    updateIsOpen,
    updatePrice
  } = useStoreList(state => ({
    isOpen: state.isOpen,
    price: state.price,
    updateIsOpen: state.updateIsOpen,
    updatePrice: state.updatePrice
  }), shallow)

  const handleChecked = (_e: boolean) => {
    updateIsOpen(_e)
  }

  const handleSelect = (name: PriceType | 'all') => {
    updatePrice(name === 'all' ? '' : name)
  }

  return (
    <div className="flex flex-col items-center px-4 py-5 lg:flex-row">
      <div className="flex flex-col flex-1 w-full lg:flex-row">
        <div className="relative z-10 flex items-start w-full lg:w-[400px]">
          <span className="mr-8 text-gray-600">Filter By:</span>
          <div className="flex items-center flex-1 pb-2 border-b-2">
            <Switch
              checked={isOpen}
              onChange={handleChecked}
              className={`${
                isOpen ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">
                Enable notifications
              </span>
              <span
                className={`${
                  isOpen ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white`}
              />
            </Switch>
            <span className="ml-2">Open Now</span>
          </div>
        </div>
        <div className="mt-4 w-full relative top-[-10px] z-20 lg:w-[200px] lg:mt-0 lg:ml-2">
          <Listbox value={ price } onChange={handleSelect}>
            <div className="relative mt-1">
              <Listbox.Button
                className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
              >
                <span className="block truncate">{!price ? 'all' : price}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {selectValue.map((item, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                        }`
                      }
                      value={item.name}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {item.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon className="w-5 h-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>

      <CotFilter />
    </div>
  )
}