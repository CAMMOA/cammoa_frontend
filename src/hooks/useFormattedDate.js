import { useState } from 'react';

const useFormattedDate = () => {
  const [value, setValue] = useState('');

  const handleDateChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 8) input = input.slice(0, 8);

    if (input.length > 4 && input.length <= 6) {
      input = input.slice(0, 4) + '  /  ' + input.slice(4);
    } else if (input.length > 6) {
      input = input.slice(0, 4) + '  /  ' + input.slice(4, 6) + '  /  ' + input.slice(6);
    }

    setValue(input);
  };

  return { value, handleDateChange };
};

export default useFormattedDate;
