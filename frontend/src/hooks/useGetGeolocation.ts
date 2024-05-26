import { useEffect, useRef, useState } from "react";

const useGetGeolocation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<number[]>([0, 0]);
  const ref = useRef(false);

  useEffect(() => {
    const setDefaultPosition = () => {
      /*
       * 1081 Fulton St
       * San Francisco, CA 94117, United States
       */
      if (!ref.current) {
        ref.current = true;
        setPosition([37.7749, -122.4194]);
        setLoading(false);
      }
    };

    setLoading(true);
    if (navigator.geolocation && position[0] === 0) {
      setTimeout(() => {
        setDefaultPosition();
      }, 3000);

      navigator.geolocation.getCurrentPosition(
        (geoPosition) => {
          if (!ref.current) {
            ref.current = true;
            setPosition([
              geoPosition.coords.latitude,
              geoPosition.coords.longitude,
            ]);
            setLoading(false);
          }
        },
        (error) => {
          setDefaultPosition();
          console.error("Error getting the user's location: ", error);
        }
      );
    } else {
      setDefaultPosition();
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return { position, loading };
};

export { useGetGeolocation };
