import { StoreItemType } from "../../store/type";
import Rating from "react-rating";
import Link from "next/link";

export default function StoreItem({ data }: { data: StoreItemType}) {
  const { image, title, price, stars } = data

  return (
    <li className="flex col-span-12 px-4 mt-8 lg:flex-col md:col-span-6 lg:col-span-3 auto-row-max">
      <img src={image} alt={title} className="w-[116px] h-[132px] lg:w-full lg:h-[228px] mr-3 object-fill" />
      <div className="flex flex-col justify-between flex-1 lg:mt-3">
        <div>
          <p className="text-xl font-bold">{title}</p>
          {/* @ts-ignore */}
          <Rating
            initialRating={stars}
            readonly
            className="mt-2"
          />
          <p>{price}</p>
        </div>
        <Link href='/store/detail'>
          <a
            href=""
            className="mt-3 text-xl text-gray-600 underline lg:text-center lg:bg-blue-700 lg:w-full lg:py-2 lg:text-white"
          >
            Learn more
          </a>
        </Link>
      </div>
    </li>
  )
}