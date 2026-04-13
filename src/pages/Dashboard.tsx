import { useState } from 'react'; 
import { useAuth } from '../features/auth/AuthContext'; 
import useProjects from '../hooks/useProjects'; 
import Header from '../components/Header'; 
import Sidebar from '../components/Sidebar'; 
import MainContent from '../components/MainContent'; 
import ProjectForm from '../components/ProjectForm';
import styles from './Dashboard.module.css'; 
  
export default function Dashboard() { 
  const { state: authState, dispatch } = useAuth(); 
  const [sidebarOpen, setSidebarOpen] = useState(true); 
  const [showForm, setShowForm] = useState(false); 
  const { projects, columns, loading, error, addProject } = useProjects(); 
  
  if (loading) return <div className={styles.loading}>Chargement...</div>; 
  
  return ( 
    <div className={styles.layout}> 
      <Header 
        title="TaskFlow" 
        onMenuClick={() => setSidebarOpen(p => !p)} 
        userName={authState.user?.name} 
        onLogout={() => dispatch({ type: 'LOGOUT' })} 
      /> 
      <div className={styles.body}> 
        <Sidebar projects={projects} isOpen={sidebarOpen} /> 
        <div className={styles.content}> 
          <div className={styles.toolbar}> 
            {!showForm ? ( 
              <button className={styles.addBtn} 
                onClick={() => setShowForm(true)}> 
                + Nouveau projet 
              </button> 
            ) : ( 
              <ProjectForm 
                submitLabel="Créer" 
                onSubmit={(name: string, color: string) => { 
                  addProject(name, color); 
                  setShowForm(false); 
                }} 
                onCancel={() => setShowForm(false)} 
              /> 
            )} 
          </div> 
          {error ? <div className={styles.error}>{error}</div> : null} 
          <MainContent columns={columns} /> 
        </div> 
      </div> 
    </div> 
  );}