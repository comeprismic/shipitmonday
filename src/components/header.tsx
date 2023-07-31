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
                <Link href="/">{text1} </Link>
                <div className="logo">
                    <Image src={logoSrc} alt='logo' fill />
                </div>
                <Link href="/about">{text2}</Link>
            </div>

            <style jsx>{`
        
        header {
          display: flex;
          align-items: center;
          padding: 1rem;
          background-color: #f0f0f0;
        }

        .headercontainer {
    
        display: flex;
        width: auto;
        margin: auto;
        align-items : center; 
        justify-content: space-between;
        

        }

        .logo {
          flex: 1;
          width: 64px;
          height: 64px;
          position: relative;
        }

        nav ul {
          list-style: none;
          display: flex;
        }
        nav li {
          margin-left: 1rem;
        }
        nav a {
          color: #333;
          text-decoration: none;
        }
      `}</style>
        </header>
    );
};

export default Header;
