import React, { Suspense } from 'react';
import { Routes, Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Loading from './components/Loading';
import { MenuProvider } from './contexts/MenuContext';

// Lazy loading dos componentes de página
const Home = React.lazy(() => import('./pages/Home'));
const SomosOcto = React.lazy(() => import('./pages/SomosOcto'));
const QuemSomos = React.lazy(() => import('./pages/somos-octo/QuemSomos'));
const DeficienciasOcultas = React.lazy(() => import('./pages/somos-octo/DeficienciasOcultas'));
const Neurodivergencias = React.lazy(() => import('./pages/somos-octo/Neurodivergencias'));
const Diversidade = React.lazy(() => import('./pages/somos-octo/Diversidade'));
const OctoFaz = React.lazy(() => import('./pages/OctoFaz'));
const CapacitaPcd = React.lazy(() => import('./pages/octo-faz/CapacitaPcd'));
const CuidaPcd = React.lazy(() => import('./pages/octo-faz/CuidaPcd'));
const OrientaPcd = React.lazy(() => import('./pages/octo-faz/OrientaPcd'));
const CapacitaEmpresas = React.lazy(() => import('./pages/octo-faz/CapacitaEmpresas'));
const OctoCultura = React.lazy(() => import('./pages/octo-faz/OctoCultura'));
const OctoComVoce = React.lazy(() => import('./pages/OctoComVoce'));
const ColunaOcto = React.lazy(() => import('./pages/octo-com-voce/ColunaOcto'));
const SeloOcto = React.lazy(() => import('./pages/octo-com-voce/SeloOcto'));
const Noticias = React.lazy(() => import('./pages/Noticias'));
const Cartilhas = React.lazy(() => import('./pages/Cartilhas'));
const Contato = React.lazy(() => import('./pages/Contato'));

// Configuração das rotas
const routes = createRoutesFromElements(
  <Route
    element={
      <MenuProvider>
        <div className="min-h-screen flex flex-col">
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-[#972ae6] focus:outline-none focus:ring-2 focus:ring-[#972ae6]"
          >
            Pular para o conteúdo principal
          </a>
          <Header />
          <main id="main-content" className="flex-grow pt-20" role="main">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/somos-octo" element={<SomosOcto />} />
                <Route path="/somos-octo/quem-somos" element={<QuemSomos />} />
                <Route path="/somos-octo/deficiencias-ocultas" element={<DeficienciasOcultas />} />
                <Route path="/somos-octo/neurodivergencias" element={<Neurodivergencias />} />
                <Route path="/somos-octo/diversidade" element={<Diversidade />} />
                <Route path="/octo-faz" element={<OctoFaz />} />
                <Route path="/octo-faz/capacita-pcd" element={<CapacitaPcd />} />
                <Route path="/octo-faz/cuida-pcd" element={<CuidaPcd />} />
                <Route path="/octo-faz/orienta-pcd" element={<OrientaPcd />} />
                <Route path="/octo-faz/capacita-empresas" element={<CapacitaEmpresas />} />
                <Route path="/octo-faz/octo-cultura" element={<OctoCultura />} />
                <Route path="/octo-com-voce" element={<OctoComVoce />} />
                <Route path="/octo-com-voce/coluna" element={<ColunaOcto />} />
                <Route path="/octo-com-voce/selo" element={<SeloOcto />} />
                <Route path="/noticias" element={<Noticias />} />
                <Route path="/cartilhas" element={<Cartilhas />} />
                <Route path="/contato" element={<Contato />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </MenuProvider>
    }
  />
);

// Configuração do router com flags futuras
const router = createBrowserRouter(routes, {
  future: {
    // @ts-expect-error - Flags futuras do React Router v7 ainda não tipadas
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;