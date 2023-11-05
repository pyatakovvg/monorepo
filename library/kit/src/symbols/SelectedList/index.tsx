import React from 'react';

import { ISelectedList } from './types';
import { OptionList } from './OptionList';

import st from './styles/default.module.scss';

export const SelectedList = <O extends Record<string, any> = {}>(props: ISelectedList<O>) => {
  function handleChange(valueByKey: any) {
    if (props.isMultiselect) {
      let currentValue = props.value;
      if (!(currentValue instanceof Array)) {
        currentValue = [];
      }
      const index = currentValue.indexOf(valueByKey);
      if (index >= 0) {
        props.onChange([...currentValue.slice(0, index), ...currentValue.slice(index + 1)]);
        return void 0;
      }
      props.onChange([...currentValue, valueByKey]);
      return void 0;
    }
    props.onChange(valueByKey);
  }
  return (
    <div className={st.wrapper}>
      {props.options.map((option) => {
        const value = option[props.optionValue];
        const valueByKey = option[props.optionKey];

        return (
          <div key={valueByKey} className={st.option}>
            {props.children && React.isValidElement(props.children) ? (
              React.cloneElement(props.children, option)
            ) : (
              <OptionList currentValue={valueByKey} value={props.value} onClick={() => handleChange(valueByKey)}>
                {value}
              </OptionList>
            )}
          </div>
        );
      })}
    </div>
  );
};
