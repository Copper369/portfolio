import { useEffect, useState } from 'react'

const DecryptText = ({
    values = ['Empty'],
    delay = 3000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(true);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

  useEffect(() => {
    const targetText = values[currentIndex];
    let iteration = 0;
    
    const decryptInterval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= targetText.length) {
        clearInterval(decryptInterval);
        setIsDecrypting(false);
      }

      iteration += 1 / 3;
    }, 30);

    const changeTextTimeout = setTimeout(() => {
      setIsDecrypting(true);
      setCurrentIndex((prev) => (prev + 1) % values.length);
    }, delay);

    return () => {
      clearInterval(decryptInterval);
      clearTimeout(changeTextTimeout);
    };
  }, [currentIndex, values, delay]);

  return <>{displayText || values[0]}</>;
};

DecryptText.propTypes = {}

export default DecryptText