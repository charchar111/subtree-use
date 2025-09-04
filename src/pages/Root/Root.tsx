import React from 'react';
import { Outlet } from 'react-router-dom';
import DocsLayoutDualSidebars from './shadcn_2_depth_sidebar_layout';

export default function Root() {
  return (
    <div>
      <DocsLayoutDualSidebars />
      <Outlet />
    </div>
  );
}
