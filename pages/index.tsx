import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <ul>
      <Link href='/wallet'>
        <li className='w-full h-20 flex justify-center items-center bg-blue-300 text-center border-2 cursor-pointer'>
          wallet demo
        </li>
      </Link>
      <Link href='/store'>
        <li className='w-full h-20 flex justify-center items-center bg-blue-300 text-center border-2 cursor-pointer'>
          store demo
        </li>
      </Link>
    </ul>
  )
}

export default Home
