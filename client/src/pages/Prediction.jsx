import React, { useState } from 'react';

function Prediction() {
  const [deviceId, setDeviceId] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [history, setHistory] = useState([]);

  const handlePredict = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call with random data
    setTimeout(() => {
      const riskLevels = ['Low', 'Medium', 'High'];
      const statuses = ['Healthy', 'Warning', 'Critical'];
      const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      const newPrediction = {
        deviceId: deviceId,
        status: randomStatus,
        riskLevel: randomRisk,
        confidence: `${Math.floor(Math.random() * 20) + 80}%`,
        nextMaintenance: `${Math.floor(Math.random() * 60) + 1} days`,
        timestamp: new Date().toLocaleString(),
        metrics: {
          cpu: Math.floor(Math.random() * 40) + 20,
          memory: Math.floor(Math.random() * 40) + 30,
          network: Math.floor(Math.random() * 30) + 60,
          uptime: Math.floor(Math.random() * 20) + 80,
          temperature: Math.floor(Math.random() * 30) + 40,
          bandwidth: Math.floor(Math.random() * 40) + 50
        },
        recommendations: [
          'Continue regular monitoring',
          randomRisk === 'High' ? 'Immediate attention required' : 'Schedule routine maintenance',
          randomStatus === 'Critical' ? 'Check system logs immediately' : 'No immediate action required',
          'Update firmware to latest version',
          'Review security configurations'
        ],
        issues: randomRisk === 'High' ? [
          'High CPU usage detected',
          'Memory leak suspected',
          'Network latency increasing'
        ] : randomRisk === 'Medium' ? [
          'Minor performance degradation',
          'Occasional packet loss'
        ] : [
          'No critical issues detected'
        ]
      };
      
      setPrediction(newPrediction);
      setHistory([newPrediction, ...history.slice(0, 4)]);
      setLoading(false);
    }, 2000);
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Low': return '#2ecc71';
      case 'Medium': return '#f39c12';
      case 'High': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Healthy': return '#2ecc71';
      case 'Warning': return '#f39c12';
      case 'Critical': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const MetricCard = ({ title, value, icon, color }) => (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      textAlign: 'center',
      border: `2px solid ${color}20`,
      transition: 'transform 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ fontSize: '32px', marginBottom: '10px' }}>{icon}</div>
      <h4 style={{ color: '#666', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>{title}</h4>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: `4px solid ${color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
          color: color
        }}>
          {value}%
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '30px', backgroundColor: '#f5f6fa', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#2c3e50', margin: 0, marginBottom: '5px' }}>Network Health Prediction</h1>
          <p style={{ color: '#7f8c8d', margin: 0, fontSize: '14px' }}>AI-powered predictive analysis for network devices</p>
        </div>
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
            📊 View Analytics
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#9b59b6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            📥 Export Report
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '30px' }}>
        {/* Input Form */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          height: 'fit-content'
        }}>
          <h2 style={{ marginBottom: '20px', color: '#2c3e50', fontSize: '20px' }}>Device Analysis</h2>
          <form onSubmit={handlePredict}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '600', fontSize: '14px' }}>
                Device ID / IP Address
              </label>
              <input
                type="text"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                placeholder="e.g., 192.168.1.1 or DEVICE-001"
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '600', fontSize: '14px' }}>
                Analysis Type
              </label>
              <select style={{
                width: '100%',
                padding: '14px',
                border: '2px solid #e1e8ed',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer'
              }}>
                <option>Comprehensive Analysis</option>
                <option>Quick Scan</option>
                <option>Deep Inspection</option>
                <option>Performance Only</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                background: loading ? '#95a5a6' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'transform 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              {loading ? (
                <>
                  <span style={{ 
                    border: '3px solid rgba(255,255,255,0.3)',
                    borderTop: '3px solid white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    animation: 'spin 1s linear infinite'
                  }}></span>
                  Analyzing...
                </>
              ) : (
                <>🔍 Predict Health</>
              )}
            </button>
          </form>

          {/* Quick Actions */}
          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e1e8ed' }}>
            <h3 style={{ fontSize: '14px', color: '#666', marginBottom: '15px', fontWeight: '600' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button style={{
                padding: '10px',
                backgroundColor: '#ecf0f1',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                textAlign: 'left',
                color: '#2c3e50'
              }}>
                📋 View Recent Predictions
              </button>
              <button style={{
                padding: '10px',
                backgroundColor: '#ecf0f1',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                textAlign: 'left',
                color: '#2c3e50'
              }}>
                ⚙️ Configure Thresholds
              </button>
              <button style={{
                padding: '10px',
                backgroundColor: '#ecf0f1',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                textAlign: 'left',
                color: '#2c3e50'
              }}>
                📊 Historical Trends
              </button>
            </div>
          </div>
        </div>

        {/* Results Display */}
        <div>
          {loading && (
            <div style={{
              backgroundColor: 'white',
              padding: '60px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔄</div>
              <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Analyzing Device Health</h3>
              <p style={{ color: '#7f8c8d', fontSize: '14px' }}>Running AI-powered diagnostics...</p>
              <div style={{
                width: '100%',
                height: '4px',
                backgroundColor: '#ecf0f1',
                borderRadius: '2px',
                marginTop: '20px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '50%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #667eea, #764ba2)',
                  animation: 'loading 1.5s ease-in-out infinite'
                }}></div>
              </div>
            </div>
          )}

          {!loading && !prediction && (
            <div style={{
              backgroundColor: 'white',
              padding: '60px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎯</div>
              <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Ready to Analyze</h3>
              <p style={{ color: '#7f8c8d', fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
                Enter a device ID or IP address to start predictive health analysis using our AI-powered system
              </p>
            </div>
          )}

          {!loading && prediction && (
            <div>
              {/* Status Overview */}
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ color: '#2c3e50', margin: 0, marginBottom: '5px' }}>Analysis Results</h2>
                    <p style={{ color: '#7f8c8d', margin: 0, fontSize: '13px' }}>Device: {prediction.deviceId}</p>
                  </div>
                  <div style={{
                    padding: '10px 20px',
                    borderRadius: '20px',
                    backgroundColor: getStatusColor(prediction.status) + '20',
                    color: getStatusColor(prediction.status),
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    {prediction.status}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
                  <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Risk Level</div>
                    <div style={{ 
                      fontSize: '24px', 
                      fontWeight: 'bold', 
                      color: getRiskColor(prediction.riskLevel) 
                    }}>
                      {prediction.riskLevel}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Confidence</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3498db' }}>
                      {prediction.confidence}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Next Maintenance</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9b59b6' }}>
                      {prediction.nextMaintenance}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                marginBottom: '20px'
              }}>
                <h3 style={{ marginBottom: '20px', color: '#2c3e50', fontSize: '18px' }}>Performance Metrics</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                  <MetricCard title="CPU Usage" value={prediction.metrics.cpu} icon="💻" color="#3498db" />
                  <MetricCard title="Memory" value={prediction.metrics.memory} icon="🧠" color="#9b59b6" />
                  <MetricCard title="Network" value={prediction.metrics.network} icon="🌐" color="#2ecc71" />
                  <MetricCard title="Uptime" value={prediction.metrics.uptime} icon="⏱️" color="#1abc9c" />
                  <MetricCard title="Temperature" value={prediction.metrics.temperature} icon="🌡️" color="#e67e22" />
                  <MetricCard title="Bandwidth" value={prediction.metrics.bandwidth} icon="📡" color="#e74c3c" />
                </div>
              </div>

              {/* Issues & Recommendations */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '25px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}>
                  <h3 style={{ marginBottom: '15px', color: '#2c3e50', fontSize: '18px' }}>Detected Issues</h3>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: '#555', lineHeight: '2' }}>
                    {prediction.issues.map((issue, index) => (
                      <li key={index} style={{ fontSize: '14px' }}>{issue}</li>
                    ))}
                  </ul>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  padding: '25px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}>
                  <h3 style={{ marginBottom: '15px', color: '#2c3e50', fontSize: '18px' }}>Recommendations</h3>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: '#555', lineHeight: '2' }}>
                    {prediction.recommendations.slice(0, 3).map((rec, index) => (
                      <li key={index} style={{ fontSize: '14px' }}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Predictions History */}
      {history.length > 0 && (
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          marginTop: '20px'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#2c3e50', fontSize: '18px' }}>Recent Predictions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
            {history.map((item, index) => (
              <div key={index} style={{
                padding: '15px',
                border: '1px solid #e1e8ed',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3498db';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e1e8ed';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong style={{ fontSize: '14px', color: '#2c3e50' }}>{item.deviceId}</strong>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '10px',
                    backgroundColor: getRiskColor(item.riskLevel) + '20',
                    color: getRiskColor(item.riskLevel),
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}>
                    {item.riskLevel}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#7f8c8d' }}>{item.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}

export default Prediction;
