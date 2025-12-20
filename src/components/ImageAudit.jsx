import React, { useState, useEffect } from 'react';
import { loadAllData } from '../utils/DataLoader';

const AuditRow = ({ category, item }) => {
    const [status, setStatus] = useState('Checking...');
    const imgSrc = `/data/images/${category}/${item.name}.png`;

    return (
        <tr className={`border-b border-gray-700 ${status === 'Missing' ? 'bg-red-900/30' : 'bg-green-900/30'}`}>
            <td className="p-2">{category}</td>
            <td className="p-2 font-mono">{item.name}</td>
            <td className="p-2 text-xs text-gray-400">{imgSrc}</td>
            <td className="p-2">
                <div className="flex items-center gap-2">
                    <img
                        src={imgSrc}
                        alt=""
                        className="w-8 h-8 object-contain bg-gray-800 rounded"
                        onLoad={() => setStatus('Found')}
                        onError={() => setStatus('Missing')}
                    />
                    <span className={status === 'Missing' ? 'text-red-400 font-bold' : 'text-green-400'}>
                        {status}
                    </span>
                </div>
            </td>
        </tr>
    );
};

const ImageAudit = ({ onClose }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        loadAllData().then(setData);
    }, []);

    if (!data) return <div className="p-8 text-white">Loading data for audit...</div>;

    return (
        <div className="fixed inset-0 bg-black/95 z-50 overflow-auto p-4 text-white">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Image Asset Audit Matrix</h2>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                    >
                        Close Debugger
                    </button>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-800 text-gray-300">
                            <th className="p-2">Category</th>
                            <th className="p-2">CSV Name (Expected Filename)</th>
                            <th className="p-2">Path</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.drivers.map(d => <AuditRow key={d.name} category="Drivers" item={d} />)}
                        {data.vehicles.map(v => <AuditRow key={v.name} category="Vehicles" item={v} />)}
                        {data.tires.map(t => <AuditRow key={t.name} category="Tires" item={t} />)}
                        {data.gliders.map(g => <AuditRow key={g.name} category="Gliders" item={g} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ImageAudit;
