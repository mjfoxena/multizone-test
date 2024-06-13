import React from 'react'
import { animated, useSpring } from '@react-spring/web'

const SpringNum = ({ n}) => {
    const { number } = useSpring({
        from: { number: parseFloat(n) -43}, // Convert f to a number
        number: parseFloat(n), // Convert n to a number
        delay: 0,
        config: { mass: 1, tension: 20, friction: 10 }
    })

    return (
        <animated.div className=''>
            {number.to((n) => n.toFixed(0))}
        </animated.div>
    )
}

export default SpringNum
