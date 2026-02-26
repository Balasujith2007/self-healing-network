import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [networkStats, setNetworkStats] = useState({
    totalDevices: 0,
    activeDevices: 0,
    alerts: 0,
    uptime: '99.9%'
  });

  useEffect(() => {
    // Simulate fetching network stats
    setNetworkStats({
      totalDevices: 150,
      activeDevices: 147,
      alerts: 3,
      uptime: '99.9%'
    });
  }, []);

  const StatCard = ({ title, value, color }) => (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      textAlign: 'center',
      borderTop: `4px solid ${color}`
    }}>
      <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>{title}</h3>
      <p style={{ fontSize: '32px', fontWeight: 'bold', color: color, margin: 0 }}>{value}</p>
    </div>
  );

  return (
    <div style={{ padding: '30px', backgroundColor: '#f5f6fa', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '30px', color: '#2c3e50' }}>Network Dashboard</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <StatCard title="Total Devices" value={networkStats.totalDevices} color="#3498db" />
        <StatCard title="Active Devices" value={networkStats.activeDevices} color="#2ecc71" />
        <StatCard title="Alerts" value={networkStats.alerts} color="#e74c3c" />
        <StatCard title="Uptime" value={networkStats.uptime} color="#9b59b6" />
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Recent Activity</h2>
        <div style={{ color: '#666' }}>
          <p>✓ Network scan completed - All devices healthy</p>
          <p>⚠ Device 192.168.1.45 - High latency detected</p>
          <p>✓ Auto-healing applied to Router-03</p>
          <p>✓ Backup completed successfully</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
