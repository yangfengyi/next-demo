import Web3Provider from "../../components/Web3Provider";
import Nav from "../../components/Nav";
import WalletConenct from "../../components/WalletConenct";
import MetaMaskMessage from "../../components/MetaMaskMessage";

export default function IndexPage() {

  return (
    <>
      <Web3Provider />
      <div className='h-[100vh] bg-gray-200 flex flex-col'>
        <header className="flex justify-between items-center w-full bg-red-300 h-[64px] px-20">
          <Nav />
          <WalletConenct />
        </header>
        <main>
          <MetaMaskMessage />
        </main>
      </div>
    </>
  )
}
