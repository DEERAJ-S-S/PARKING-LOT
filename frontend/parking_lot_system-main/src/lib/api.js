// Simple API adapter: currently uses local context (frontend only).
// Later replace implementations with fetch() calls to Spring Boot backend endpoints.
import { useParking } from './parkingContext';

export function useApi(){
  const ctx = useParking();
  return {
    listSlots: ()=> ctx.slots,
    listFreeSlots: ()=> ctx.slots.filter(s=>s.isFree),
    checkin: (vehicleNo, type)=> ctx.checkin({vehicleNo,type}),
    checkout: (ticketId)=> ctx.checkout(ticketId),
    tickets: ()=> ctx.tickets,
    history: ()=> ctx.history,
    revenue: (from,to) => {
      const f = from? new Date(from): null;
      const t = to? new Date(to): null;
      return ctx.history.filter(h=>{
        const out = new Date(h.outTs);
        if(f && out < f) return false;
        if(t && out > t) return false;
        return true;
      });
    }
  };
}
