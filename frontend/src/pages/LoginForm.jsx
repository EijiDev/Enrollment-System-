import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/utils/api.js';

function LoginForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authAPI.login(formData);
            const { user } = response.data;

            // Redirect based on role
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else if (user.role === 'teacher') {
                navigate('/teacher/dashboard');
            } else if (user.role === 'student') {
                navigate('/student/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>SHS Enrollment System</h1>
                <h2 style={styles.subtitle}>Login</h2>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={styles.input}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={styles.input}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.button,
                            opacity: loading ? 0.6 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div style={styles.links}>
                    <p>New student? <a href="/register/student" style={styles.link}>Register here</a></p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
    },
    card: {
        background: 'white',
        borderRadius: '10px',
        padding: '40px',
        maxWidth: '450px',
        width: '100%',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
    },
    title: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '10px',
        fontSize: '24px'
    },
    subtitle: {
        textAlign: 'center',
        color: '#666',
        marginBottom: '30px',
        fontSize: '20px'
    },
    error: {
        background: '#fee',
        color: '#c33',
        padding: '12px',
        borderRadius: '5px',
        marginBottom: '20px',
        border: '1px solid #fcc'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        fontWeight: '600',
        color: '#333',
        fontSize: '14px'
    },
    input: {
        padding: '12px',
        border: '2px solid #e0e0e0',
        borderRadius: '5px',
        fontSize: '16px',
        transition: 'border-color 0.3s',
        outline: 'none'
    },
    button: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '14px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: '600',
        marginTop: '10px',
        transition: 'transform 0.2s'
    },
    links: {
        marginTop: '20px',
        textAlign: 'center',
        color: '#666'
    },
    link: {
        color: '#667eea',
        textDecoration: 'none',
        fontWeight: '600'
    }
};

export default LoginForm;