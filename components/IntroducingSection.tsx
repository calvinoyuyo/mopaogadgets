// *********************
// Role of the component: IntroducingSection with the text "Introducing Singitronic"
// Name of the component: IntroducingSection.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <IntroducingSection />
// Input parameters: no input parameters
// Output: Section with the text "Introducing Singitronic" and button
// *********************

import Link from "next/link";
import React from "react";

const IntroducingSection = () => {
  return (
    <div className="py-16 pt-20 bg-gradient-to-l from-white to-mopao-green">
      <div className="text-center flex flex-col gap-y-4 items-center">
        <h2 className="text-mopao-green text-6xl font-extrabold text-center mb-2 max-md:text-5xl max-[480px]:text-3xl font-roboto">
          WELCOME TO <span className="text-black">MOPAO</span><span className="text-mopao-green">!</span>
        </h2>
        <div>
          <p className="text-mopao-text text-center text-xl font-semibold max-md:text-lg max-[480px]:text-sm font-roboto">
            Your trusted source for premium electronics.
          </p>
          <p className="text-mopao-text text-center text-xl font-semibold max-md:text-lg max-[480px]:text-sm font-roboto">
            Quality gadgets for tech enthusiasts.
          </p>
          <Link href="/shop" className="block text-mopao-green bg-white font-bold px-10 py-2 text-lg hover:bg-mopao-grey w-80 mt-2  max-md:text-base max-md:w-60 max-[480px]:w-48 mx-auto font-roboto">
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroducingSection;
