import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

interface NumberProps {
  number: string;
}

const myObject: { totalValue: string } = {
  totalValue: ''
};

const NumberAnimation: React.FC<NumberProps> = ({number}) => {
  const [total, setTotal] = useState<string>(number);

  useEffect(() => {
    gsap.to(myObject, 0.5, {
      totalValue: number,
      roundProps: "totalValue",
      onUpdate: () => {
        setTotal(myObject.totalValue);
      }
    });
  }, [number]);

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6 alert alert-dark text-center">
        {total}
      </div>
    </div>
  );
};

export default NumberAnimation;