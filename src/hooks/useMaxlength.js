import { useState } from 'react';

const useLimitedInput = (maxLength) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setValue(newValue);
    }
  };

  return [value, handleChange]; // 필요 시 length도 반환
};

export default useLimitedInput;
