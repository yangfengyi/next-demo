import Rating from "react-rating"
import shallow from "zustand/shallow"
import { useDetailData } from "../../store/storeDetail"
import ReviewList from "./ReviewList"

export default function StoreDetial() {
  const detail = useDetailData(state => state.storeDetail, shallow)
  console.log(detail)

  const { name, stars, image } = detail
  return (
    <>
      <div className="flex flex-col p-6 border-b-2 lg:flex-row">
        <div className="lg:flex-1">
          <h1 className="text-3xl font-bold">{name}</h1>
          {/* @ts-ignore */}
          <Rating
            initialRating={stars}
            readonly
            className="mt-2"
          />
        </div>
        <img src={image} className='mt-4 lg:mt-0 lg:w-[600px]' />
      </div>
      <ReviewList />
    </>
  )
}