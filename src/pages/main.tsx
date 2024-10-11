import React from 'react'
import MainLayout from '@src/layouts/MainLayout.tsx'
import { useNavigate } from 'react-router-dom'
export default function MainPage() {
  const navigate = useNavigate()
  return (
    <div
      className={
        'cursor-pointer-col absolute left-[50%] top-[50%]  grid translate-x-[-50%] translate-y-[-50%] grid-cols-3 items-center justify-center gap-10 rounded-2xl  bg-amber-100 p-10 text-[2rem]'
      }
    >
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-300 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/shader/bubble')}>Bubble</p>
      </div>
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-300 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/shader/flag')}>Flag</p>
      </div>
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-300 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/shader/portal')}>Portal</p>
      </div>
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-300 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/shader/blossom')}>Blossom</p>
      </div>
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-300 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/shader/point-cloud')}>Point Cloud</p>
      </div>
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-300 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/shader/stardust')}>Star Dust</p>
      </div>
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-300 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/shader/music')}>Music</p>
      </div>
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-300 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/normal/rolling-ball')}>Rolling ball</p>
      </div>
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-300 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/normal/box')}>Box</p>
      </div>
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-300 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/normal/particle')}>Particle</p>
      </div>
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-300 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/normal/particle-star')}>Particle Star</p>
      </div>
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-300 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/normal/merge-star')}>merge star</p>
      </div>
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-300 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/shader/universe')}>universe</p>
      </div>{' '}
      <div
        className={
          'flex cursor-pointer  items-center justify-center rounded-2xl border-4 bg-red-300 p-[2rem] text-center shadow-md'
        }
      >
        <p onClick={() => navigate('/shader/twink-particle')}>twink-particles</p>
      </div>
    </div>
  )
}
