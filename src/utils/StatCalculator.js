export const calculateStats = (driver, vehicle, tire, glider) => {
    if (!driver || !vehicle || !tire || !glider) return null;

    const parts = [driver, vehicle, tire, glider];

    // Initialize stats object with basic stats
    const stats = {
        GroundSpeed: 0,
        WaterSpeed: 0,
        AirSpeed: 0,
        AntiGravitySpeed: 0,
        Acceleration: 0,
        Weight: 0,
        GroundHandling: 0,
        WaterHandling: 0,
        AirHandling: 0,
        AntiGravityHandling: 0,
        Traction: 0,
        MiniTurbo: 0
    };

    const numericKeys = Object.keys(stats);

    parts.forEach(part => {
        numericKeys.forEach(key => {
            const value = part[key] !== undefined ? part[key] : 0;
            stats[key] += value;
        });
    });

    // Derived Stats Calculations
    // Note: Standard Deviation for 'Balance' based on "basic stats". 
    // The notebook says: "data_columns = list(combos.columns[4:-1])" which implies all the basic stats columns in the CSV.
    // Usually these are: Speed (all 4), Accel, Weight, Handling (all 4), Traction, MiniTurbo. Total 12 stats.

    const basicStatsList = [
        stats.GroundSpeed, stats.WaterSpeed, stats.AirSpeed, stats.AntiGravitySpeed,
        stats.Acceleration, stats.Weight,
        stats.GroundHandling, stats.WaterHandling, stats.AirHandling, stats.AntiGravityHandling,
        stats.Traction, stats.MiniTurbo
    ];

    // Standard Deviation Helper
    const calculateStdDev = (arr) => {
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const squareDiffs = arr.map(v => Math.pow(v - mean, 2));
        const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / arr.length;
        return Math.sqrt(avgSquareDiff);
    };

    stats.Total = basicStatsList.reduce((a, b) => a + b, 0);
    stats.Balance = 5.0 - calculateStdDev(basicStatsList);

    stats.AverageSpeed = (stats.GroundSpeed + stats.WaterSpeed + stats.AirSpeed + stats.AntiGravitySpeed) / 4.0;

    stats.WeightedSpeed = (stats.GroundSpeed * 4 + stats.WaterSpeed * 2 + stats.AirSpeed + stats.AntiGravitySpeed * 3) / 10.0;

    stats.AverageHandling = (stats.GroundHandling + stats.WaterHandling + stats.AirHandling + stats.AntiGravityHandling) / 4.0;

    stats.WeightedHandling = (stats.GroundHandling * 4 + stats.WaterHandling * 2 + stats.AirHandling + stats.AntiGravityHandling * 3) / 10.0;

    stats.GroundMastery = (stats.GroundSpeed + stats.GroundHandling) / 2.0;
    stats.WaterMastery = (stats.WaterSpeed + stats.WaterHandling) / 2.0;
    stats.AirMastery = (stats.AirSpeed + stats.AirHandling) / 2.0;
    stats.AntiGravityMastery = (stats.AntiGravitySpeed + stats.AntiGravityHandling) / 2.0;

    // Notebook says: DriftMastery = (AverageHandling + Traction + MiniTurbo) / 3.0
    stats.DriftMastery = (stats.AverageHandling + stats.Traction + stats.MiniTurbo) / 3.0;

    stats.CollisionMastery = (stats.Weight + stats.GroundHandling) / 2.0;

    return stats;
};

// Helper to format stats for display (if needed)
export const formatStat = (val) => val.toFixed(2);
