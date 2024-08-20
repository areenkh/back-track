import React, { useEffect } from 'react';
import FollowersAnalysis from './FollowersAnalysis';

function App() {
    useEffect(() => {
        const footer = document.querySelector('footer');
        footer.style.width = window.innerWidth + 'px';
    }, []);

    return (
            <div className="app">
                <header className="app-header">
                    <h1>BackTrack - Instagram Follow Check</h1>
                </header>
                <main className="main-content">
                    <FollowersAnalysis />
                </main>
            </div>
    );
}

export default App;
