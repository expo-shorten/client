import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './layout';
import { MainPage } from './pages/main';
import { SummaryPage } from './pages/summary';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<MainPage />} />
        <Route path='summary' element={<SummaryPage />} />
      </Route>
    </Routes>
  );
}

export default App;
