import Papa from 'papaparse';

export const loadData = async (fileName) => {
    const response = await fetch(`./data/${fileName}`);
    const csvText = await response.text();
    return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
                // Normalize data: ensure 'name' property exists
                const data = results.data.map(item => {
                    // Identify the name field (it varies by file: Driver, Vehicle, Tire, Glider)
                    // Also handle the potential empty first column if it exists in raw csv
                    const name = item.Driver || item.Vehicle || item.Tire || item.Glider || item.Name;
                    return { ...item, name };
                });
                resolve(data);
            },
            error: (error) => reject(error),
        });
    });
};

export const loadAllData = async () => {
    try {
        const [drivers, vehicles, tires, gliders] = await Promise.all([
            loadData('DRIVERS.csv'),
            loadData('VEHICLES.csv'),
            loadData('TIRES.csv'),
            loadData('GLIDERS.csv')
        ]);
        return { drivers, vehicles, tires, gliders };
    } catch (error) {
        console.error("Failed to load data:", error);
        return { drivers: [], vehicles: [], tires: [], gliders: [] };
    }
};
