import { Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
import ArCanvasLayout from '@src/layouts/ArCanvasLayout.tsx'
import NotFoundPage from '@src/pages/nofFound.tsx'
const MainPage = lazy(() => import('@src/pages/main.tsx'))
const BoxPage = lazy(() => import('@src/pages/r3f/box.tsx'))
const BubblePage = lazy(() => import('@src/pages/r3f/bubble/bubble.tsx'))
const FlagPage = lazy(() => import('@src/pages/r3f/frag/flag.tsx'))
const PortalPage = lazy(() => import('@src/pages/r3f/portal/portal.tsx'))
const ParticlePage = lazy(() => import('@src/pages/r3f/particle/base.tsx'))
const StarParticlePage = lazy(() => import('@src/pages/r3f/particle/star.tsx'))
const BlossomPage = lazy(() => import('@src/pages/r3f/blossom/blossom.tsx'))

export default function App() {
  return (
    <Routes>
      {/*<Route element={<MainLayout />}>*/}
      {/*  */}
      {/*</Route>*/}

      <Route index element={<MainPage />} />
      <Route element={<ArCanvasLayout />}>
        <Route path={'/r3f/box'} element={<BoxPage />} />
        <Route path={'/r3f/bubble'} element={<BubblePage />} />
        <Route path={'/r3f/flag'} element={<FlagPage />} />
        <Route path={'/r3f/portal'} element={<PortalPage />} />
        <Route path={'/r3f/particle'} element={<ParticlePage />} />
        <Route path={'/r3f/particle/star'} element={<StarParticlePage />} />
        <Route path={'/r3f/blossom'} element={<BlossomPage />} />
      </Route>
      <Route path='/*' element={<NotFoundPage />} />
    </Routes>
  )
}
