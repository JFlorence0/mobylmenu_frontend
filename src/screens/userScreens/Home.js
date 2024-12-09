import React, { useEffect } from 'react';
import Footer from '../../components/Footer';

import '../../styles/homeStyles/UserHome.css';
import '../../styles/homeStyles/UserHomeImageStyles.css';

const Home = () => {
    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
        if (!reduceMotion) {
          const handleScroll = () => {
            const scrollPosition = window.scrollY;
    
            // Bubble 1: Rotate
            const bubble1 = document.getElementById('bubble');
            if (bubble1) bubble1.style.transform = `rotate(${scrollPosition * 0.1}deg)`;
    
            // Bubble 4: Move down and rotate
            const bubble4 = document.getElementById('bubble4');
            if (bubble4) bubble4.style.transform = `translateY(${scrollPosition * 0.08}px) rotate(${scrollPosition * 0.1}deg)`;
    
            // Bubble 9: Move up and rotate
            const bubble9 = document.getElementById('bubble9');
            if (bubble9) bubble9.style.transform = `translateY(${-scrollPosition * 0.1}px) rotate(${scrollPosition * 0.05}deg)`;
    
            // Bubble 10: Move up and to the left
            const bubble10 = document.getElementById('bubble10');
            if (bubble10) bubble10.style.transform = `translate(${scrollPosition * 0.1}px, ${-scrollPosition * 0.1}px)`;
    
            // Bubble 5: Move up
            const bubble5 = document.getElementById('bubble5');
            if (bubble5) bubble5.style.transform = `translateY(${-scrollPosition * 0.1}px)`;
    
            // Bubble 6: Move up and to the right, and rotate
            const bubble6 = document.getElementById('bubble6');
            if (bubble6) bubble6.style.transform = `translate(${scrollPosition * 0.05}px, ${-scrollPosition * 0.05}px) rotate(${scrollPosition * 0.05}deg)`;
    
            // Cherry 2: Move up and to the right, and rotate
            const cherry2 = document.getElementById('cherries2');
            if (cherry2) cherry2.style.transform = `translate(${scrollPosition * 0.05}px, ${-scrollPosition * 0.05}px) rotate(${scrollPosition * 0.01}deg)`;
    
            // Bubble 8: Move down and rotate
            const bubble8 = document.getElementById('bubble8');
            if (bubble8) bubble8.style.transform = `translateY(${scrollPosition * 0.08}px) rotate(${scrollPosition * 0.1}deg)`;
    
            // Donut: Move down and rotate
            const donut = document.getElementById('donut');
            if (donut) donut.style.transform = `translateY(${scrollPosition * 0.08}px) rotate(${-scrollPosition * 0.1}deg)`;
    
            // Bubble 7: Rotate clockwise on scroll
            const bubble7 = document.getElementById('bubble7');
            if (bubble7) bubble7.style.transform = `rotate(${scrollPosition * 0.1}deg)`;
          };
    
          document.addEventListener('scroll', handleScroll);
    
          return () => {
            document.removeEventListener('scroll', handleScroll);
          };
        }
    
        // Show "Back to Top" button logic
        const handleBackToTopVisibility = () => {
          const backToTopButton = document.getElementById('back-to-top');
          if (backToTopButton) {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
              backToTopButton.style.display = 'block';
            } else {
              backToTopButton.style.display = 'none';
            }
          }
        };
    
        window.onscroll = handleBackToTopVisibility;
    
        return () => {
          window.onscroll = null;
        };
      }, []);
    
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
  
    return (
      <main className="main-container consumer-home">
        {/* Bubble Images */}
        <img id="bubble" src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/bubble-img.webp" alt="" />
        <img id="bubble2" src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/bubble-img.webp" alt="" />
        <img id="bubble3" src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/bubble-img.webp" alt="" />
        <img id="bubble4" src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/bubble-img.webp" alt="" />
        <img id="bubble5" src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/bubble-img.webp" alt="" />
        <img id="bubble6" src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/bubble-img.webp" alt="" />
        <img id="bubble7" src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/bubble-img.webp" alt="" />
        <img id="bubble8" src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/bubble-img.webp" alt="" />
        <img id="bubble9" src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/bubble-img.webp" alt="" />
        <img id="bubble10" src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/bubble-img.webp" alt="" />
  
        {/* Other Images */}
        <img id="main-phone2" src="https://mobyl-menu-bucket.s3.us-east-1.amazonaws.com/MM-Images/home-long-2.webp" alt="MobylMenu App phone mockup" />
        <img id="cupcake" src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/cupcake.webp" alt="Cupcake with sprinkles" />
        <img id="cherries" src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/cherries.webp" alt="Cherry Image" />
        <img id="cherries2" src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/cherries.webp" alt="Cherry Image" />
        <img id="m-baloon" src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/M-baloon.webp" alt="Baloon Image" />
        <img id="donut" src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/donut.webp" alt="A donut with sprinkles" />
  
        {/* Text Section */}
        <section className="text-container" aria-labelledby="find-food">
          <h1 className="business">FIND FOOD NEARBY WITH MENUS & PHOTOS</h1>
          <h3 className="business b-paragraph">
            Easily find the best restaurants near you with MobylMenu. Browse detailed menus and photos to discover new dining options in your area and see what’s available around you.
          </h3>
          <a id="open-app" href="https://apps.apple.com/us/app/mobylmenu/id6445874189">Open The App</a>
        </section>
  
        {/* Second Text Section */}
        <section className="second-container-landing" aria-labelledby="showcase-menu">
          <div className="text-container" id="less-margin">
            <h2 className="business">SHOWCASE YOUR MENU FOR FREE</h2>
            <h3 className="business b-paragraph">
              Create a vibrant, photo-filled menu with free QR codes for easy in-restaurant access. Attract new customers by allowing them to view your pictures and menu before they order.
            </h3>
            <a id="open-app" href="/get-started">Get Started</a>
          </div>
          <img id="main-phone" src="https://mobyl-menu-bucket.s3.us-east-1.amazonaws.com/MM-Images/home-long-2.webp" alt="MobylMenu App phone" />
        </section>
  
        {/* Back to Top Button */}
        <div className="button-container">
          <button onClick={scrollToTop} aria-label="Back to top">
            Back to Top <span className="arrow" tabIndex="0">↑</span>
          </button>
        </div>
        <Footer />
      </main>
    );
  };

export default Home;