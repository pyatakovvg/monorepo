import React from 'react';

import { IDropDown } from './types';

import cn from 'classnames';
import st from './styles/default.module.scss';

interface IFindProps {
  type: React.FC;
}

interface IFind extends React.PropsWithChildren<IFindProps> {}

function Find({ children, type }: IFind) {
  const result: React.ReactNode[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === type) {
        return result.push(child);
      }
    }
  });
  if (!result[0]) {
    throw new Error('Not ' + type.name);
  }
  return result[0];
}

const Content = () => {
  return <p>Hello Content</p>;
};

const List = () => {
  return (
    <div>
      <p>Hello List</p>
      <p>Hello List</p>
      <p>Hello List</p>
      <p>Hello List</p>
      <p>Hello List</p>
      <p>Hello List</p>
      <p>Hello List</p>
      <p>Hello List</p>
      <p>Hello List</p>
      <p>Hello List</p>
      <p>Hello List</p>
    </div>
  );
};

export const DropDown = (props: IDropDown) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const controlRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!wrapperRef.current || !controlRef.current) {
      return void 0;
    }
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    console.log(wrapperRect, screen.availHeight);
    controlRef.current.style.top = wrapperRect.bottom + 'px';
    controlRef.current.style.left = wrapperRect.left + 'px';
  }, [wrapperRef, controlRef, isOpen]);

  function handleOpen() {
    setOpen(!isOpen);
  }

  return (
    <div ref={wrapperRef} className={st.wrapper}>
      <div className={st.content} onClick={() => handleOpen()}>
        <Find type={Content}>{props.children}</Find>
      </div>
      {isOpen && (
        <div ref={controlRef} className={st.control}>
          <div>
            <Find type={List}>{props.children}</Find>
          </div>
        </div>
      )}
    </div>
  );
};

DropDown.List = List;
DropDown.Content = Content;
