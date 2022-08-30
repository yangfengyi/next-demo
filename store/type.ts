export type StoreItemType = {
  image: string
  id: string
  title: string
  description: string
  stars: number
  price: string
  isOpen: boolean
}

export type PriceType = '$' | '$$' | '$$$' | '$$$$' | ''

export interface StoreListInterface {
  isOpen: boolean
  price: PriceType
  categories: string
  isDataLoading: boolean
  total: number
  count: number
  offset: number
  hasMore: boolean
  storeList: StoreItemType[]
  updateCategories: (categories?: string) => void
  initStoreData: (categories?: string) => void
  loadMoreData: () => void
  updateIsOpen: (isOpen: boolean) => void
  updatePrice: (pirce: PriceType) => void
}
