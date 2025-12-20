import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ data, selection, onUpdateSelection, onOptimize, locked, toggleLock }) => {
    const [optimizationTarget, setOptimizationTarget] = useState('Total');

    const handleOptimizeClick = () => {
        onOptimize(optimizationTarget);
    };

    const handleSelectChange = (category, valueName) => {
        // Find the full object from data
        const list = data[category + 's']; // drivers, vehicles...
        const item = list.find(i => i.name === valueName);
        if (item) {
            onUpdateSelection(category, item);
        }
    };

    const targets = [
        'Total', 'Balance',
        'GroundSpeed', 'WaterSpeed', 'AirSpeed', 'AntiGravitySpeed',
        'Acceleration', 'Weight',
        'GroundHandling', 'WaterHandling', 'AirHandling', 'AntiGravityHandling',
        'Traction', 'MiniTurbo',
        'WeightedSpeed', 'DriftMastery'
    ];

    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Build Control</h2>

            <div className="sidebar-section">
                <h3>Manual Selection</h3>
                <p className="sidebar-hint">Select parts manually to lock them in.</p>

                <div className="manual-control">
                    <label>Driver</label>
                    <select
                        value={selection?.driver?.name || ''}
                        onChange={(e) => handleSelectChange('driver', e.target.value)}
                    >
                        {data.drivers?.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                    </select>
                </div>

                <div className="manual-control">
                    <label>Vehicle</label>
                    <select
                        value={selection?.vehicle?.name || ''}
                        onChange={(e) => handleSelectChange('vehicle', e.target.value)}
                    >
                        {data.vehicles?.map(v => <option key={v.name} value={v.name}>{v.name}</option>)}
                    </select>
                </div>

                <div className="manual-control">
                    <label>Tire</label>
                    <select
                        value={selection?.tire?.name || ''}
                        onChange={(e) => handleSelectChange('tire', e.target.value)}
                    >
                        {data.tires?.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                    </select>
                </div>

                <div className="manual-control">
                    <label>Glider</label>
                    <select
                        value={selection?.glider?.name || ''}
                        onChange={(e) => handleSelectChange('glider', e.target.value)}
                    >
                        {data.gliders?.map(g => <option key={g.name} value={g.name}>{g.name}</option>)}
                    </select>
                </div>
            </div>

            <div className="sidebar-divider"></div>

            <div className="sidebar-section">
                <h3>Optimizer</h3>
                <p className="sidebar-hint">Find the best UNLOCKED parts to maximize:</p>

                <select
                    className="optimizer-select"
                    value={optimizationTarget}
                    onChange={(e) => setOptimizationTarget(e.target.value)}
                >
                    {targets.map(t => <option key={t} value={t}>{t}</option>)}
                </select>

                <button className="optimize-button" onClick={handleOptimizeClick}>
                    🚀 Find Optimal Build
                </button>
                <div className="sidebar-note">
                    Locks are respected! Lock your driver above to find the best kart for them.
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
