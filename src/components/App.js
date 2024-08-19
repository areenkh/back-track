import React from 'react';
import FollowersAnalysis from './FollowersAnalysis';

function App() {
    return (
        <div className="app">
            <header className="app-header">
                <h1>BackTrack - Instagram Follow Check</h1>
            </header>
            <main className="main-content">
                <FollowersAnalysis />
                <Footer />
            </main>
        </div>
    );
}

export default App;
