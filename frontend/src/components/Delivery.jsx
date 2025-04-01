import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faGift, faGlobeAsia, faTemperatureLow, faShieldAlt, faClock } from "@fortawesome/free-solid-svg-icons";

const Delivery = () => {
    return (
        <div className="my-24 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Delivery Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="text-4xl text-chocolate-500 mb-4">
              <FontAwesomeIcon icon={faTruck} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Island-wide Delivery</h3>
            <p className="text-gray-600">Fast delivery across Sri Lanka within 2 working days</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="text-4xl text-chocolate-500 mb-4">
              <FontAwesomeIcon icon={faGift} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Gift Wrapping</h3>
            <p className="text-gray-600">Beautiful gift wrapping service available for special occasions</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="text-4xl text-chocolate-500 mb-4">
              <FontAwesomeIcon icon={faGlobeAsia} />
            </div>
            <h3 className="text-xl font-semibold mb-2">International Shipping</h3>
            <p className="text-gray-600">We deliver our chocolates worldwide with special packaging</p>
          </div>

        </div>

        <div className="mt-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="lg:w-1/2">
            <img 
              src="/src/img/2.jpg" 
              alt="Delivery Service" 
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h3 className="text-2xl font-bold mb-4">Premium Delivery Experience</h3>
            <p className="text-gray-600 mb-6">
              We ensure your chocolates arrive in perfect condition with our temperature-controlled packaging and professional delivery service. Whether it's a gift for a loved one or a treat for yourself, we handle your order with utmost care.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faTemperatureLow} className="text-chocolate-500 mr-2" />
                <span>Temperature Controlled</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faShieldAlt} className="text-chocolate-500 mr-2" />
                <span>Secure Packaging</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faClock} className="text-chocolate-500 mr-2" />
                <span>Real-time Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Delivery;
