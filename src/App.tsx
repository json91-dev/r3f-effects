import { Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
import ArCanvasLayout from '@src/layouts/ArCanvasLayout.tsx'
import NotFoundPage from '@src/pages/nofFound.tsx'
const MainPage = lazy(() => import('@src/pages/main.tsx'))
const BoxPage = lazy(() => import('@src/pages/mesh/box.tsx'))
const BubblePage = lazy(() => import('@src/pages/bubble/bubble.tsx'))
const FlagPage = lazy(() => import('@src/pages/flag/flag.tsx'))
const PortalPage = lazy(() => import('@src/pages/portal/portal.tsx'))
const ParticlePage = lazy(() => import('@src/pages/particle/base.tsx'))
const StarParticlePage = lazy(() => import('@src/pages/particle/star.tsx'))
const BlossomPage = lazy(() => import('@src/pages/blossom/blossom.tsx'))
const RollingBallPage = lazy(() => import('@src/pages/mesh/rollingball.tsx'))
const PointCloudPage = lazy(() => import('@src/pages/shader-test/point-cloud.tsx'))
const MusicPage = lazy(() => import('@src/pages/shader-test/music.tsx'))
// const PointCloudHmrPage = lazy(() => import('@src/pages/shader-test/point-cloud-hmr.tsx'))

export default function App() {
  return (
    <Routes>
      {/*<Route element={<MainLayout />}>*/}
      {/*  */}
      {/*</Route>*/}

      <Route index element={<MainPage />} />
      <Route element={<ArCanvasLayout />}>
        <Route path={'/box'} element={<BoxPage />} />
        <Route path={'/bubble'} element={<BubblePage />} />
        <Route path={'/flag'} element={<FlagPage />} />
        <Route path={'/portal'} element={<PortalPage />} />
        <Route path={'/particle'} element={<ParticlePage />} />
        <Route path={'/particle/star'} element={<StarParticlePage />} />
        <Route path={'/blossom'} element={<BlossomPage />} />
        <Route path={'/rolling-ball'} element={<RollingBallPage />} />
        <Route path={'/point-cloud'} element={<PointCloudPage />} />
        <Route path={'/music'} element={<MusicPage />} />
        {/*<Route path={'/point-cloud-hmr'} element={<PointCloudHmrPage />} />*/}
      </Route>
      <Route path='/*' element={<NotFoundPage />} />
    </Routes>
  )
}
