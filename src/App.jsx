import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

import Dashboard from './pages/Dashboard';
import Auditorias from './pages/Auditorias';
import Auditoria from './pages/Auditoria';
import NaoConformidades from './pages/NaoConformidades';
import ChecklistAdmin from './pages/ChecklistAdmin';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      {}
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auditorias" element={<Auditorias />} />
          <Route path="/auditoria/:id" element={<Auditoria />} />
          <Route path="/nao-conformidades" element={<NaoConformidades />} />
          <Route path="/admin/checklist" element={<ChecklistAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;