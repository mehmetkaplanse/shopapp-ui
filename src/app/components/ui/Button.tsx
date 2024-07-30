import React from 'react'

interface ButtonProps {
    text: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({text, onClick}) => {
  return (
    <button className="bg-primary text-white w-[105px] h-[30px] rounded-full text-xs" onClick={onClick}>
        {text}
      </button>
  )
}

export default Button