import { Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
import ArCanvasLayout from '@src/layouts/ArCanvasLayout.tsx'
import NotFoundPage from '@src/pages/nofFound.tsx'
import Stardust from '@src/pages/shader/stardust/stardust.tsx'
const MainPage = lazy(() => import('@src/pages/main.tsx'))
const BoxPage = lazy(() => import('@src/pages/normal/box.tsx'))
const BubblePage = lazy(() => import('@src/pages/shader/bubble/bubble.tsx'))
const FlagPage = lazy(() => import('@src/pages/shader/flag/flag.tsx'))
const PortalPage = lazy(() => import('@src/pages/shader/portal/portal.tsx'))
const ParticlePage = lazy(() => import('@src/pages/normal/base.tsx'))
const StarParticlePage = lazy(() => import('@src/pages/normal/star.tsx'))
const BlossomPage = lazy(() => import('@src/pages/shader/blossom/blossom.tsx'))
const RollingBallPage = lazy(() => import('@src/pages/normal/rollingball.tsx'))
const PointCloudPage = lazy(() => import('@src/pages/shader/point-cloud/point-cloud.tsx'))
const MusicPage = lazy(() => import('@src/pages/shader/music/music.tsx'))
const MergeStarPage = lazy(() => import('@src/pages/normal/merge-star.tsx'))
// const PointCloudHmrPage = lazy(() => import('@src/pages/shader-test/point-cloud-hmr.tsx'))

export default function App() {
  return (
    <Routes>
      {/*<Route element={<MainLayout />}>*/}
      {/*  */}
      {/*</Route>*/}

      <Route index element={<MainPage />} />
      <Route element={<ArCanvasLayout />}>
        <Route path={'/shader/bubble'} element={<BubblePage />} />
        <Route path={'/shader/flag'} element={<FlagPage />} />
        <Route path={'/shader/portal'} element={<PortalPage />} />
        <Route path={'/shader/blossom'} element={<BlossomPage />} />
        <Route path={'/shader/point-cloud'} element={<PointCloudPage />} />
        <Route path={'/shader/music'} element={<MusicPage />} />
        <Route path={'/shader/stardust'} element={<Stardust />} />

        <Route path={'/normal/box'} element={<BoxPage />} />
        <Route path={'/normal/particle'} element={<ParticlePage />} />
        <Route path={'/normal/particle-star'} element={<StarParticlePage />} />
        <Route path={'/normal/rolling-ball'} element={<RollingBallPage />} />
        <Route path={'/normal/merge-star'} element={<MergeStarPage />} />
      </Route>
      <Route path='/*' element={<NotFoundPage />} />
    </Routes>
  )
}
