import React from 'react'
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import '@fortawesome/fontawesome-free/css/all.css';

const HomePage = () => {
  useEffect(() => {
    let current = 0;
    const cards = document.querySelectorAll('.product-card');

    const shiftCenter = () => {
      cards.forEach(card => card.classList.remove('center'));
      cards[current].classList.add('center');
      current = (current + 1) % cards.length;
    };

    if (cards.length > 0) {
      cards[0].classList.add('center');
      const intervalId = setInterval(shiftCenter, 2000);

      return () => clearInterval(intervalId); 
    }
  }, []);

  return (
    <>
    <div className='body'>
      <div className="hero vh-100  container-fluid">
        <div className="row">
          <div className="col">
            <div className="circle"></div>
            <img className="m-5" src='src\img\Chocolate Collection.png' alt="Chocolate Collection" />
          </div>
          <div className="col m-5 p-5">
            <p className="h1">"A <span className="highlight">CHOCOLATE</span> CAN <br /> CHANGE YOUR MOOD"</p>
            <button id='btnn' className="btn">SHOP NOW</button>
          </div>
        </div>
      </div>

      <div className="container-fluid position-relative p-5 hero1">
        <div className="row">
          <div className="col text-white">
            <p>
              "Chocolate, especially dark chocolate, offers a range of health benefits that make it more than just a sweet treat. Packed with antioxidants like flavonoids, it helps protect the body against aging and supports heart health by lowering blood pressure and improving blood flow. 
              Eating chocolate can also lift your mood, as it stimulates the release of endorphins, creating feelings of happiness and reducing stress thanks to its magnesium content. It even benefits brain function, as compounds like caffeine and theobromine enhance alertness and mental clarity. In moderation, chocolate can curb cravings, aiding in weight management, and its flavonoids improve skin health by increasing blood flow and providing some sun protection. So, a little indulgence in chocolate can be both satisfying and beneficial!
            </p>
            <h5>Chocolate is one of the best </h5>
            <h1>'STRESSBUSTER'</h1>
          </div>
          <div className="col">
            <img className="img2 position-absolute" src='src\img\Dairy Milk.png' alt="Dairy Milk" />
          </div>
        </div>
      </div>

      <div className="text-center hero2">
        <h2 className="">TOP SELLERS</h2>
        <div id="carousel" className="d-flex justify-content-around pt-5 pb-4 align-items-center">
          <div className="product-card root">
            <img src='src\img\Dairy Milk.png' alt="Snickers" className="product-img" />
            <h5 className="mt-3">Snickers</h5>
            <p><del>Rs. 290</del> Rs. 200</p>
          </div>
          <div className="product-card root">
            <img src='src\img\Kitkat.png' alt="Kit Kat" className="product-img" />
            <h5 className="mt-3">Kit Kat</h5>
            <p>Rs. 300</p>
          </div>
          <div className="product-card root">
            <img src='src\img\Twix.png' alt="Twix" className="product-img" />
            <h5 className="mt-3">Twix</h5>
            <p>Rs. 300</p>
          </div>
        </div>
      </div>

      <div className="container-fluid hero3">
        <div className="row">
          <div className="col p-5 text-white fs-2 mx-3">
            <p>Treat your favourite person with a <br /> <span className="h1"> Chocolate </span> <br /> and make their day awesome!</p>
            <button id='btnn' className="btn">SHOP NOW</button>
          </div>
          <div className="col">
            <img className="img6" src='src\img\Milk.png' alt="Milk" />
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default HomePage
