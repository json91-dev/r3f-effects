import React from 'react'
import MainLayout from '@src/layouts/MainLayout.tsx'
import { useNavigate } from 'react-router-dom'
export default function MainPage() {
  const navigate = useNavigate()
  return (
    <div className={'flex h-full w-full flex-col items-center justify-center gap-10 text-[2rem]'}>
      <div className={'flex flex-col gap-10'}>
        <p onClick={() => navigate('/r3f/box')} className={'border-2'}>
          (r3f) Box 페이지 이동
        </p>
        <p onClick={() => navigate('/r3f/bubble')} className={'border-2'}>
          (r3f) Bubble 페이지 이동
        </p>
      </div>
    </div>
  )
}
