import React, { useState } from 'react';

function Prediction() {
  const [deviceId, setDeviceId] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setPrediction({
        deviceId: deviceId,
        status: 'Healthy',
        riskLevel: 'Low',
        confidence: '95%',
        nextMaintenance: '30 days',
        recommendations: [
          'Continue regular monitoring',
          'Schedule routine maintenance in 30 days',
          'No immediate action required'
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f5f6fa', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '30px', color: '#2c3e50' }}>Network Health Prediction</h1>
      
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '600px'
      }}>
        <form onSubmit={handlePredict}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold' }}>
              Device ID or IP Address
            </label>
            <input
              type="text"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              placeholder="e.g., 192.168.1.1 or DEVICE-001"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? '#95a5a6' : '#3498db',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Analyzing...' : 'Predict Health'}
          </button>
        </form>
      </div>

      {prediction && (
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          marginTop: '20px'
        }}>
          <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Prediction Results</h2>
          <div style={{ marginBottom: '15px' }}>
            <strong>Device:</strong> {prediction.deviceId}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Status:</strong> <span style={{ color: '#2ecc71' }}>{prediction.status}</span>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Risk Level:</strong> <span style={{ color: '#2ecc71' }}>{prediction.riskLevel}</span>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Confidence:</strong> {prediction.confidence}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Next Maintenance:</strong> {prediction.nextMaintenance}
          </div>
          <div>
            <strong>Recommendations:</strong>
            <ul style={{ marginTop: '10px', color: '#666' }}>
              {prediction.recommendations.map((rec, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Prediction;
