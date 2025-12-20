import React, { useState, useEffect } from 'react';
import './App.css';
import SlotMachine from './components/SlotMachine';
import StatsDisplay from './components/StatsDisplay';
import { loadAllData } from './utils/DataLoader';
import { calculateStats } from './utils/StatCalculator';
import ImageAudit from './components/ImageAudit';
import Sidebar from './components/Sidebar';
import Garage from './components/Garage';

function App() {
    const [data, setData] = useState({ drivers: [], vehicles: [], tires: [], gliders: [] });
    const [selection, setSelection] = useState({ driver: null, vehicle: null, tire: null, glider: null });
    const [isSpinning, setIsSpinning] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showDebug, setShowDebug] = useState(false);
    const [locked, setLocked] = useState({ driver: false, vehicle: false, tire: false, glider: false });

    useEffect(() => {
        const initData = async () => {
            const loaded = await loadAllData();
            setData(loaded);

            // Random initial selection
            if (loaded.drivers.length > 0) {
                setSelection({
                    driver: getRandom(loaded.drivers),
                    vehicle: getRandom(loaded.vehicles),
                    tire: getRandom(loaded.tires),
                    glider: getRandom(loaded.gliders)
                });
            }
            setLoading(false);
        };
        initData();
    }, []);

    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const toggleLock = (part) => {
        setLocked(prev => ({ ...prev, [part]: !prev[part] }));
    };

    const handleRun = () => {
        if (loading || isSpinning) return;

        // Reset spin state to trigger re-render/re-effect in Slots
        setIsSpinning(true);

        // Determines new targets immediately
        const newSelection = { ...selection };

        if (!locked.driver) newSelection.driver = getRandom(data.drivers);
        if (!locked.vehicle) newSelection.vehicle = getRandom(data.vehicles);
        if (!locked.tire) newSelection.tire = getRandom(data.tires);
        if (!locked.glider) newSelection.glider = getRandom(data.gliders);

        setSelection(newSelection);

        // Stop spinning state after longest animation (approx 3.5s to be safe)
        // Driver: 1s, Vehicle: 1.5s, Tire: 2s, Glider: 2.5s (based on delays in SlotMachine)
        // Actually Logic in SlotMachine was: stopDelay = 1000 + (delay * 1000).
        // Max delay = 1.5. Stop delay = 1000 + 1500 = 2500ms.
        setTimeout(() => {
            setIsSpinning(false);
        }, 2600);
    };

    const handleShare = () => {
        if (!selection.driver) return;
        const text = `MK8D Build: ${selection.driver.name} | ${selection.vehicle.name} | ${selection.tire.name} | ${selection.glider.name}`;
        navigator.clipboard.writeText(text).then(() => {
            alert('Build copied to clipboard!');
        });
    };

    /* Optimizer Logic */
    const handleOptimize = (targetStat) => {
        if (loading) return;

        // Determine search space based on locks
        const drivers = locked.driver ? [selection.driver] : data.drivers;
        const vehicles = locked.vehicle ? [selection.vehicle] : data.vehicles;
        const tires = locked.tire ? [selection.tire] : data.tires;
        const gliders = locked.glider ? [selection.glider] : data.gliders;

        let bestCombo = null;
        let maxVal = -Infinity;

        // Brute Force Search
        // Note: optimization can be expensive. Since this is client side and sync, 
        // for < 1 million items it's okay, but we should be careful.
        // Total max ~ 42*41*22*15 = 568,260. 
        // JS can handle this loop in < 100ms easily on modern devices.

        // Using a simple loop logic
        for (const d of drivers) {
            for (const v of vehicles) {
                for (const t of tires) {
                    for (const g of gliders) {
                        const stats = calculateStats(d, v, t, g);
                        const val = stats[targetStat] || 0; // Ensure we handle derived stats too if calculateStats returns them

                        if (val > maxVal) {
                            maxVal = val;
                            bestCombo = { driver: d, vehicle: v, tire: t, glider: g };
                        }
                    }
                }
            }
        }

        if (bestCombo) {
            setSelection(bestCombo);
            // Optional: Should we lock the optimized result? 
            // User might want to tweak it. Let's strictly just select it.
            // But we should probably unlock everything that was randomized so they can see it's a new state? 
            // No, respecting locks is key.
        }
    };

    const handleUpdateSelection = (category, item) => {
        setSelection(prev => ({ ...prev, [category]: item }));
        // Auto-lock manual selections? 
        // Common behavior: if I manually pick it, I probably don't want it to spin away immediately.
        // But the user has a lock button. Let's just update selection.
    };

    const [comparisonBuild, setComparisonBuild] = useState(null);

    // ... (existing code)

    const handleCompare = (build) => {
        setComparisonBuild(build);
    };

    const currentStats = calculateStats(selection.driver, selection.vehicle, selection.tire, selection.glider);
    const comparisonStats = comparisonBuild
        ? calculateStats(comparisonBuild.selection.driver, comparisonBuild.selection.vehicle, comparisonBuild.selection.tire, comparisonBuild.selection.glider)
        : null;

    if (loading) return <div className="loading-screen">Starting Engine...</div>;

    return (
        <div className="app-layout">
            <Sidebar
                data={data}
                selection={selection}
                onUpdateSelection={handleUpdateSelection}
                onOptimize={handleOptimize}
                locked={locked}
                toggleLock={toggleLock}
            />

            <div className="main-content-area">
                <header className="app-header">
                    <h1 className="game-title">MK8D <span className="highlight">Randomizer</span></h1>
                </header>

                <main className="game-board">

                    <SlotMachine
                        drivers={data.drivers}
                        vehicles={data.vehicles}
                        tires={data.tires}
                        gliders={data.gliders}
                        selection={selection}
                        isSpinning={isSpinning}
                        locked={locked}
                        toggleLock={toggleLock}
                    />

                    <div className="controls-area">
                        <button className="run-button" onClick={handleRun} disabled={isSpinning}>
                            {isSpinning ? 'Rolling...' : 'Randomize!'}
                        </button>

                        <button
                            className="share-button"
                            onClick={handleShare}
                            title="Copy build to clipboard"
                        >
                            📋 Share
                        </button>
                    </div>

                    <div className="stats-area">
                        <StatsDisplay stats={currentStats} compareStats={comparisonStats} />
                    </div>

                </main>
            </div>

            <Garage
                currentSelection={selection}
                onLoad={(sel) => setSelection(sel)}
                onDelete={(id) => { /* Garage handles delete, we might need to clear compare if it matches */ }}
                onCompare={handleCompare}
                comparisonBuild={comparisonBuild}
            />
        </div>
    );
}

export default App;
