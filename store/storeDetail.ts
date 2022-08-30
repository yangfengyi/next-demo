import axios from 'axios'
import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import StoreDetial from '../components/StoreDetail'

export type StoreDetailData = {
  name: string
  stars: number
  image: string
}

export type ReviewData = {
  image: string
  name: string
  stars: string
  text: string
}

export type StoreDetailStore = {
  storeDetail: StoreDetailData,
  review: ReviewData[]
}

const initState = {
  storeDetail: {
    name: '',
    stars: 0,
    image: '',
  },
  review: []
}

export const useDetailData = create(
  immer<StoreDetailStore>(() => ({
    ...initState
  }))
)

export function initStoreDetailData(id: string) {
  axios('/api/detail', { params: { id }})
    .then((res) => {
      const {detail, review} = res.data.data
      useDetailData.setState((state) => {
        state.storeDetail.name = detail?.name || ''
        state.storeDetail.stars = detail?.rating || ''
        state.storeDetail.image = detail?.image_url || ''
        state.review = (review?.reviews || []).map(
          (ele: any = {}) => ({
            text: ele.text || '',
            image: (ele.user && ele.user.image_url) || '',
            name: (ele.user && ele.user.name) || '',
            stars: ele.rating || 0
          })
        )
      })
    })
}