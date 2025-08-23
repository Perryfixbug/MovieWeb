import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative">
      {/* Hero image */}
      <div className="relative h-[90vh] w-full overflow-hidden">
        <img
          src="https://images4.alphacoders.com/138/1385995.jpg"
          alt="Hero"
          className="w-full h-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(44, 44, 44, 0.3) 0%, rgba(44, 44, 44, 0.5) 70%, rgba(44, 44, 44, 1) 100%)",
          }}
        />
      </div>

      {/* Description */}
      <div className="description">

      </div>

      {/* Carousel */}
      <div className="carousel absolute bottom-20 right-0 flex justify-between px-5 mt-5 gap-2">
        {Array.from({ length: 5 }).map((_: any, index: number) => (
          <Card key={index} className="aspect-[4/3] min-w-12">
            <CardContent className="flex items-center justify-center"></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Hero;
