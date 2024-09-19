import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-bold text-3xl bg-gradient-to-r to-blue-500 from-fuchsia-500 text-transparent bg-clip-text  hover:to-fuchsia-400 hover:from-blue-500 hover:cursor-pointer"
    >
      FormBuilder
    </Link>
  );
};

export default Logo;
