import React, { useState, useEffect } from 'react';
import './Garage.css';

const Garage = ({ currentSelection, onLoad, onDelete, onCompare, comparisonBuild }) => {
    const [savedBuilds, setSavedBuilds] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('mk8d-garage');
        if (stored) {
            setSavedBuilds(JSON.parse(stored));
        }
    }, []);

    const saveBuild = () => {
        if (!currentSelection.driver) return;

        const newBuild = {
            id: Date.now(),
            name: `${currentSelection.driver.name}'s Build`, // Default name, could add editing later
            selection: currentSelection,
            date: new Date().toLocaleDateString()
        };

        const updated = [newBuild, ...savedBuilds];
        setSavedBuilds(updated);
        localStorage.setItem('mk8d-garage', JSON.stringify(updated));
    };

    const deleteBuild = (id) => {
        const updated = savedBuilds.filter(b => b.id !== id);
        setSavedBuilds(updated);
        localStorage.setItem('mk8d-garage', JSON.stringify(updated));
        if (comparisonBuild?.id === id) {
            onCompare(null); // Clear comparison if deleted
        }
    };

    return (
        <div className="garage">
            <h2 className="garage-title">My Garage</h2>

            <button className="garage-save-btn" onClick={saveBuild}>
                <span style={{ marginRight: '8px' }}>💾</span> Save Current Build
            </button>

            <div className="garage-list">
                {savedBuilds.length === 0 && (
                    <div className="garage-empty">No saved builds yet.</div>
                )}

                {savedBuilds.map(build => (
                    <div key={build.id} className="garage-item">
                        <div className="garage-item-header">
                            <span className="build-name">{build.name}</span>
                            <span className="build-date">{build.date}</span>
                        </div>
                        <div className="build-summary">
                            {build.selection.driver.name} / {build.selection.vehicle.name} / {build.selection.tire.name} / {build.selection.glider.name}
                        </div>

                        <div className="garage-actions">
                            <button className="action-btn load" onClick={() => onLoad(build.selection)}>
                                Load
                            </button>
                            <button
                                className={`action-btn compare ${comparisonBuild?.id === build.id ? 'active' : ''}`}
                                onClick={() => onCompare(comparisonBuild?.id === build.id ? null : build)}
                            >
                                {comparisonBuild?.id === build.id ? 'Comparing...' : 'Compare'}
                            </button>
                            <button className="action-btn delete" onClick={() => deleteBuild(build.id)}>
                                ×
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Garage;
