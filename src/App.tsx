import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Index from './pages/Index';
import PreCheck from './pages/PreCheck';
import NAAC from './pages/NAAC';
import NBA from './pages/NBA';
import NIRF from './pages/NIRF';
import RequestDemo from './pages/RequestDemo';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/precheck" element={<PreCheck />} />
          <Route path="/naac" element={<NAAC />} />
          <Route path="/nba" element={<NBA />} />
          <Route path="/nirf" element={<NIRF />} />
          <Route path="/request-demo" element={<RequestDemo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;