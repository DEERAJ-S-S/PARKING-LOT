import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ParkingContext = createContext();

const SAMPLE = [
  { code:'A1', type:'Compact', isFree:true },
  { code:'A2', type:'Compact', isFree:true },
  { code:'B1', type:'Large', isFree:true },
  { code:'B2', type:'Large', isFree:true },
  { code:'C1', type:'Motorbike', isFree:true }
];

export function ParkingProvider({children}){
  const [slots, setSlots] = useLocalStorage('slots_v1', SAMPLE);
  const [tickets, setTickets] = useLocalStorage('tickets_v1', []);
  const [history, setHistory] = useLocalStorage('history_v1', []);

  const findNearestFreeSlotByType = (type) => slots.find(s=>s.type===type && s.isFree) || null;
  const hasOpenTicket = (vehicleNo) => tickets.some(t=>t.vehicleNo===vehicleNo);

  const checkin = ({vehicleNo, type}) => {
    if(hasOpenTicket(vehicleNo)) throw new Error('Vehicle already has open ticket');
    const slot = findNearestFreeSlotByType(type);
    if(!slot) throw new Error('No free slot for selected type');
    // occupy
    setSlots(prev => prev.map(s=> s.code===slot.code ? {...s, isFree:false} : s));
    const ticket = { id:'T'+Date.now(), slotCode:slot.code, vehicleNo, inTs: new Date().toISOString(), outTs:null, amount:null, status:'OPEN' };
    setTickets(prev=> [ticket, ...prev]);
    return ticket;
  };

  const RATES = { Compact:30, Large:50, Motorbike:10 };
  const computeFee = (ticket, outTs=new Date().toISOString()) => {
    const inD = new Date(ticket.inTs), outD = new Date(outTs);
    const diff = Math.max(0, Math.ceil((outD - inD)/(1000*60*60)));
    const slot = slots.find(s=>s.code===ticket.slotCode);
    const rate = slot ? (RATES[slot.type]||30) : 30;
    return diff * rate;
  };

  const checkout = (ticketId) => {
    const ticket = tickets.find(t=>t.id===ticketId);
    if(!ticket) throw new Error('Ticket not found');
    const outTs = new Date().toISOString();
    const amount = computeFee(ticket, outTs);
    setSlots(prev => prev.map(s=> s.code===ticket.slotCode ? {...s, isFree:true} : s));
    const closed = {...ticket, outTs, amount, status:'CLOSED'};
    setTickets(prev => prev.filter(t=>t.id!==ticketId));
    setHistory(h=> [closed, ...h]);
    return closed;
  };

  const seedSlots = (newSlots) => {
    setSlots(newSlots);
    setTickets([]);
    setHistory([]);
  };

  return <ParkingContext.Provider value={{slots,tickets,history,checkin,checkout,computeFee,findNearestFreeSlotByType,seedSlots}}>
    {children}
  </ParkingContext.Provider>
}

export function useParking(){ return useContext(ParkingContext); }
