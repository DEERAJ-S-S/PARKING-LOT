package com.parking.controller;

import com.parking.model.Slot;
import com.parking.model.Ticket;
import com.parking.service.ParkingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ParkingController {
    private final ParkingService service;

    public ParkingController(ParkingService service){ this.service = service; }

    @GetMapping("/slots")
    public List<Slot> allSlots(){ return service.listSlots(); }

    @GetMapping("/slots/free")
    public List<Slot> freeSlots(){ return service.listFree(); }

    @GetMapping("/tickets/open")
    public List<Ticket> openTickets(){ return service.listOpenTickets(); }

    @PostMapping("/checkin")
    public ResponseEntity<?> checkin(@RequestBody Map<String,String> body){
        String vehicleNo = body.get("vehicleNo");
        String type = body.get("type"); if(type==null) type = "Compact";
        try{
            Ticket t = service.checkin(vehicleNo, type);
            return ResponseEntity.ok(t);
        }catch(IllegalArgumentException e){ return ResponseEntity.badRequest().body(Map.of("error", e.getMessage())); }
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody Map<String,String> body){
        String ticketIdStr = body.get("ticketId");
        try{
            Long ticketId = Long.parseLong(ticketIdStr);
            Ticket t = service.checkout(ticketId);
            return ResponseEntity.ok(t);
        }catch(NumberFormatException nfe){ return ResponseEntity.badRequest().body(Map.of("error","Invalid ticketId"));}
        catch(IllegalArgumentException e){ return ResponseEntity.badRequest().body(Map.of("error", e.getMessage())); }
    }

    @GetMapping("/revenue")
    public List<Ticket> revenue(@RequestParam String from, @RequestParam String to){
        return service.revenue(from, to);
    }
}
