import React, { useState, useEffect, MouseEvent } from "react";
import { Heading } from "@medusajs/ui";
import { useRouter } from "next/navigation";
import Image from 'next/image'; // Import the Image component
import './Hero.css';

const features = [
  {
    imageSrc: "/transparent_bullockcart.png",
    description: "Sculptures Collections",
    link: "/collections/sculptures", // Add link for Sculptures feature
  },
  {
    imageSrc: "/transpareny_horsetoy.png",
    description: "Handcrafted Collections",
    link: "/collections/handcrafted/", // Add link for Handcrafted feature
  },
  {
    imageSrc: "",
    description: "Handcrafted Accessories",
    link: "/store", // No link for Handcrafted Accessories
  },
];

const Hero = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [screenWidth, setScreenWidth] = useState<number>(0); // State to store screen width
  const [screenHeight, setScreenHeight] = useState<number>(0); // State to store screen height
  const router = useRouter(); // Instantiate the router object

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  useEffect(() => {
    // Function to update screen width
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    // Update the screen width state when the component mounts
    handleResize();

    // Add an event listener to update the screen width when the window is resized
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once after the initial render

  const navigateToStore = () => {
    router.push('/store'); // Use router to navigate on click
  };

  return (
    <div className="h-auto border-b border-ui-border-base relative flex flex-col " style={{ fontFamily: "Avenir Next LT W02 Regular", background: "#F5F6FA", maxWidth: "100%" }}>
      <div className="flex flex-row hero-div">
        <div className="flex-1 flex flex-col gap-6 left-hero-div">
          <Heading className="mb-4 drop-shadow-md shadow-black hero-h1 pl-6" style={{ fontFamily: "Futura LT W01 Medium", lineHeight: "1.2em" }}>
            EXPERIENCE SERENITY
          </Heading>

          {/* Conditionally render this heading based on screen width */}
          {screenWidth >= 1200 && screenHeight >= 700 && (
            <Heading className="max-w-[32rem] mb-6 drop-shadow-md shadow-black hero-h2 pl-6" style={{ fontFamily: "Avenir Next LT W02 Regular", lineHeight: "1.2em" }} >
              Our crafts bring you home divinity, tranquility, and happiness.  <span className="store-link" onClick={navigateToStore}>Explore all products &#x2192;</span>
            </Heading>
          )}

<div className="flex w-full gap-6 hero-features ml-4">
  {features.map((feature, index) => (
    <div
      key={index}
      className="flex-1 flex cursor-pointer" // Added cursor-pointer class here
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      style={{ position: 'relative', transition: 'transform 0.3s ease' }}
    >
      {feature.imageSrc!=='' && (
        <div className="w-full" style={{ transform: hoveredIndex === index ? 'translateY(-10%)' : 'translateY(0)', display: "flex", justifyContent: "flex-end" }}>
        {/* Replace <img> with <Image> component */}
        <Image src={feature.imageSrc} alt={`Feature ${index + 1}`} width={60} height={50} />
      </div>
      )}
      
      <div className="w-full flex flex-col justify-center relative" style={{ transform: hoveredIndex === index ? 'translateY(-5px)' : 'translateY(0)' }}>
        <p className="hero-p ml-1" onClick={()=>router.push(feature.link)}
        style={{ overflowWrap: "break-word", overflow: "hidden" }}>
          {index === features.length - 1 ? 
         <span style={{fontWeight:"bold"}}>Explore more products &#x2192;</span> 
          : 
          feature.description
          }
          </p>
        <div className={`border-b border-black absolute bottom-0 left-1 w-full transition-transform transform ${hoveredIndex === index ? "underline-animation" : "underline-animation shrink"}`}></div>
      </div>
    </div>
  ))}
</div>

        </div>
        {/* Image Column (Right Half of Screen) */}
        <div className="right-div">
          <div onClick={navigateToStore} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} onMouseMove={handleMouseMove}>
            {/* Replace <img> with <Image> component */}
            <Image className="main-img" src="/ganesha_transparent.png" alt="Summer Styles" width={300} height={300} />
            {/* {showTooltip && (
              <span className="tooltip" style={{ left: tooltipPosition.x, top: tooltipPosition.y }}>Click to explore all products</span>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
