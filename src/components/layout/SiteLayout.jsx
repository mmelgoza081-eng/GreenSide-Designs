import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';
import CursorOrb from '../ui/CursorOrb';
import ScrollBloom from '../ui/ScrollBloom';

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollBloom />
      <CursorOrb />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}