import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Clock, User, CreditCard } from 'lucide-react';

const MobileBottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-800 bg-slate-950/95 backdrop-blur-lg">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between gap-4 text-xs text-slate-300">
        <BottomNavItem to="/" label="Home" icon={Home} />
        <BottomNavItem to="/card" label="Card" icon={CreditCard} />
        <BottomNavItem to="/history" label="History" icon={Clock} />
        <BottomNavItem to="/profile" label="Profile" icon={User} />
      </div>
    </nav>
  );
};

const BottomNavItem = ({ to, label, icon: Icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center flex-1 gap-1 px-2 py-1 rounded-xl transition-colors ${
        isActive
          ? 'text-emerald-300 bg-slate-900'
          : 'text-slate-400 hover:text-emerald-200 hover:bg-slate-900/60'
      }`
    }
  >
    <Icon size={20} />
    <span>{label}</span>
  </NavLink>
);

export default MobileBottomNav;
