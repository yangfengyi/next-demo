import axios from 'axios'
import create from 'zustand'
import { PriceType, StoreListInterface } from './type'

const initStore = {
  isOpen: false,
  categories: '',
  price: '' as PriceType,
  isDataLoading: false,
  hasMore: false,
  total: 0,
  count: 20,
  offset: 0,
  storeList: []
}

function formatStoreList(data:any = {}) {
  return ({
    image: data.image_url || '',
    id: data.id || '',
    title: data.name || '',
    stars: data.rating || '',
    price: data.price || '',
    isOpen: !data.is_close || false
  })
}

export const useStoreList = create<StoreListInterface>((set, get) => ({
  ...initStore,
  initStoreData: async (categories?: string) => {
    set(() => ({ isDataLoading: true }))
    axios('/api/search', {
      params: {
        count: initStore.count,
        offset: initStore.offset,
        categories: categories || ''
      }
    })
      .then((res) => {
        const { total = 0, businesses =[] } = res.data.data as unknown as any
        console.log(total, businesses.length)
        set(() => ({
          count: total,
          hasMore: businesses.length < total,
          storeList: businesses.map(formatStoreList),
        }))
      })
      .finally(() => {
        set(() => ({ isDataLoading: false }))
      })
  },
  loadMoreData: async() => {
    set(() => ({ isDataLoading: true }))
    const categories = get().categories
    axios('/api/search', {
      params: {
        count: initStore.count,
        offset: initStore.offset + 20,
        categories: categories
      }
    })
      .then((res) => {
        const { businesses =[] } = res.data.data as unknown as any
        
        set((state) => {
          const data = state.storeList.concat(businesses.map(formatStoreList))

          return ({
            hasMore: data.length < state.count,
            storeList: data
          })
        })
      })
      .finally(() => {
        set(() => ({ isDataLoading: false }))
      })
  },
  updateIsOpen: (isOpen: boolean) =>set({ isOpen: isOpen }),
  updatePrice: (price: PriceType) => set({ price: price }),
  updateCategories: (categories?: string) => set({ categories })
}))