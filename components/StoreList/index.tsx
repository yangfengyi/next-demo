import { useStoreList } from "../../store";
import StoreItem from "./StoreItem";
import shallow from 'zustand/shallow'
import { useEffect } from "react";
import { StoreItemType } from "../../store/type";

export default function StoreList() {
  const {
    price,
    isOpen,
    categories,
    storeList,
    initStoreData,
    hasMore,
    isDataLoading,
    loadMoreData
  } = useStoreList(state => ({
    price: state.price,
    isOpen: state.isOpen,
    categories: state.categories,
    storeList: state.storeList,
    initStoreData: state.initStoreData,
    hasMore: state.hasMore,
    isDataLoading: state.isDataLoading,
    loadMoreData: state.loadMoreData,
  }), shallow)

  useEffect(() => {
    initStoreData(categories)
  }, [ categories ])

  const getFilterData = () => {
    const openData = isOpen ? storeList.filter(ele => ele.isOpen) : storeList
    const filterData = price !== '' ? openData.filter(ele => (ele.price === price) || !ele.price) : openData
    return filterData
  }

  return (
    <>
      <div>
        <h2 className="px-4 mt-2 text-3xl">All Restaurants</h2>
        <ul className="grid grid-cols-12">
          {getFilterData().map((dataItem: StoreItemType) => {
            return (
              <StoreItem key={dataItem.id} data={dataItem} />
            )
          })}
        </ul>
      </div>
      {hasMore && !isDataLoading && (
        <button
          className="flex px-12 py-2 mx-auto mt-12 text-white bg-blue-500"
          onClick={loadMoreData}
        >
          Load More
        </button>
      )}
      {isDataLoading && (
        <p className="h-[200px] flex items-center justify-center">Loading...</p>
      )}
    </>
  )
}