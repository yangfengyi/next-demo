import { Fragment, useEffect, useState } from "react"
import shallow from "zustand/shallow"
import { useStoreList } from "../../store"
import { PriceType } from "../../store/type"
import { Switch, Listbox, Transition  } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, useTheme } from "@mui/material"

const names = [
  'All',
  'Active Life',
  'Arts & Entertainment',
  'Automotive',
  'Beauty & Spas',
  'Bicycles'
]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, cate: string[], theme: Theme) {
  return {
    fontWeight:
      cate.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export default function CotFilter() {
  const theme = useTheme();
  const [ cate, setCate] = useState<string[]>([])

  const updateCategories = useStoreList(state => state.updateCategories)
  const updateIsOpen = useStoreList(state => state.updateIsOpen)
  const updatePrice = useStoreList(state => state.updatePrice)

  const handleChange = (event: SelectChangeEvent<typeof cate>) => {
    const value = event.target.value as string[]

    if (value[value.length - 1] === 'All') {
      setCate(['All'])
    } else {
      if (value.length > 1 && value.includes('All')) {
        const result = value.filter(ele => ele !== 'All')
        setCate(result)
      } else {
        setCate(value)
      }
    }
  };

  const handleClear = () => {
    setCate(['All'])
    updateIsOpen(false)
    updatePrice('')
  }

  useEffect(() => {
    if (cate.includes('All')) {
      updateCategories('')
    } else {
      updateCategories(
        cate.map(ele => ele.replace(/\s+/g,'').toLowerCase()).join(',')
      )
    }
  }, [cate])

  return (
    <div className="flex flex-col w-full lg:flex-row lg:justify-between lg:items-center lg:ml-20">
      <div className="mt-4 w-full relative top-[-10px] z-10 lg:w-[300px] lg:h-[80px]">
        <FormControl sx={{ width: '100%', height: '100%' }}>
        <InputLabel id="demo-controlled-open-select-label">Categroy</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={cate}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, cate, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button
        color='primary'
        variant="contained"
        className='w-full bg-gray-600 lg:w-[120px] lg:h-[56px]'
        onClick={handleClear}
      >
        Clear
      </Button>
    </div>
  )
}