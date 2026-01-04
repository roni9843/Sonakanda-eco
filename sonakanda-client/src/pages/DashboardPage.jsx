import React from 'react';
import { useUserStore } from '../store/useUserStore.js';
import { useCounterStore } from '../store/useCounterStore.js';

const DashboardPage = () => {
  const user = useUserStore((state) => state.user);
  const count = useCounterStore((state) => state.count);

  return (
    <div className="space-y-4">
      <section className="card space-y-2">
        <h1 className="text-2xl font-semibold">Account Overview</h1>
        <p className="text-sm text-slate-300">
          This is your banking-style dashboard. Account information is protected and only visible
          after login.
        </p>
        <p className="text-sm">
          Logged in as:{' '}
          <span className="font-medium">{user?.name_en ?? user?.name ?? 'Unknown user'}</span>
        </p>
      </section>

      <section className="card space-y-3 bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800">
        <p className="text-xs uppercase tracking-wide text-slate-400">Current balance</p>
        <p className="text-3xl font-bold text-emerald-400">
          ৳ {typeof user?.balance === 'number' ? user.balance.toFixed(2) : '0.00'}
        </p>
        <p className="text-xs text-slate-400">
          এই ব্যালেন্সটি backend User schema এর <code className="text-[10px] bg-slate-800 px-1 rounded">balance</code>
          ফিল্ড থেকে আসছে (ডিফল্ট 0)।
        </p>
      </section>

      <section className="card space-y-2">
        <h2 className="text-base font-semibold">Shared state preview</h2>
        <p className="text-sm text-slate-300">
          The counter value you changed on the Home page is shared here via Zustand global state.
        </p>
        <p className="text-3xl font-bold">{count}</p>
        <p className="text-xs text-slate-400">
          Open Redux DevTools and select the <b>counter-store</b> instance to inspect actions.
        </p>
      </section>
    </div>
  );
};

export default DashboardPage;
