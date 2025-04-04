import Header from '../components/Header'
import Footer from '../components/Footer'
import ShopComponent from '../components/ShopComponent'
import React from 'react'

const Shop = () => {
  return (
    <div className='mx-auto max-w-screen-xl font-poppins'>
      {/* <Header /> */}
      <main className='flex-grow'>
        <ShopComponent />
      </main>
      
    </div>
  )
}

export default Shop