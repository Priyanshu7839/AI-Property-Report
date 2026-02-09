
import { BrowserRouter } from 'react-router-dom';
import Routers from './Routes';
import { Toaster } from 'sonner';
import PageTracker from './GoogleAnalytics/PageTracker';

export default function App() {
 

 

  return (
    <BrowserRouter>
          <Toaster position="top-center"  richColors />
          <PageTracker/>
          <Routers/>
    </BrowserRouter>
  );
}