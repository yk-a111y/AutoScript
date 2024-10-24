import { createRoot } from 'react-dom/client';
import DashboardApp from './App.tsx';
import '~/assets/css/tailwind.css';

createRoot(document.getElementById('root')!).render(<DashboardApp />);
