import { useRouter } from "next/router";
import { useEffect } from "react";
import StoreDetial from "../../components/StoreDetail";
import StoreFooter from "../../components/StoreFooter";
import StoreHeader from "../../components/StoreHeader";
import { initStoreDetailData } from "../../store/storeDetail";

export default function PageIndex() {
  const router = useRouter()
  const storeId = router.query.id as string

  useEffect(() => {
    if (!storeId) {
      return
    }
    initStoreDetailData(storeId)
  }, [storeId])

  return (
    <div className="flex flex-col min-h-[100vh]">
      <StoreHeader />
      <main className="w-full lg:w-[1200px] mx-auto flex-1">
        <StoreDetial/>
      </main>
      <StoreFooter />
    </div>
  )
}