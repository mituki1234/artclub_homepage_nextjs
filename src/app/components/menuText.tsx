import React from 'react';

interface menuTextProps {
  link: string;
  text: string;
}

const MenuText: React.FC<menuTextProps> = ({link, text}) => {
  return (
    <a href={link}>
        <span>{text}</span>
    </a>
  );
}

export default MenuText;