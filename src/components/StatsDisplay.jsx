import React from 'react';
import { motion } from 'framer-motion';
import './StatsDisplay.css';

const STAT_DESCRIPTIONS = {
    'Ground Speed': 'Maximum speed on ground.',
    'Water Speed': 'Maximum speed in the water.',
    'Air Speed': 'Maximum speed in the air.',
    'Anti-Grav Speed': 'Maximum speed in anti-gravity.',
    'Acceleration': 'Ability to speed up quickly.',
    'Weight': 'Heavier builds get knocked around less but have lower acceleration.',
    'Ground Handling': 'Ability to maneuver on the ground.',
    'Water Handling': 'Ability to maneuver in the water.',
    'Air Handling': 'Ability to maneuver in the air.',
    'Anti-Grav Handling': 'Ability to maneuver in anti-gravity.',
    'Traction': 'Grip power / resistance to sliding on off-road terrain.',
    'Mini-Turbo': 'Length and strength of turbo boosts from drifting.',

    'Total': 'The sum total of all basic stats.',
    'Balance': 'The well-roundedness of the combination (5.0 minus Standard Deviation).',
    'Avg Speed': 'Average of Ground, Water, Air, and Anti-Gravity speed values.',
    'Wgt Speed': 'Average speed heavily weighted towards Ground and Anti-Gravity.',
    'Avg Handling': 'Average of all four handling values.',
    'Wgt Handling': 'Average handling heavily weighted towards Ground and Anti-Gravity.',
    'Gnd Mastery': 'Average of Ground speed and handling.',
    'Wtr Mastery': 'Average of Water speed and handling.',
    'Air Mastery': 'Average of Air speed and handling.',
    'A-G Mastery': 'Average of Anti-Gravity speed and handling.',
    'Drift Mastery': 'Average of handling, traction, and mini-turbo.',
    'Col Mastery': 'Collision Mastery: Average of weight and ground handling.'
};

const StatRow = ({ label, value, compareValue, max = 6 }) => {
    const effectiveMax = value > 10 ? 65 : 6;
    const percentage = Math.min((value / effectiveMax) * 100, 100);
    const description = STAT_DESCRIPTIONS[label] || label;

    let diff = null;
    let diffColor = '';

    if (compareValue !== undefined && compareValue !== null) {
        const rawDiff = value - compareValue;
        // Fix float precision
        const fixedDiff = parseFloat(rawDiff.toFixed(2));

        if (fixedDiff > 0) {
            diff = `+${fixedDiff}`;
            diffColor = '#30D158'; // Green
        } else if (fixedDiff < 0) {
            diff = `${fixedDiff}`;
            diffColor = '#FF453A'; // Red
        } else {
            diff = '0';
            diffColor = '#888';
        }
    }

    return (
        <div className="stat-row group relative">
            <div className="stat-label">
                {label}
            </div>

            {/* Tooltip */}
            <div className="stat-tooltip">
                {description}
            </div>

            <div className="stat-bar-container">
                <motion.div
                    className="stat-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 10 }}
                />
            </div>

            <div className="stat-value-container">
                <span className="stat-value">{value.toFixed(2)}</span>
                {diff && (
                    <span className="stat-diff" style={{ color: diffColor }}>
                        {diff}
                    </span>
                )}
            </div>
        </div>
    );
};

const StatsSection = ({ title, stats, compareStats }) => (
    <div className="stats-section">
        <h4 className="stats-sub-title">{title}</h4>
        {stats.map(stat => (
            <StatRow
                key={stat.label}
                label={stat.label}
                value={stat.value}
                compareValue={compareStats ? compareStats[stat.propKey] : undefined}
            />
        ))}
    </div>
);

const StatsDisplay = ({ stats, compareStats }) => {
    if (!stats) return null;

    // We need to map labels to property keys to match the compareStats object
    const basicStats = [
        { label: 'Ground Speed', value: stats.GroundSpeed, propKey: 'GroundSpeed' },
        { label: 'Water Speed', value: stats.WaterSpeed, propKey: 'WaterSpeed' },
        { label: 'Air Speed', value: stats.AirSpeed, propKey: 'AirSpeed' },
        { label: 'Anti-Grav Speed', value: stats.AntiGravitySpeed, propKey: 'AntiGravitySpeed' },
        { label: 'Acceleration', value: stats.Acceleration, propKey: 'Acceleration' },
        { label: 'Weight', value: stats.Weight, propKey: 'Weight' },
        { label: 'Ground Handling', value: stats.GroundHandling, propKey: 'GroundHandling' },
        { label: 'Water Handling', value: stats.WaterHandling, propKey: 'WaterHandling' },
        { label: 'Air Handling', value: stats.AirHandling, propKey: 'AirHandling' },
        { label: 'Anti-Grav Handling', value: stats.AntiGravityHandling, propKey: 'AntiGravityHandling' },
        { label: 'Traction', value: stats.Traction, propKey: 'Traction' },
        { label: 'Mini-Turbo', value: stats.MiniTurbo, propKey: 'MiniTurbo' },
    ];

    const derivedStats = [
        { label: 'Total', value: stats.Total, propKey: 'Total' },
        { label: 'Balance', value: stats.Balance, propKey: 'Balance' },
        { label: 'Avg Speed', value: stats.AverageSpeed, propKey: 'AverageSpeed' },
        { label: 'Wgt Speed', value: stats.WeightedSpeed, propKey: 'WeightedSpeed' },
        { label: 'Avg Handling', value: stats.AverageHandling, propKey: 'AverageHandling' },
        { label: 'Wgt Handling', value: stats.WeightedHandling, propKey: 'WeightedHandling' },
        { label: 'Gnd Mastery', value: stats.GroundMastery, propKey: 'GroundMastery' },
        // ... include others if needed, using exact same keys as calculateStats returns
    ];

    return (
        <div className="stats-container">
            <h3 className="stats-title">Statistics</h3>

            <div className="stats-layout">
                <div className="stats-column">
                    <StatsSection title="Basic Stats" stats={basicStats} compareStats={compareStats} />
                </div>
                <div className="stats-column">
                    <StatsSection title="Derived Stats" stats={derivedStats} compareStats={compareStats} />
                </div>
            </div>
        </div>
    );
};

export default StatsDisplay;
