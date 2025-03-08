import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFound } from './components/NotFound';
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
const CartilhaDetalhe = React.lazy(() => import('./pages/CartilhaDetalhe'));
const Contato = React.lazy(() => import('./pages/Contato'));

// Layout principal
const Layout = () => (
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
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  </MenuProvider>
);

// Configuração das rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "somos-octo", element: <SomosOcto /> },
      { path: "somos-octo/quem-somos", element: <QuemSomos /> },
      { path: "somos-octo/deficiencias-ocultas", element: <DeficienciasOcultas /> },
      { path: "somos-octo/neurodivergencias", element: <Neurodivergencias /> },
      { path: "somos-octo/diversidade", element: <Diversidade /> },
      { path: "octo-faz", element: <OctoFaz /> },
      { path: "octo-faz/capacita-pcd", element: <CapacitaPcd /> },
      { path: "octo-faz/cuida-pcd", element: <CuidaPcd /> },
      { path: "octo-faz/orienta-pcd", element: <OrientaPcd /> },
      { path: "octo-faz/capacita-empresas", element: <CapacitaEmpresas /> },
      { path: "octo-faz/octo-cultura", element: <OctoCultura /> },
      { path: "octo-com-voce", element: <OctoComVoce /> },
      { path: "octo-com-voce/coluna", element: <ColunaOcto /> },
      { path: "octo-com-voce/selo", element: <SeloOcto /> },
      { path: "noticias", element: <Noticias /> },
      { path: "cartilhas", element: <Cartilhas /> },
      { path: "cartilhas/:id", element: <CartilhaDetalhe /> },
      { path: "contato", element: <Contato /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;