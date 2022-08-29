export default function StoreHeader() {
  return (
    <header className="sticky top-0 z-50 bg-blue-500">
      <div
        className="flex items-center justify-between h-20 px-2 lg:w-[1200px] mx-auto"
      >
        <div className="w-10 h-10 bg-black rounded-full" />
        
        <nav className="flex">
          <div className="h-8 w-[80px] bg-gray-600 ml-2"></div>
          <div className="h-8 w-[80px] bg-gray-600 ml-2"></div>
          <div className="h-8 w-[80px] bg-gray-600 ml-2"></div>
        </nav>
      </div>
    </header>
  )
}