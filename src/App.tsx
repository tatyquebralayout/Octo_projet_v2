import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFound } from './components/NotFound';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Loading from './components/Loading';
import { MenuProvider } from './contexts/MenuContext';
import { NotificationsProvider } from './services/notifications';
import { AnimationProvider } from './design-system/contexts/AnimationContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Lazy loading dos componentes de página com tratamento de erro
const lazyLoad = (importFn: () => Promise<any>) => {
  return React.lazy(async () => {
    try {
      return await importFn();
    } catch (error: unknown) {
      console.error(`Erro ao carregar módulo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      return { default: () => <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-h2 mb-4">Desculpe, não foi possível carregar esta página</h2>
        <p className="text-body-large mb-6">Por favor, tente novamente mais tarde ou entre em contato com o suporte.</p>
      </div> };
    }
  });
};

// Lazy loading dos componentes de página
const Home = lazyLoad(() => import('./pages/Home'));
const SomosOcto = lazyLoad(() => import('./pages/SomosOcto'));
const QuemSomos = lazyLoad(() => import('./pages/somos-octo/QuemSomos'));
const DeficienciasOcultas = lazyLoad(() => import('./pages/somos-octo/DeficienciasOcultas'));
const Neurodivergencias = lazyLoad(() => import('./pages/somos-octo/Neurodivergencias'));
const Diversidade = lazyLoad(() => import('./pages/somos-octo/Diversidade'));
const OctoFaz = lazyLoad(() => import('./pages/OctoFaz'));
const CapacitaPcd = lazyLoad(() => import('./pages/octo-faz/CapacitaPcd'));
const CuidaPcd = lazyLoad(() => import('./pages/octo-faz/CuidaPcd'));
const OrientaPcd = lazyLoad(() => import('./pages/octo-faz/OrientaPcd'));
const CapacitaEmpresas = lazyLoad(() => import('./pages/octo-faz/CapacitaEmpresas'));
const OctoCultura = lazyLoad(() => import('./pages/octo-faz/OctoCultura'));
const OctoComVoce = lazyLoad(() => import('./pages/OctoComVoce'));
const ColunaOcto = lazyLoad(() => import('./pages/octo-com-voce/ColunaOcto'));
const SeloOcto = lazyLoad(() => import('./pages/octo-com-voce/SeloOcto'));
const Noticias = lazyLoad(() => import('./pages/Noticias'));
const Cartilhas = lazyLoad(() => import('./pages/Cartilhas'));
const CartilhaDetalhe = lazyLoad(() => import('./pages/CartilhaDetalhe'));
const Contato = lazyLoad(() => import('./pages/Contato'));

// Layout principal
const Layout = () => (
  <MenuProvider>
    <NotificationsProvider>
      <AnimationProvider>
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
      </AnimationProvider>
    </NotificationsProvider>
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
], {
  // @ts-ignore - Flags que existem mas não estão no tipo atual
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

function App() {
  return (
    <ThemeProvider>
      <AnimationProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </AnimationProvider>
    </ThemeProvider>
  );
}

// Layout principal com elementos comuns e outlet para as rotas
function MainLayout() {
  return (
    <MenuProvider>
      <NotificationsProvider>
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
      </NotificationsProvider>
    </MenuProvider>
  );
}

export default App;