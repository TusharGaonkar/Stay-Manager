import React from 'react';

type MainContentPropsType = {
  children: React.ReactNode;
};

export default function MainContent({ children }: MainContentPropsType) {
  return <div className="text-white flex-1">{children}</div>;
}
