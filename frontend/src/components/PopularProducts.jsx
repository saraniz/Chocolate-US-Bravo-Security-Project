import React from 'react'
import { CHOCOLATE_LIST } from '@/constants/HeroCard'


const PopularProducts = () => {
  return (
    <div className='my-48 mx-32'>
      <div>
      <h2 className="text-3xl font-bold text-center mb-8">Popular Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHOCOLATE_LIST.map((chocolate) => (
          <div key={chocolate.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img 
              src={chocolate.image}
              alt={chocolate.name}
              className="w-full h-48 object-contain"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{chocolate.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-chocolate-500">{chocolate.price}</span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{chocolate.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default PopularProducts
