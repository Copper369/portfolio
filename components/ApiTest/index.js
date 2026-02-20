import React, { useState } from 'react';
import api from '../../utils/api';

const ApiTest = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const testBackendConnection = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.get('/health');
            setResponse(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
            <h3>Backend API Test</h3>
            <button onClick={testBackendConnection} disabled={loading}>
                {loading ? 'Testing...' : 'Test Backend Connection'}
            </button>
            
            {response && (
                <div style={{ marginTop: '10px', color: 'green' }}>
                    <strong>Success:</strong>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            
            {error && (
                <div style={{ marginTop: '10px', color: 'red' }}>
                    <strong>Error:</strong> {error}
                </div>
            )}
        </div>
    );
};

export default ApiTest;
