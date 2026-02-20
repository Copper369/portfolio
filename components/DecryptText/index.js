import { useEffect, useState } from 'react'

const DecryptText = ({
    values = ['Empty'],
    delay = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const action = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % values.length);
    }, delay);

    return () => clearInterval(action);
  }, [values, delay]);

  return <>{values[currentIndex]}</>;
};

DecryptText.propTypes = {}

export default DecryptText