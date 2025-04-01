import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { BEST_DEALS } from "@/constants/HeroCard";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { ReactComponent as Chocolate } from "@/img/chocolate.svg";
import { ReactComponent as Chocolate2 } from "@/img/chocolate2.svg";

const Hero = () => {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <div className="w-full relative min-h-[800px]">
      <div className="relative h-full">
        <div className="absolute top-0 left-0 right-0 z-10">
          <Chocolate className="w-full opacity-90" />
        </div>
        
        <div className="relative z-0 pt-80 pb-60">
          <div className="container mx-auto px-4">
            <div className="w-full flex flex-col items-center text-center space-y-16">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-bold text-amber-900 leading-tight mb-6">
                  Indulge in Luxury: <br/>Your Gateway to Premium Chocolate Treasures
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed">
                    Discover our exquisite collection of premium chocolate packages and gift sets, carefully curated from renowned chocolatiers worldwide. From elegant gift boxes to luxurious assortments, we bring you the finest chocolate selections perfect for every occasion. Whether you're searching for a special gift or treating yourself, explore our handpicked variety of artisanal chocolates from celebrated brands.
                </p>
              </div>

              <div className="w-full max-w-5xl relative">
                <Carousel
                  plugins={[plugin.current]}
                  className="w-full"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {BEST_DEALS.map((deal, index) => (
                      <CarouselItem key={deal.id} className="pl-2 md:pl-4">
                        <div className="p-6">
                          <Card className="w-full bg-white/90 shadow-xl border border-amber-100 hover:border-amber-300 transition-all duration-300 rounded-2xl overflow-hidden">
                            <CardContent
                              className={`flex flex-col md:flex-row items-center justify-between gap-10 p-8 ${
                                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                              }`}
                            >
                              {/* Image with Effect */}
                              <div className="relative group">
                                <img
                                  src={deal.image}
                                  alt={deal.title}
                                  className="w-[230px] h-[230px] md:w-[300px] md:h-[300px] object-contain rounded-xl transform transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>

                              {/* Text & Price Section */}
                              <div className="flex flex-col justify-center space-y-5 text-center md:text-left">
                                <h3 className="text-3xl font-bold text-amber-900">{deal.title}</h3>
                                <p className="text-lg text-gray-600 leading-relaxed">{deal.description}</p>
                                <div className="flex items-center justify-center md:justify-start gap-5">
                                  <span className="text-3xl font-semibold text-amber-800">{deal.price}</span>
                                  <span className="text-lg font-bold text-red-500 bg-red-50 px-5 py-2 rounded-full shadow-sm">
                                    {deal.discount}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <div className="absolute -left-16 -right-16 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                    <div className="pointer-events-auto">
                      <CarouselPrevious className="bg-white/95 shadow-md border border-amber-300 hover:bg-amber-50 transition-all duration-300 rounded-full w-12 h-12 flex items-center justify-center" />
                    </div>
                    <div className="pointer-events-auto">
                      <CarouselNext className="bg-white/95 shadow-md border border-amber-300 hover:bg-amber-50 transition-all duration-300 rounded-full w-12 h-12 flex items-center justify-center" />
                    </div>
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <Chocolate2 className="w-full opacity-90" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
