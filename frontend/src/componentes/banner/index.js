import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import "./banner.css";
import bannerImage from "../imagens/esteticistabanner.jpg";

export default function Banner() {
  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 120, friction: 200 },
  });

  return (
    <div className="banner">
      <animated.img src={bannerImage} alt="banner" style={springProps} />
    </div>
  );
}
