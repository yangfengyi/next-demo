import shallow from "zustand/shallow"
import { useDetailData } from "../../store/storeDetail"
import Rating from "react-rating"

export default function ReviewList() {
  const review = useDetailData((state) => state.review, shallow)
  return (
    <ul className="grid grid-cols-12 p-4">
      {review.map((item) => {
        const { name, image, stars, text } = item
        return (
          <li className="flex flex-col col-span-12 mt-4 lg:flex-row lg:mt-20" key={name}>
            <div className="flex lg:flex-1">
              <div className="w-20 h-20 mr-4 overflow-hidden bg-gray-600">
                <img src={image} className='object-fill' />
              </div>
              <div>
                <h2 className="text-xl">{name}</h2>
                {/* @ts-ignore */}
                <Rating initialRating={stars} readonly className="mt-4" />
              </div>
            </div>
            <p className="lg:w-[800px] mt-4 lg:mt-0">{text}</p>
          </li>
        )
      })}
    </ul>
  )
}