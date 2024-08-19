import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="content">
                © {new Date().getFullYear()} YourAppName. All rights reserved.
                <a href="https://github.com/yourusername/yourrepository/issues" target="_blank" rel="noopener noreferrer">
                    See a bug on this page? Give me feedback!
                </a>
            </div>
        </footer>
    );
};

export default Footer;
