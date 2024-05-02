import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className={'flex h-full w-full items-center justify-center'}>
      <p className={'absolute top-0'}>Layout Area</p>
      <Outlet />
    </div>
  )
}
