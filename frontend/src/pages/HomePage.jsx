import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PopularProducts from '@/components/PopularProducts'
import React from 'react'

const HomePage = () => {
  return (
    <div className='mx-auto px-4 max-w-screen-xl font-poppins'>
      <Header />
      <Hero />
      <PopularProducts />
      <Footer />
    </div>
  )
}

export default HomePage
