import Link from "next/link";
import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href='/'>
      <div>
        <Image
          src='/images/Snack_Haven_logo.png'
          alt='Snack Haven Logo'
          width={100}
          height={100}
          className='object-contain'
        />
      </div>
    </Link>
  );
};

export default Logo;
