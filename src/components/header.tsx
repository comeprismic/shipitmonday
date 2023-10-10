// Import React and Next.js components
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Import the CSS module
import headerStyles from './header.module.css';

// Interface for props
interface HeaderProps {
  logoSrc: string;
  text1: string;
  text2: string;
}

// Header component
const Header: React.FC<HeaderProps> = ({ logoSrc, text1, text2 }) => {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.headercontainer}>
        <p className={headerStyles.headertext}>{text1}</p>
        <div className={headerStyles.logo}>
          <Link href={"/"}>
              <Image src={logoSrc} alt='logo' width={164} height={120} />
          </Link>
        </div>
        <p className={headerStyles.headertext}>{text2}</p>
      </div>
    </header>
  );
};

// Export the Header component
export default Header;
