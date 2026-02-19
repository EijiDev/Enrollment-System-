import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/LoginForm';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginForm />} />
                
                {/* Dashboard routes (to be implemented) */}
                <Route path="/admin/dashboard" element={<div style={dashboardStyle}>Admin Dashboard - Coming Soon!</div>} />
                <Route path="/teacher/dashboard" element={<div style={dashboardStyle}>Teacher Dashboard - Coming Soon!</div>} />
                <Route path="/student/dashboard" element={<div style={dashboardStyle}>Student Dashboard - Coming Soon!</div>} />
            </Routes>
        </BrowserRouter>
    );
}

const dashboardStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
};

export default App;