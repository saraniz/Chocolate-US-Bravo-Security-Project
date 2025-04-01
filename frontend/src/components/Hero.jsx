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

const Hero = () => {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="w-full my-10">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {BEST_DEALS.map((deal, index) => (
            <CarouselItem key={deal.id} className="w-full">
              <div className="p-2">
                <Card className="w-full bg-muted">
                  <CardContent
                    className={`flex flex-col md:flex-row items-centerjustify-between mx-4 md:mx-48 gap-4 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-[250px] h-[250px] object-contain rounded-lg md:w-[300px] md:h-[300px]"
                    />

                    <div className="text-center md:text-left flex flex-col justify-center">
                      <h3 className="text-xl font-bold">{deal.title}</h3>
                      <p className="text-sm text-gray-500">{deal.description}</p>
                      <span className="text-lg font-semibold mt-2">{deal.price}</span>
                      <span className="text-red-500 font-bold">{deal.discount}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="w-full flex flex-col items-center justify-center my-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          Indulge in Premium Chocolate Delights
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-4xl">
          Discover our exquisite collection of handcrafted chocolates, made with the finest ingredients. From classic truffles to unique flavor combinations, we offer the perfect sweet escape for every occasion.
        </p>
      </div>
    </div>
  );
};

export default Hero;
