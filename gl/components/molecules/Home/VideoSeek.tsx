import { useEffect, useRef } from "react"

export const VideoSeekPlay = ({src, autoPlay=false}) => {
    
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(()=>{
        if(autoPlay && videoRef.current){
            videoRef.current.autoplay = true
        }
    },[autoPlay])

    
    return <div>
        <video ref={videoRef} autoPlay controls loop muted>
            <source src={src} />
        </video>
    </div>
}

 