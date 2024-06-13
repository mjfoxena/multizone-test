import React, { useState } from 'react'
import VisibilitySensor from 'react-visibility-sensor';
import CountUp from "react-countup";
const CountUpComp = ({countStart,countEnd,decimal,...rest} ) => {
    const [viewPortEntered, setViewPortEntered] = useState(false);

    return (
        <CountUp start={countStart} end={countEnd} duration={1} decimals={decimal}>
        {({ countUpRef, start }) => (
            <VisibilitySensor onChange={start}>
                <span ref={countUpRef} />
            </VisibilitySensor>
        )}
     </CountUp>
    );
}

export default CountUpComp