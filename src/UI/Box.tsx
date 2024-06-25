import React, { ReactNode } from "react";

type BoxProps = {
  children: ReactNode;
  className?: string;
};

const Box: React.FC<BoxProps> = ({ children, className = "", ...rest }) => {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

export default Box;
