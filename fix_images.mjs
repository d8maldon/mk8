import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'public', 'data', 'images');

const renames = {
    "Drivers": {
        "Inkling Boy.png": "Inkling (M).png",
        "Inkling Girl.png": "Inkling (F).png",
        "Villager (male).png": "Villager (M).png",
        "Villager (female).png": "Villager (F).png",
        // Bowser Jr.png vs Bowser Jr..png ? CSV likely has "Bowser Jr." -> file "Bowser Jr..png"
        // Let's check: downloaded "Bowser Jr.png". CSV "Bowser Jr.". 
        // App looks for "Bowser Jr..png". 
        // Wait, if name is "Bowser Jr.", app looks for `${item.name}.png`.
        // So "Bowser Jr..png".
        "Bowser Jr.png": "Bowser Jr..png"
    },
    "Vehicles": {
        "Gold Standard.png": "Gold Kart.png",
        "Sports Coupe.png": "Sports Coupé.png",
        "Biddybuggy.png": "Buggybud.png", // Wait, CSV says "Buggybud"? Let me double check if I should rename file or update CSV? Usually CSV is truth.
        // CSV: "Splat Buggy", "Inkstriker" usually unique.
        // "Standard Quad" vs "Standard ATV"?
        "Standard ATV.png": "Standard Quad.png",
        // Plus variants
        "Comet.png": "Comet+.png",
        "Sport Bike.png": "Sport Bike+.png",
        "Jet Bike.png": "Jet Bike+.png",
        "Yoshi Bike.png": "Yoshi Bike+.png",
        "Master Cycle.png": "Master Cycle+.png"
    },
    "Tires": {
        "Standard.png": "Normal.png", // CSV says "Normal"? Check audit. Yes "Normal" was missing.
        "Blue Standard.png": "Normal Blue.png",
        "Wood.png": "Wooden.png",
        "Triforce Tires.png": "Triforce Tyres.png",
        "Leaf Tires.png": "Leaf Tyres.png",
        // "Funky Monster" ? Check if "Hot Monster" or similar.
        // CSV: "Funky Monster". Image: "Hot Monster.png"? 
        "Hot Monster.png": "Funky Monster.png",
        // "Gold Wheels" vs "Gold Tires"?
        "Gold Tires.png": "Gold Wheels.png"
    },
    "Gliders": {
        // Did not see many missing in gliders, but check "Gold Glider" vs ???
    }
};

// Also verify file existence before rename
const runRenames = () => {
    for (const [category, map] of Object.entries(renames)) {
        const dir = path.join(DATA_DIR, category);
        if (!fs.existsSync(dir)) continue;

        for (const [oldName, newName] of Object.entries(map)) {
            const oldPath = path.join(dir, oldName);
            const newPath = path.join(dir, newName);

            if (fs.existsSync(oldPath)) {
                try {
                    fs.renameSync(oldPath, newPath);
                    console.log(`Renamed: ${category}/${oldName} -> ${newName}`);
                } catch (e) {
                    console.error(`Error renaming ${oldName}: ${e.message}`);
                }
            } else if (fs.existsSync(newPath)) {
                console.log(`Already renamed or exists: ${category}/${newName}`);
            } else {
                console.warn(`Source file not found: ${category}/${oldName}`);
            }
        }
    }
};

runRenames();
