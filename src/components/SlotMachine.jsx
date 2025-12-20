import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './SlotMachine.css';

// Helper to get image path, with a fallback text ref if needed
const SlotItem = ({ item, category }) => {
    // Sanitize name for filename: remove special chars, lower case?
    // User data has names like "Baby Mario". File might be "Baby Mario.png".
    // I'll assume exact match or simple sanitization if verified. 
    // For now, let's use the name as is.
    const imgSrc = `/data/images/${category}/${item.name}.png`; // Assuming user might put images here
    // But since we don't have images yet, this will fail. 
    // We should fallback to a nice placeholders.
    // I'll use a text overlay if image fails (handled via functionality or just CSS z-index).

    // For this implementation, I'll try to load image, if it fails, show text card.

    return (
        <div className="slot-item">
            <div className="slot-content">
                {/* We can use an img with onError to hide itself and show text */}
                <img
                    src={imgSrc}
                    alt={item.name}
                    className="slot-image"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div className="slot-text-fallback" style={{ display: 'none' }}>
                    <span>{item.name}</span>
                </div>
                {/* Also show text for clarity if requested, but user said "instead of names we will have actual pictures". 
                    So let's default to picture, fall back to text. 
                */}
            </div>
        </div>
    );
};

const Slot = ({ category, options, target, isSpinning, delay, isLocked, toggleLock, lockKey }) => {
    const [current, setCurrent] = useState(target || options[0]);

    useEffect(() => {
        // If locked, we do NOT spin. We just update to target if it changes (which it shoudln't if locked, but good practice)
        if (isLocked) {
            setCurrent(target);
            return;
        }

        if (isSpinning) {
            let interval;
            const speed = 50;
            const stopDelay = 1000 + (delay * 1000);

            interval = setInterval(() => {
                const random = options[Math.floor(Math.random() * options.length)];
                setCurrent(random);
            }, speed);

            setTimeout(() => {
                clearInterval(interval);
                setCurrent(target);
            }, stopDelay);

            return () => clearInterval(interval);
        } else {
            setCurrent(target);
        }
    }, [isSpinning, target, options, delay, isLocked]);

    return (
        <div className="slot-container">
            <div className={`slot-window ${isSpinning && !isLocked ? 'blur-effect' : ''} ${isLocked ? 'locked-border' : ''}`}>

                {/* Lock Button Overlay */}
                <button
                    className={`lock-button ${isLocked ? 'locked' : 'unlocked'}`}
                    onClick={() => toggleLock(lockKey)}
                    title={isLocked ? "Unlock" : "Lock"}
                    disabled={isSpinning}
                >
                    {isLocked ? (
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3v3H9V7c0-1.654 1.346-3 3-3zm0 10c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" /></svg>
                    ) : (
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3v3H9V7c0-1.654 1.346-3 3-3zm0 10c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" opacity="0.3" /></svg>
                    )}
                </button>

                <motion.div
                    key={current ? current.name : 'empty'}
                    // Only animate entrance if NOT locked to prevent jumpiness
                    initial={isLocked ? false : { y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={isLocked ? false : { y: 50, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                >
                    {current && <SlotItem item={current} category={category} />}
                </motion.div>
            </div>
            <div className="slot-label">{category}</div>
        </div>
    );
};

const SlotMachine = ({ drivers, vehicles, tires, gliders, selection, isSpinning, locked, toggleLock }) => {
    return (
        <div className="slot-machine-container">
            <Slot category="Drivers" options={drivers} target={selection?.driver} isSpinning={isSpinning} delay={0} isLocked={locked?.driver} toggleLock={toggleLock} lockKey="driver" />
            <Slot category="Vehicles" options={vehicles} target={selection?.vehicle} isSpinning={isSpinning} delay={0.5} isLocked={locked?.vehicle} toggleLock={toggleLock} lockKey="vehicle" />
            <Slot category="Tires" options={tires} target={selection?.tire} isSpinning={isSpinning} delay={1.0} isLocked={locked?.tire} toggleLock={toggleLock} lockKey="tire" />
            <Slot category="Gliders" options={gliders} target={selection?.glider} isSpinning={isSpinning} delay={1.5} isLocked={locked?.glider} toggleLock={toggleLock} lockKey="glider" />
        </div>
    );
};

export default SlotMachine;
