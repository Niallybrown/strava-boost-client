import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

interface Props {
  onChange: (val: string) => void;
  options: string[];
}

const PRSelect = ({ onChange, options }: Props) => {
  const handleChange = (value: string) => {
    onChange(value);
  };
  return (
    <>
      <Select style={{ width: 120 }} onChange={handleChange}>
        {options.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default PRSelect;
