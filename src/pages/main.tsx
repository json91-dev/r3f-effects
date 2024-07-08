import React from 'react'
import MainLayout from '@src/layouts/MainLayout.tsx'
import { useNavigate } from 'react-router-dom'
export default function MainPage() {
  const navigate = useNavigate()
  return (
    <div
      className={
        'cursor-pointer-col absolute left-[50%] top-[50%]  grid translate-x-[-50%] translate-y-[-50%] grid-cols-3 items-center justify-center gap-4 text-[2rem]'
      }
    >
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-100 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/shader/bubble')}>(r3f) Bubble 페이지 이동</p>
      </div>
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-100 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/shader/flag')}>(r3f) Flag 페이지 이동</p>
      </div>

      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-100 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/shader/portal')}>(r3f) Portal 페이지 이동</p>
      </div>

      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-100 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/shader/blossom')}>(r3f) Blossom 페이지 이동</p>
      </div>

      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-100 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/shader/point-cloud')}>(r3f) Point Cloud 페이지 이동</p>
      </div>

      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-100 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/shader/stardust')}>(r3f) Star Dust 페이지 이동</p>
      </div>
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-100 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/shader/music')}>(r3f) Music 페이지 이동</p>
      </div>
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-100 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/normal/rolling-ball')}>(r3f) Rolling ball 페이지 이동</p>
      </div>

      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-100 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/normal/box')}>(r3f) Box 페이지 이동</p>
      </div>

      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-100 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/normal/particle')}>(r3f) Particle 페이지 이동</p>
      </div>

      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-100 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/normal/particle-star')}>(r3f) Particle Star 페이지 이동</p>
      </div>

      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-100 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/normal/merge-star')}>(r3f) merge star 페이지 이동</p>
      </div>
    </div>
  )
}
