import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faGlobe, 
  faTruck, 
  faGift, 
  faStore, 
  faLeaf, 
  faHeart,
  faStar,
  faAward
} from "@fortawesome/free-solid-svg-icons";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      
      <div className="relative h-[400px] w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-chocolate-500/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1575377427642-087cf684f29d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
          alt="Chocolate assortment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Bringing the world's finest chocolates to your doorstep
            </p>
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-6">Welcome to Chocolate Bravo</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023 in Maharagama, Colombo, Chocolate Bravo has quickly become a premier destination for chocolate lovers worldwide. We specialize in sourcing the finest chocolates from around the globe and presenting them in beautiful gift packages that delight the senses.
              </p>
              <p className="text-gray-600">
                Our journey began with a simple mission: to bring the world's most exquisite chocolates to Sri Lanka and share them with chocolate enthusiasts everywhere. Today, we're proud to be a trusted name in premium chocolate retail and gifting.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Chocolate shop interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

       
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-900 mb-12 text-center">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-chocolate-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faGlobe} className="text-black text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">Global Sourcing</h3>
              <p className="text-gray-600">
                We source premium chocolates from renowned chocolatiers worldwide, ensuring the highest quality and authentic flavors.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-chocolate-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faGift} className="text-black text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">Gift Packaging</h3>
              <p className="text-gray-600">
                Our expert team creates stunning gift packages perfect for any occasion, from corporate events to personal celebrations.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-chocolate-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faTruck} className="text-black text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Enjoy quick delivery within 2 days across Sri Lanka and reliable international shipping to destinations worldwide.
              </p>
            </div>
          </div>
        </section>

        
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-chocolate-500 rounded-full flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon icon={faLeaf} className="text-amber-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Quality First</h3>
                <p className="text-gray-600">
                  We are committed to sourcing only the finest quality chocolates, ensuring every product meets our high standards.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-chocolate-500 rounded-full flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon icon={faHeart} className="text-amber-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Customer Satisfaction</h3>
                <p className="text-gray-600">
                  Your satisfaction is our priority. We go above and beyond to ensure every customer has a delightful experience.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-chocolate-500 rounded-full flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon icon={faStar} className="text-amber-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every aspect of our business, from product selection to customer service.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-chocolate-500 rounded-full flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon icon={faAward} className="text-amber-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Trust & Reliability</h3>
                <p className="text-gray-600">
                  Building trust through reliable service and consistent quality is at the heart of everything we do.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-neutral-50 rounded-lg p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-4">Our Online Marketplace</h2>
              <p className="text-gray-600 mb-6">
                Experience the convenience of shopping for premium chocolates from the comfort of your home. Our online marketplace offers:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faStore} className="text-chocolate-500" />
                  <span>Wide selection of international chocolates</span>
                </li>
                <li className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faGift} className="text-chocolate-500" />
                  <span>Customizable gift packages</span>
                </li>
                <li className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faTruck} className="text-chocolate-500" />
                  <span>Fast and reliable delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faGlobe} className="text-chocolate-500" />
                  <span>Worldwide shipping options</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Online shopping experience"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        
        <section className="text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">Join Our Chocolate Journey</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're looking for the perfect gift or treating yourself to premium chocolates, we're here to make your experience special. Explore our collection today!
          </p>
          <Button className="cursor-pointer">
            <Link to="/shop">
            Shop Now
            </Link>
            
          </Button>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;