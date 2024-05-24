import React from 'react'
import MainLayout from '@src/layouts/MainLayout.tsx'
import { useNavigate } from 'react-router-dom'
export default function MainPage() {
  const navigate = useNavigate()
  return (
    <div className={'flex h-full w-full flex-col items-center justify-center gap-10 text-[2rem]'}>
      <div className={'flex flex-col gap-10'}>
        <p onClick={() => navigate('/box')} className={'border-2'}>
          (r3f) Box 페이지 이동
        </p>
        <p onClick={() => navigate('/bubble')} className={'border-2'}>
          (r3f) Bubble 페이지 이동
        </p>
        <p onClick={() => navigate('/flag')} className={'border-2'}>
          (r3f) Flag 페이지 이동
        </p>

        <p onClick={() => navigate('/portal')} className={'border-2'}>
          (r3f) Portal 페이지 이동
        </p>

        <p onClick={() => navigate('/particle')} className={'border-2'}>
          (r3f) Particle 페이지 이동
        </p>

        <p onClick={() => navigate('/particle/star')} className={'border-2'}>
          (r3f) Particle Star 페이지 이동
        </p>

        <p onClick={() => navigate('/blossom')} className={'border-2'}>
          (r3f) Blossom 페이지 이동
        </p>

        <p onClick={() => navigate('/rolling-ball')} className={'border-2'}>
          (r3f) Rolling ball 페이지 이동
        </p>

        <p onClick={() => navigate('/point-cloud')} className={'border-2'}>
          (r3f) Point Cloud 페이지 이동
        </p>

        <p onClick={() => navigate('/point-cloud-hmr')} className={'border-2'}>
          (r3f) Point Cloud Hmr 페이지 이동
        </p>
      </div>
    </div>
  )
}
