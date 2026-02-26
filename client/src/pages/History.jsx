import React, { useState, useEffect } from 'react';

function History() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Simulate fetching history data
    setHistoryData([
      { id: 1, timestamp: '2026-02-26 10:30', device: '192.168.1.1', event: 'Auto-healing applied', status: 'Success' },
      { id: 2, timestamp: '2026-02-26 09:15', device: '192.168.1.45', event: 'High latency detected', status: 'Warning' },
      { id: 3, timestamp: '2026-02-26 08:00', device: '192.168.1.23', event: 'Network scan completed', status: 'Success' },
      { id: 4, timestamp: '2026-02-25 22:45', device: '192.168.1.67', event: 'Device offline', status: 'Error' },
      { id: 5, timestamp: '2026-02-25 20:30', device: '192.168.1.89', event: 'Backup completed', status: 'Success' }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Success': return '#2ecc71';
      case 'Warning': return '#f39c12';
      case 'Error': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f5f6fa', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '30px', color: '#2c3e50' }}>Network History</h1>
      
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#34495e', color: 'white' }}>
              <th style={{ padding: '15px', textAlign: 'left' }}>Timestamp</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Device</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Event</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                <td style={{ padding: '15px', color: '#555' }}>{item.timestamp}</td>
                <td style={{ padding: '15px', color: '#555' }}>{item.device}</td>
                <td style={{ padding: '15px', color: '#555' }}>{item.event}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{
                    padding: '5px 15px',
                    borderRadius: '20px',
                    backgroundColor: getStatusColor(item.status) + '20',
                    color: getStatusColor(item.status),
                    fontWeight: 'bold',
                    fontSize: '12px'
                  }}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
