import { useState, useEffect } from 'react';
import { useAuth } from './features/auth/AuthContext';
import Login from './features/auth/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

export default function App() {
  const { state } = useAuth();

  if (!state.user) {
    return <Login />;
  }

  return <Dashboard />;
}

function Dashboard() {
  const { state, dispatch } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projects, setProjects] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [p, c] = await Promise.all([
        fetch('http://localhost:4000/projects'),
        fetch('http://localhost:4000/columns'),
      ]);

      setProjects(await p.json());
      setColumns(await c.json());
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header
        title="TaskFlow"
        userName={state.user?.name}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onLogout={() => dispatch({ type: 'LOGOUT' })}
      />

      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar projects={projects} isOpen={sidebarOpen} />
        <MainContent columns={columns} />
      </div>
    </div>
  );
}