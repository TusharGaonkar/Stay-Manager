import React from 'react';

type MainContentPropsType = {
  children: React.ReactNode;
};

export default function MainContent({ children }: MainContentPropsType) {
  return <div className="flex-1 text-white">{children}</div>;
}
