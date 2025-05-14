
import React from "react";

export const ScrollAnimationScript = () => {
  return (
    <script dangerouslySetInnerHTML={{
      __html: `
        document.addEventListener('DOMContentLoaded', function() {
          // Initialize citation bloom animation
          setTimeout(() => {
            document.querySelector('.citation-bloom')?.classList.add('active');
          }, 500);
          
          // Initialize scroll animations
          const scrollElements = document.querySelectorAll('.scroll-fade-in');
          const handleScroll = () => {
            scrollElements.forEach(el => {
              const rect = el.getBoundingClientRect();
              const isVisible = (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
                rect.bottom >= 0
              );
              
              if (isVisible) {
                el.classList.add('visible');
              }
            });
          };
          
          // Initial check
          handleScroll();
          
          // Add event listener for scroll
          window.addEventListener('scroll', handleScroll);
        });
      `
    }} />
  );
};
