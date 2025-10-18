import React from 'react';
import { useParking } from '../lib/parkingContext';
import SlotTypeFilter from '../components/SlotTypeFilter';

export default function Dashboard(){
  const { slots } = useParking();
  const total = slots.length;
  const free = slots.filter(s=>s.isFree).length;
  const occupied = total - free;

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="card-row">
        <div className="stat-card"><div className="stat-value">{free}</div><div className="stat-label">Free</div></div>
        <div className="stat-card"><div className="stat-value">{occupied}</div><div className="stat-label">Occupied</div></div>
        <div className="stat-card"><div className="stat-value">{total}</div><div className="stat-label">Total</div></div>
      </div>

      <section>
        <h3>Slots</h3>
        <SlotTypeFilter />
      </section>
    </div>
  );
}
