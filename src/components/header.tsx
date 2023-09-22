import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  logoSrc: string;
  text1: string;
  text2: string;
}

const Header: React.FC<HeaderProps> = ({ logoSrc, text1, text2 }) => {
  return (
    <header>
      <div className="headercontainer">
        <p className="headertext"> {text1}</p>
        <div className="logo">
          <Image src={logoSrc} alt='logo' fill />
        </div>
        <p className="headertext">{text2}</p>
      </div>

      <style jsx>{`
        
        header {
          display: flex;
          align-items: center;
          padding-top: 48px;
        }

        .headercontainer {
            display: flex;
            width: 610px;
            margin: auto;
            align-items : center; 
            justify-content: space-between;
        

        }

        .logo {
          width: 164px;
          height: 120px;
          position: relative;
        }

        .headertext {
            color: black;
            font-family: var(--font-nanumpen);
            font-size: 24px;
            position: relative;

          }

        }
      `}</style>
    </header>
  );
};

export default Header;
