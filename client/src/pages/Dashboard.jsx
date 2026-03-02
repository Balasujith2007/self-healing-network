import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [networkStats, setNetworkStats] = useState({
    totalDevices: 0,
    activeDevices: 0,
    alerts: 0,
    uptime: '99.9%',
    bandwidth: '0 Mbps',
    packetLoss: '0%'
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [criticalAlerts, setCriticalAlerts] = useState([]);

  useEffect(() => {
    // Simulate fetching network stats
    setNetworkStats({
      totalDevices: 150,
      activeDevices: 147,
      alerts: 3,
      uptime: '99.9%',
      bandwidth: '850 Mbps',
      packetLoss: '0.02%'
    });

    setRecentActivity([
      { id: 1, time: '2 mins ago', message: 'Network scan completed - All devices healthy', type: 'success' },
      { id: 2, time: '15 mins ago', message: 'Device 192.168.1.45 - High latency detected', type: 'warning' },
      { id: 3, time: '1 hour ago', message: 'Auto-healing applied to Router-03', type: 'success' },
      { id: 4, time: '2 hours ago', message: 'Backup completed successfully', type: 'success' },
      { id: 5, time: '3 hours ago', message: 'Firmware update applied to Switch-12', type: 'info' }
    ]);

    setCriticalAlerts([
      { id: 1, device: '192.168.1.45', issue: 'High Latency', severity: 'Medium' },
      { id: 2, device: '192.168.1.89', issue: 'Connection Timeout', severity: 'High' },
      { id: 3, device: '192.168.1.23', issue: 'Low Bandwidth', severity: 'Low' }
    ]);
  }, []);

  const StatCard = ({ title, value, color, icon }) => (
    <div style={{
      backgroundColor: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      textAlign: 'center',
      borderLeft: `5px solid ${color}`,
      transition: 'transform 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ fontSize: '32px', marginBottom: '10px' }}>{icon}</div>
      <h3 style={{ color: '#666', fontSize: '13px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</h3>
      <p style={{ fontSize: '36px', fontWeight: 'bold', color: color, margin: 0 }}>{value}</p>
    </div>
  );

  const getActivityIcon = (type) => {
    switch(type) {
      case 'success': return '✓';
      case 'warning': return '⚠';
      case 'error': return '✗';
      case 'info': return 'ℹ';
      default: return '•';
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'success': return '#2ecc71';
      case 'warning': return '#f39c12';
      case 'error': return '#e74c3c';
      case 'info': return '#3498db';
      default: return '#95a5a6';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return '#e74c3c';
      case 'Medium': return '#f39c12';
      case 'Low': return '#3498db';
      default: return '#95a5a6';
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f5f6fa', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50', margin: 0 }}>Network Dashboard</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            Refresh Data
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            Run Scan
          </button>
        </div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <StatCard title="Total Devices" value={networkStats.totalDevices} color="#3498db" icon="🖥️" />
        <StatCard title="Active Devices" value={networkStats.activeDevices} color="#2ecc71" icon="✓" />
        <StatCard title="Alerts" value={networkStats.alerts} color="#e74c3c" icon="⚠" />
        <StatCard title="Uptime" value={networkStats.uptime} color="#9b59b6" icon="⏱️" />
        <StatCard title="Bandwidth" value={networkStats.bandwidth} color="#1abc9c" icon="📊" />
        <StatCard title="Packet Loss" value={networkStats.packetLoss} color="#e67e22" icon="📉" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ marginBottom: '20px', color: '#2c3e50', fontSize: '20px' }}>Recent Activity</h2>
          <div>
            {recentActivity.map((activity) => (
              <div key={activity.id} style={{
                padding: '15px',
                borderBottom: '1px solid #ecf0f1',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <span style={{
                  fontSize: '20px',
                  color: getActivityColor(activity.type),
                  fontWeight: 'bold'
                }}>
                  {getActivityIcon(activity.type)}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: '#2c3e50', fontSize: '14px' }}>{activity.message}</p>
                  <p style={{ margin: '5px 0 0 0', color: '#95a5a6', fontSize: '12px' }}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ marginBottom: '20px', color: '#2c3e50', fontSize: '20px' }}>Critical Alerts</h2>
          <div>
            {criticalAlerts.map((alert) => (
              <div key={alert.id} style={{
                padding: '15px',
                marginBottom: '10px',
                backgroundColor: '#fff5f5',
                borderRadius: '8px',
                borderLeft: `4px solid ${getSeverityColor(alert.severity)}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <strong style={{ color: '#2c3e50', fontSize: '14px' }}>{alert.device}</strong>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '12px',
                    backgroundColor: getSeverityColor(alert.severity),
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}>
                    {alert.severity}
                  </span>
                </div>
                <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>{alert.issue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#2c3e50', fontSize: '20px' }}>Network Health Overview</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🟢</div>
            <h3 style={{ color: '#2ecc71', margin: '10px 0' }}>Excellent</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>Network Performance</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔒</div>
            <h3 style={{ color: '#3498db', margin: '10px 0' }}>Secure</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>Security Status</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>⚡</div>
            <h3 style={{ color: '#f39c12', margin: '10px 0' }}>Active</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>Auto-Healing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
