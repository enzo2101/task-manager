import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

const CarouselButtons: React.FC = () => {
  return (
    <div className="flex gap-4 justify-end">
      <Button
        className="bg-white rounded-full items-center flex justify-center"
        disabled
      >
        <ArrowLeft2 color="#ADB8CB" />
      </Button>
      <Button className="bg-white rounded-full items-center flex justify-center">
        <ArrowRight2 color="#ADB8CB" />
      </Button>
    </div>
  );
};

export default CarouselButtons;
