import StoreFilter from "../../components/StoreFilter";
import StoreFooter from "../../components/StoreFooter";
import StoreHeader from "../../components/StoreHeader";
import StoreList from "../../components/StoreList";
import StoreMessage from "../../components/StoreMessage";

export default function IndexPage() {

  return (
    <div className="flex flex-col min-h-[100vh]">
      <StoreHeader />
      <main className="w-full lg:w-[1200px] mx-auto flex-1">
        <StoreMessage />
        <StoreFilter />
        <StoreList />
      </main>
      <StoreFooter />
    </div>
  )
}