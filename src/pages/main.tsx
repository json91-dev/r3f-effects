import React from 'react'
import MainLayout from '@src/layouts/MainLayout.tsx'
import { useNavigate } from 'react-router-dom'
export default function MainPage() {
  const navigate = useNavigate()
  return (
    <div className={'flex h-full w-full flex-col items-center justify-center gap-10 text-[2rem]'}>
      <div className={'flex flex-col gap-10'}>
        <p onClick={() => navigate('/shader/bubble')} className={'border-2'}>
          (r3f) Bubble 페이지 이동
        </p>
        <p onClick={() => navigate('/shader/flag')} className={'border-2'}>
          (r3f) Flag 페이지 이동
        </p>

        <p onClick={() => navigate('/shader/portal')} className={'border-2'}>
          (r3f) Portal 페이지 이동
        </p>

        <p onClick={() => navigate('/shader/blossom')} className={'border-2'}>
          (r3f) Blossom 페이지 이동
        </p>

        <p onClick={() => navigate('/shader/point-cloud')} className={'border-2'}>
          (r3f) Point Cloud 페이지 이동
        </p>

        <p onClick={() => navigate('/shader/music')} className={'border-2'}>
          (r3f) Music 페이지 이동
        </p>

        <p onClick={() => navigate('/normal/rolling-ball')} className={'border-2'}>
          (r3f) Rolling ball 페이지 이동
        </p>

        <p onClick={() => navigate('/normal/box')} className={'border-2'}>
          (r3f) Box 페이지 이동
        </p>

        <p onClick={() => navigate('/normal/particle')} className={'border-2'}>
          (r3f) Particle 페이지 이동
        </p>

        <p onClick={() => navigate('/normal/particle-star')} className={'border-2'}>
          (r3f) Particle Star 페이지 이동
        </p>

        <p onClick={() => navigate('/normal/merge-star')} className={'border-2'}>
          (r3f) merge star 페이지 이동
        </p>
      </div>
    </div>
  )
}
