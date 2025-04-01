import React from 'react'
import { CHOCOLATE_LIST } from '@/constants/HeroCard'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from 'react-router-dom'

const PopularProducts = () => {
  return (
    <div className='my-48 mx-10 md:mx-32'>
      <h2 className="text-3xl font-bold text-center mb-8">Popular Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {CHOCOLATE_LIST.map((chocolate) => (
          <Link to={`/product/${chocolate.id}`} key={chocolate.id}>
            <Card className="hover:shadow-lg transition duration-300 cursor-pointer">
              <CardHeader>
                <img 
                  src={chocolate.image}
                  alt={chocolate.name}
                  className="w-full h-48 object-contain"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-semibold mb-2">{chocolate.name}</CardTitle>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-chocolate-500">{chocolate.price}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{chocolate.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PopularProducts
