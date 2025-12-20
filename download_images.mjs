import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageData = {
    "Drivers": [
        { "name": "Mario", "url": "https://mk8dxbuilder.com/img/drivers/Mario.png" },
        { "name": "Luigi", "url": "https://mk8dxbuilder.com/img/drivers/Luigi.png" },
        { "name": "Peach", "url": "https://mk8dxbuilder.com/img/drivers/Peach.png" },
        { "name": "Daisy", "url": "https://mk8dxbuilder.com/img/drivers/Daisy.png" },
        { "name": "Rosalina", "url": "https://mk8dxbuilder.com/img/drivers/Rosalina.png" },
        { "name": "Tanooki Mario", "url": "https://mk8dxbuilder.com/img/drivers/Tanooki%20Mario.png" },
        { "name": "Cat Peach", "url": "https://mk8dxbuilder.com/img/drivers/Cat%20Peach.png" },
        { "name": "Birdo", "url": "https://mk8dxbuilder.com/img/drivers/Birdo.png" },
        { "name": "Yoshi", "url": "https://mk8dxbuilder.com/img/drivers/Yoshi.png" },
        { "name": "Toad", "url": "https://mk8dxbuilder.com/img/drivers/Toad.png" },
        { "name": "Koopa Troopa", "url": "https://mk8dxbuilder.com/img/drivers/Koopa%20Troopa.png" },
        { "name": "Shy Guy", "url": "https://mk8dxbuilder.com/img/drivers/Shy%20Guy.png" },
        { "name": "Lakitu", "url": "https://mk8dxbuilder.com/img/drivers/Lakitu.png" },
        { "name": "Toadette", "url": "https://mk8dxbuilder.com/img/drivers/Toadette.png" },
        { "name": "King Boo", "url": "https://mk8dxbuilder.com/img/drivers/King%20Boo.png" },
        { "name": "Petey Piranha", "url": "https://mk8dxbuilder.com/img/drivers/Petey%20Piranha.png" },
        { "name": "Baby Mario", "url": "https://mk8dxbuilder.com/img/drivers/Baby%20Mario.png" },
        { "name": "Baby Luigi", "url": "https://mk8dxbuilder.com/img/drivers/Baby%20Luigi.png" },
        { "name": "Baby Peach", "url": "https://mk8dxbuilder.com/img/drivers/Baby%20Peach.png" },
        { "name": "Baby Daisy", "url": "https://mk8dxbuilder.com/img/drivers/Baby%20Daisy.png" },
        { "name": "Baby Rosalina", "url": "https://mk8dxbuilder.com/img/drivers/Baby%20Rosalina.png" },
        { "name": "Metal Mario", "url": "https://mk8dxbuilder.com/img/drivers/Metal%20Mario.png" },
        { "name": "Pink Gold Peach", "url": "https://mk8dxbuilder.com/img/drivers/Pink%20Gold%20Peach.png" },
        { "name": "Wiggler", "url": "https://mk8dxbuilder.com/img/drivers/Wiggler.png" },
        { "name": "Wario", "url": "https://mk8dxbuilder.com/img/drivers/Wario.png" },
        { "name": "Waluigi", "url": "https://mk8dxbuilder.com/img/drivers/Waluigi.png" },
        { "name": "Donkey Kong", "url": "https://mk8dxbuilder.com/img/drivers/Donkey%20Kong.png" },
        { "name": "Bowser", "url": "https://mk8dxbuilder.com/img/drivers/Bowser.png" },
        { "name": "Dry Bones", "url": "https://mk8dxbuilder.com/img/drivers/Dry%20Bones.png" },
        { "name": "Bowser Jr", "url": "https://mk8dxbuilder.com/img/drivers/Bowser%20Jr.png" },
        { "name": "Dry Bowser", "url": "https://mk8dxbuilder.com/img/drivers/Dry%20Bowser.png" },
        { "name": "Kamek", "url": "https://mk8dxbuilder.com/img/drivers/Kamek.png" },
        { "name": "Lemmy", "url": "https://mk8dxbuilder.com/img/drivers/Lemmy.png" },
        { "name": "Larry", "url": "https://mk8dxbuilder.com/img/drivers/Larry.png" },
        { "name": "Wendy", "url": "https://mk8dxbuilder.com/img/drivers/Wendy.png" },
        { "name": "Ludwig", "url": "https://mk8dxbuilder.com/img/drivers/Ludwig.png" },
        { "name": "Iggy", "url": "https://mk8dxbuilder.com/img/drivers/Iggy.png" },
        { "name": "Roy", "url": "https://mk8dxbuilder.com/img/drivers/Roy.png" },
        { "name": "Morton", "url": "https://mk8dxbuilder.com/img/drivers/Morton.png" },
        { "name": "Peachette", "url": "https://mk8dxbuilder.com/img/drivers/Peachette.png" },
        { "name": "Inkling Girl", "url": "https://mk8dxbuilder.com/img/drivers/Inkling%20Girl.png" },
        { "name": "Inkling Boy", "url": "https://mk8dxbuilder.com/img/drivers/Inkling%20Boy.png" },
        { "name": "Villager (male)", "url": "https://mk8dxbuilder.com/img/drivers/Villager%20(male).png" },
        { "name": "Villager (female)", "url": "https://mk8dxbuilder.com/img/drivers/Villager%20(female).png" },
        { "name": "Isabelle", "url": "https://mk8dxbuilder.com/img/drivers/Isabelle.png" },
        { "name": "Link", "url": "https://mk8dxbuilder.com/img/drivers/Link.png" },
        { "name": "Diddy Kong", "url": "https://mk8dxbuilder.com/img/drivers/Diddy%20Kong.png" },
        { "name": "Funky Kong", "url": "https://mk8dxbuilder.com/img/drivers/Funky%20Kong.png" },
        { "name": "Pauline", "url": "https://mk8dxbuilder.com/img/drivers/Pauline.png" }
    ],
    "Vehicles": [
        { "name": "Standard Kart", "url": "https://mk8dxbuilder.com/img/bodies/Standard%20Kart.png" },
        { "name": "Pipe Frame", "url": "https://mk8dxbuilder.com/img/bodies/Pipe%20Frame.png" },
        { "name": "Mach 8", "url": "https://mk8dxbuilder.com/img/bodies/Mach%208.png" },
        { "name": "Steel Driver", "url": "https://mk8dxbuilder.com/img/bodies/Steel%20Driver.png" },
        { "name": "Cat Cruiser", "url": "https://mk8dxbuilder.com/img/bodies/Cat%20Cruiser.png" },
        { "name": "Circuit Special", "url": "https://mk8dxbuilder.com/img/bodies/Circuit%20Special.png" },
        { "name": "Tri-Speeder", "url": "https://mk8dxbuilder.com/img/bodies/Tri-Speeder.png" },
        { "name": "Badwagon", "url": "https://mk8dxbuilder.com/img/bodies/Badwagon.png" },
        { "name": "Prancer", "url": "https://mk8dxbuilder.com/img/bodies/Prancer.png" },
        { "name": "Biddybuggy", "url": "https://mk8dxbuilder.com/img/bodies/Biddybuggy.png" },
        { "name": "Landship", "url": "https://mk8dxbuilder.com/img/bodies/Landship.png" },
        { "name": "Sneeker", "url": "https://mk8dxbuilder.com/img/bodies/Sneeker.png" },
        { "name": "Sports Coupe", "url": "https://mk8dxbuilder.com/img/bodies/Sports%20Coupe.png" },
        { "name": "Gold Standard", "url": "https://mk8dxbuilder.com/img/bodies/Gold%20Standard.png" },
        { "name": "GLA", "url": "https://mk8dxbuilder.com/img/bodies/GLA.png" },
        { "name": "W 25 Silver Arrow", "url": "https://mk8dxbuilder.com/img/bodies/W%2025%20Silver%20Arrow.png" },
        { "name": "300 SL Roadster", "url": "https://mk8dxbuilder.com/img/bodies/300%20SL%20Roadster.png" },
        { "name": "Blue Falcon", "url": "https://mk8dxbuilder.com/img/bodies/Blue%20Falcon.png" },
        { "name": "Tanooki Kart", "url": "https://mk8dxbuilder.com/img/bodies/Tanooki%20Kart.png" },
        { "name": "B Dasher", "url": "https://mk8dxbuilder.com/img/bodies/B%20Dasher.png" },
        { "name": "Streetle", "url": "https://mk8dxbuilder.com/img/bodies/Streetle.png" },
        { "name": "P-Wing", "url": "https://mk8dxbuilder.com/img/bodies/P-Wing.png" },
        { "name": "Koopa Clown", "url": "https://mk8dxbuilder.com/img/bodies/Koopa%20Clown.png" },
        { "name": "Standard Bike", "url": "https://mk8dxbuilder.com/img/bodies/Standard%20Bike.png" },
        { "name": "Comet", "url": "https://mk8dxbuilder.com/img/bodies/Comet.png" },
        { "name": "Sport Bike", "url": "https://mk8dxbuilder.com/img/bodies/Sport%20Bike.png" },
        { "name": "The Duke", "url": "https://mk8dxbuilder.com/img/bodies/The%20Duke.png" },
        { "name": "Flame Rider", "url": "https://mk8dxbuilder.com/img/bodies/Flame%20Rider.png" },
        { "name": "Varmint", "url": "https://mk8dxbuilder.com/img/bodies/Varmint.png" },
        { "name": "Mr Scooty", "url": "https://mk8dxbuilder.com/img/bodies/Mr%20Scooty.png" },
        { "name": "Jet Bike", "url": "https://mk8dxbuilder.com/img/bodies/Jet%20Bike.png" },
        { "name": "Yoshi Bike", "url": "https://mk8dxbuilder.com/img/bodies/Yoshi%20Bike.png" },
        { "name": "Master Cycle", "url": "https://mk8dxbuilder.com/img/bodies/Master%20Cycle.png" },
        { "name": "Master Cycle Zero", "url": "https://mk8dxbuilder.com/img/bodies/Master%20Cycle%20Zero.png" },
        { "name": "City Tripper", "url": "https://mk8dxbuilder.com/img/bodies/City%20Tripper.png" },
        { "name": "Standard ATV", "url": "https://mk8dxbuilder.com/img/bodies/Standard%20ATV.png" },
        { "name": "Wild Wiggler", "url": "https://mk8dxbuilder.com/img/bodies/Wild%20Wiggler.png" },
        { "name": "Teddy Buggy", "url": "https://mk8dxbuilder.com/img/bodies/Teddy%20Buggy.png" },
        { "name": "Bone Rattler", "url": "https://mk8dxbuilder.com/img/bodies/Bone%20Rattler.png" },
        { "name": "Splat Buggy", "url": "https://mk8dxbuilder.com/img/bodies/Splat%20Buggy.png" },
        { "name": "Inkstriker", "url": "https://mk8dxbuilder.com/img/bodies/Inkstriker.png" }
    ],
    "Tires": [
        { "name": "Standard", "url": "https://mk8dxbuilder.com/img/tires/Standard.png" },
        { "name": "Monster", "url": "https://mk8dxbuilder.com/img/tires/Monster.png" },
        { "name": "Roller", "url": "https://mk8dxbuilder.com/img/tires/Roller.png" },
        { "name": "Slim", "url": "https://mk8dxbuilder.com/img/tires/Slim.png" },
        { "name": "Slick", "url": "https://mk8dxbuilder.com/img/tires/Slick.png" },
        { "name": "Metal", "url": "https://mk8dxbuilder.com/img/tires/Metal.png" },
        { "name": "Button", "url": "https://mk8dxbuilder.com/img/tires/Button.png" },
        { "name": "Off-Road", "url": "https://mk8dxbuilder.com/img/tires/Off-Road.png" },
        { "name": "Sponge", "url": "https://mk8dxbuilder.com/img/tires/Sponge.png" },
        { "name": "Wood", "url": "https://mk8dxbuilder.com/img/tires/Wood.png" },
        { "name": "Cushion", "url": "https://mk8dxbuilder.com/img/tires/Cushion.png" },
        { "name": "Blue Standard", "url": "https://mk8dxbuilder.com/img/tires/Blue%20Standard.png" },
        { "name": "Hot Monster", "url": "https://mk8dxbuilder.com/img/tires/Hot%20Monster.png" },
        { "name": "Azure Roller", "url": "https://mk8dxbuilder.com/img/tires/Azure%20Roller.png" },
        { "name": "Crimson Slim", "url": "https://mk8dxbuilder.com/img/tires/Crimson%20Slim.png" },
        { "name": "Cyber Slick", "url": "https://mk8dxbuilder.com/img/tires/Cyber%20Slick.png" },
        { "name": "Retro Off-Road", "url": "https://mk8dxbuilder.com/img/tires/Retro%20Off-Road.png" },
        { "name": "Gold Tires", "url": "https://mk8dxbuilder.com/img/tires/Gold%20Tires.png" },
        { "name": "GLA Tires", "url": "https://mk8dxbuilder.com/img/tires/GLA%20Tires.png" },
        { "name": "Triforce Tires", "url": "https://mk8dxbuilder.com/img/tires/Triforce%20Tires.png" },
        { "name": "Ancient Tires", "url": "https://mk8dxbuilder.com/img/tires/Ancient%20Tires.png" },
        { "name": "Leaf Tires", "url": "https://mk8dxbuilder.com/img/tires/Leaf%20Tires.png" }
    ],
    "Gliders": [
        { "name": "Super Glider", "url": "https://mk8dxbuilder.com/img/gliders/Super%20Glider.png" },
        { "name": "Cloud Glider", "url": "https://mk8dxbuilder.com/img/gliders/Cloud%20Glider.png" },
        { "name": "Wario Wing", "url": "https://mk8dxbuilder.com/img/gliders/Wario%20Wing.png" },
        { "name": "Waddle Wing", "url": "https://mk8dxbuilder.com/img/gliders/Waddle%20Wing.png" },
        { "name": "Peach Parasol", "url": "https://mk8dxbuilder.com/img/gliders/Peach%20Parasol.png" },
        { "name": "Parachute", "url": "https://mk8dxbuilder.com/img/gliders/Parachute.png" },
        { "name": "Parafoil", "url": "https://mk8dxbuilder.com/img/gliders/Parafoil.png" },
        { "name": "Flower Glider", "url": "https://mk8dxbuilder.com/img/gliders/Flower%20Glider.png" },
        { "name": "Bowser Kite", "url": "https://mk8dxbuilder.com/img/gliders/Bowser%20Kite.png" },
        { "name": "Plane Glider", "url": "https://mk8dxbuilder.com/img/gliders/Plane%20Glider.png" },
        { "name": "MKTV Parafoil", "url": "https://mk8dxbuilder.com/img/gliders/MKTV%20Parafoil.png" },
        { "name": "Gold Glider", "url": "https://mk8dxbuilder.com/img/gliders/Gold%20Glider.png" },
        { "name": "Hylian Kite", "url": "https://mk8dxbuilder.com/img/gliders/Hylian%20Kite.png" },
        { "name": "Paraglider", "url": "https://mk8dxbuilder.com/img/gliders/Paraglider.png" },
        { "name": "Paper Glider", "url": "https://mk8dxbuilder.com/img/gliders/Paper%20Glider.png" }
    ]
};

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const stream = fs.createWriteStream(filepath);
                res.pipe(stream);
                stream.on('finish', () => {
                    stream.close();
                    resolve();
                });
            } else {
                res.resume();
                reject(new Error(`Request Failed. Status Code: ${res.statusCode}`));
            }
        }).on('error', (e) => {
            reject(e);
        });
    });
};

const main = async () => {
    for (const [category, items] of Object.entries(imageData)) {
        console.log(`Downloading ${category}...`);
        for (const item of items) {
            const fileName = `${item.name}.png`;
            const filePath = path.join(__dirname, 'public', 'data', 'images', category, fileName);
            try {
                await downloadImage(item.url, filePath);
                console.log(`Downloaded: ${fileName}`);
            } catch (err) {
                console.error(`Failed to download ${fileName}: ${err.message}`);
            }
        }
    }
};

main();
