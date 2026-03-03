import React, { useState, useEffect } from 'react';

function History() {
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Simulate fetching history data with more entries
    const data = [
      { id: 1, timestamp: '2026-02-26 10:30:45', device: '192.168.1.1', event: 'Auto-healing applied', status: 'Success', details: 'Router configuration restored' },
      { id: 2, timestamp: '2026-02-26 09:15:22', device: '192.168.1.45', event: 'High latency detected', status: 'Warning', details: 'Latency: 250ms' },
      { id: 3, timestamp: '2026-02-26 08:00:10', device: '192.168.1.23', event: 'Network scan completed', status: 'Success', details: 'All devices healthy' },
      { id: 4, timestamp: '2026-02-25 22:45:33', device: '192.168.1.67', event: 'Device offline', status: 'Error', details: 'Connection timeout' },
      { id: 5, timestamp: '2026-02-25 20:30:18', device: '192.168.1.89', event: 'Backup completed', status: 'Success', details: 'Full system backup' },
      { id: 6, timestamp: '2026-02-25 18:20:55', device: '192.168.1.12', event: 'Firmware update', status: 'Success', details: 'Version 2.4.1 installed' },
      { id: 7, timestamp: '2026-02-25 16:10:40', device: '192.168.1.34', event: 'Security scan', status: 'Success', details: 'No threats detected' },
      { id: 8, timestamp: '2026-02-25 14:05:25', device: '192.168.1.56', event: 'Bandwidth exceeded', status: 'Warning', details: '95% utilization' },
      { id: 9, timestamp: '2026-02-25 12:00:12', device: '192.168.1.78', event: 'Configuration change', status: 'Info', details: 'VLAN settings updated' },
      { id: 10, timestamp: '2026-02-25 10:30:08', device: '192.168.1.90', event: 'Device restarted', status: 'Info', details: 'Scheduled maintenance' },
      { id: 11, timestamp: '2026-02-25 08:15:45', device: '192.168.1.15', event: 'Port scan detected', status: 'Warning', details: 'Possible security threat' },
      { id: 12, timestamp: '2026-02-25 06:00:30', device: '192.168.1.25', event: 'Backup failed', status: 'Error', details: 'Insufficient storage' },
      { id: 13, timestamp: '2026-02-24 23:45:20', device: '192.168.1.35', event: 'Auto-healing applied', status: 'Success', details: 'DNS configuration fixed' },
      { id: 14, timestamp: '2026-02-24 21:30:15', device: '192.168.1.50', event: 'Network optimization', status: 'Success', details: 'QoS rules applied' },
      { id: 15, timestamp: '2026-02-24 19:15:10', device: '192.168.1.60', event: 'Certificate renewal', status: 'Success', details: 'SSL certificate updated' }
    ];
    setHistoryData(data);
    setFilteredData(data);
  }, []);

  useEffect(() => {
    let filtered = historyData;

    // Filter by status
    if (filterStatus !== 'All') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [filterStatus, searchTerm, historyData]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Success': return '#2ecc71';
      case 'Warning': return '#f39c12';
      case 'Error': return '#e74c3c';
      case 'Info': return '#3498db';
      default: return '#95a5a6';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Success': return '✓';
      case 'Warning': return '⚠';
      case 'Error': return '✗';
      case 'Info': return 'ℹ';
      default: return '•';
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Statistics
  const stats = {
    total: historyData.length,
    success: historyData.filter(item => item.status === 'Success').length,
    warning: historyData.filter(item => item.status === 'Warning').length,
    error: historyData.filter(item => item.status === 'Error').length,
    info: historyData.filter(item => item.status === 'Info').length
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f5f6fa', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50', margin: 0 }}>Network History</h1>
        <button style={{
          padding: '10px 20px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          Export Report
        </button>
      </div>

      {/* Statistics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        marginBottom: '25px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          textAlign: 'center',
          borderTop: '3px solid #3498db'
        }}>
          <h3 style={{ color: '#666', fontSize: '12px', margin: '0 0 10px 0' }}>TOTAL EVENTS</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#3498db', margin: 0 }}>{stats.total}</p>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          textAlign: 'center',
          borderTop: '3px solid #2ecc71'
        }}>
          <h3 style={{ color: '#666', fontSize: '12px', margin: '0 0 10px 0' }}>SUCCESS</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#2ecc71', margin: 0 }}>{stats.success}</p>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          textAlign: 'center',
          borderTop: '3px solid #f39c12'
        }}>
          <h3 style={{ color: '#666', fontSize: '12px', margin: '0 0 10px 0' }}>WARNINGS</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#f39c12', margin: 0 }}>{stats.warning}</p>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          textAlign: 'center',
          borderTop: '3px solid #e74c3c'
        }}>
          <h3 style={{ color: '#666', fontSize: '12px', margin: '0 0 10px 0' }}>ERRORS</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#e74c3c', margin: 0 }}>{stats.error}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: '20px',
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div style={{ flex: '1', minWidth: '250px' }}>
          <input
            type="text"
            placeholder="Search by device, event, or details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 15px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['All', 'Success', 'Warning', 'Error', 'Info'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                padding: '8px 16px',
                backgroundColor: filterStatus === status ? '#3498db' : 'white',
                color: filterStatus === status ? 'white' : '#666',
                border: '1px solid #ddd',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: filterStatus === status ? 'bold' : 'normal'
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* History Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#34495e', color: 'white' }}>
                <th style={{ padding: '15px', textAlign: 'left', fontSize: '13px', fontWeight: '600' }}>TIMESTAMP</th>
                <th style={{ padding: '15px', textAlign: 'left', fontSize: '13px', fontWeight: '600' }}>DEVICE</th>
                <th style={{ padding: '15px', textAlign: 'left', fontSize: '13px', fontWeight: '600' }}>EVENT</th>
                <th style={{ padding: '15px', textAlign: 'left', fontSize: '13px', fontWeight: '600' }}>DETAILS</th>
                <th style={{ padding: '15px', textAlign: 'center', fontSize: '13px', fontWeight: '600' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item.id} style={{ 
                    borderBottom: '1px solid #ecf0f1',
                    backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa'
                  }}>
                    <td style={{ padding: '15px', color: '#555', fontSize: '13px' }}>{item.timestamp}</td>
                    <td style={{ padding: '15px', color: '#555', fontSize: '13px', fontWeight: '500' }}>{item.device}</td>
                    <td style={{ padding: '15px', color: '#2c3e50', fontSize: '13px' }}>{item.event}</td>
                    <td style={{ padding: '15px', color: '#7f8c8d', fontSize: '12px' }}>{item.details}</td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <span style={{
                        padding: '6px 16px',
                        borderRadius: '20px',
                        backgroundColor: getStatusColor(item.status) + '20',
                        color: getStatusColor(item.status),
                        fontWeight: 'bold',
                        fontSize: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        <span>{getStatusIcon(item.status)}</span>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#95a5a6' }}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{
            padding: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            borderTop: '1px solid #ecf0f1'
          }}>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '8px 16px',
                backgroundColor: currentPage === 1 ? '#ecf0f1' : '#3498db',
                color: currentPage === 1 ? '#95a5a6' : 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: '13px'
              }}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: currentPage === index + 1 ? '#3498db' : 'white',
                  color: currentPage === index + 1 ? 'white' : '#666',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: currentPage === index + 1 ? 'bold' : 'normal'
                }}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: '8px 16px',
                backgroundColor: currentPage === totalPages ? '#ecf0f1' : '#3498db',
                color: currentPage === totalPages ? '#95a5a6' : 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontSize: '13px'
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Results Info */}
      <div style={{ 
        marginTop: '15px', 
        textAlign: 'center', 
        color: '#7f8c8d',
        fontSize: '13px'
      }}>
        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
      </div>
    </div>
  );
}

export default History;
