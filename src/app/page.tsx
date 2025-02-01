'use client'; // Add client directive to enable client-side rendering

import React, { useState, useEffect } from 'react';
import "./css/topbar.css";
import "./css/mainImg.css";
import "./css/Homeconfig.css";
let nowtime_ms = Date.now();

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slides = document.querySelector('.slides') as HTMLElement;
    const dots = document.querySelectorAll('.dot');

    function showSlide(index: number): void {
      if (slides) {
        slides.style.transform = `translateX(${-index * 33.33333}%)`;
      }

      dots.forEach((dot) => dot.classList.remove('active'));
      (dots[index] as HTMLElement).classList.add('active');
    }

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        nowtime_ms = Date.now();
        setCurrentIndex(index);
        showSlide(index);
      });
    });

    // Auto-advance slideshow
    const intervalId = setInterval(() => {
      if (Date.now() - nowtime_ms > 5000) {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % dots.length;
          showSlide(newIndex);
          return newIndex;
        });
      }
    }, 5000);

    // Cleanup function to remove event listeners and interval
    return () => {
      dots.forEach((dot) => {
        dot.removeEventListener('click', () => {});
      });
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="container">
      <div className="topbar">
        <div className="logo">
          <h2>美術</h2>
        </div>
        <div className="menu">
          <a href='/'><span>MEMBER</span></a>
          <a href='/'><span>WORKS</span></a>
          <a href='/'><span>NEWS</span></a>
          <a href='/'><span></span></a>
        </div>
      </div>
      <div className="main-img">
        <div className="slider">
          <div className="slides">
            <div className="slide red"></div>
            <div className="slide blue"></div>
            <div className="slide green"></div>
          </div>
          <div className="dots">
            <span className="dot" data-index="0"></span>
            <span className="dot" data-index="1"></span>
            <span className="dot" data-index="2"></span>
          </div>
        </div>
      </div>
    </div>
  );
}