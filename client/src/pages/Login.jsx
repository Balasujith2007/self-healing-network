import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleDemoLogin = () => {
    setUsername('demo@network.com');
    setPassword('demo123');
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', 'demo@network.com');
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div style={{ 
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f6fa'
    }}>
      {/* Left Side - Branding */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          top: '-100px',
          right: '-100px'
        }}></div>
        <div style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          bottom: '-50px',
          left: '-50px'
        }}></div>

        <div style={{ zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '72px', marginBottom: '20px' }}>🌐</div>
          <h1 style={{ fontSize: '48px', marginBottom: '20px', fontWeight: 'bold' }}>
            Self-Healing Network
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '400px', lineHeight: '1.6' }}>
            Intelligent network monitoring and automated healing system for enterprise infrastructure
          </p>
          <div style={{ marginTop: '40px', display: 'flex', gap: '30px', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>99.9%</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>Uptime</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>24/7</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>Monitoring</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>Auto</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>Healing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '50px',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '450px'
        }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '32px', 
              marginBottom: '10px', 
              color: '#2c3e50',
              fontWeight: 'bold'
            }}>
              Welcome Back
            </h2>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
              Sign in to access your network dashboard
            </p>
          </div>

          {error && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#fee',
              border: '1px solid #fcc',
              borderRadius: '8px',
              color: '#c33',
              fontSize: '14px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>⚠</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: '#2c3e50',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                Username or Email
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '8px',
                  fontSize: '15px',
                  transition: 'border-color 0.3s',
                  outline: 'none'
                }}
                placeholder="Enter your username"
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: '#2c3e50',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    paddingRight: '45px',
                    border: '2px solid #e1e8ed',
                    borderRadius: '8px',
                    fontSize: '15px',
                    transition: 'border-color 0.3s',
                    outline: 'none'
                  }}
                  placeholder="Enter your password"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    padding: '5px'
                  }}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '28px'
            }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                fontSize: '14px',
                color: '#555'
              }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ marginRight: '8px', cursor: 'pointer' }}
                />
                Remember me
              </label>
              <a href="#" style={{ 
                color: '#667eea', 
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '16px',
                background: isLoading ? '#95a5a6' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'transform 0.2s',
                marginBottom: '16px'
              }}
              onMouseEnter={(e) => !isLoading && (e.target.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: 'white',
                color: '#667eea',
                border: '2px solid #667eea',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#667eea';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#667eea';
              }}
            >
              Try Demo Account
            </button>
          </form>

          <div style={{ 
            marginTop: '30px', 
            textAlign: 'center',
            paddingTop: '30px',
            borderTop: '1px solid #e1e8ed'
          }}>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
              Don't have an account? <a href="#" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>Sign up</a>
            </p>
          </div>

          <div style={{ 
            marginTop: '30px', 
            display: 'flex',
            justifyContent: 'center',
            gap: '20px'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: '#f5f6fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#e1e8ed'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f5f6fa'}
            >
              🔐
            </div>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: '#f5f6fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#e1e8ed'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f5f6fa'}
            >
              🔒
            </div>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: '#f5f6fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#e1e8ed'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f5f6fa'}
            >
              🛡️
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
