package com.parking.service;

import com.parking.model.Slot;
import com.parking.model.Ticket;
import com.parking.repository.SlotRepository;
import com.parking.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ParkingService {
    private final SlotRepository slotRepo;
    private final TicketRepository ticketRepo;

    public ParkingService(SlotRepository slotRepo, TicketRepository ticketRepo) {
        this.slotRepo = slotRepo;
        this.ticketRepo = ticketRepo;
    }

    public List<Slot> listSlots() { return slotRepo.findAll(); }
    public List<Slot> listFree() { return slotRepo.findFree(); }
    public List<Ticket> listOpenTickets() { return ticketRepo.findOpen(); }

    public Ticket checkin(String vehicleNo, String type) {
        Slot slot = slotRepo.findNearestFree(type);
        if (slot == null) throw new IllegalArgumentException("No free slot available for type: " + type);

        Ticket ticket = new Ticket();
        ticket.setSlotCode(slot.getCode());
        ticket.setVehicleNo(vehicleNo);
        ticket.setInTs(LocalDateTime.now());
        ticket.setStatus("Open");
        ticketRepo.save(ticket);
        slotRepo.occupy(slot.getCode());
        return ticket;
    }

    public Ticket checkout(Long ticketId) {
        Ticket ticket = ticketRepo.findById(ticketId);
        if (ticket == null) throw new IllegalArgumentException("Ticket not found");
        if (!"Open".equals(ticket.getStatus())) throw new IllegalArgumentException("Ticket already closed");

        LocalDateTime outTs = LocalDateTime.now();
        long hours = Duration.between(ticket.getInTs(), outTs).toHours();
        if (hours == 0) hours = 1;
        double amount = hours * 50.0;

        ticketRepo.updateCheckout(ticketId, Timestamp.valueOf(outTs), amount);
        slotRepo.release(ticket.getSlotCode());
        ticket.setOutTs(outTs);
        ticket.setAmount(amount);
        ticket.setStatus("Closed");
        return ticket;
    }

    public List<Ticket> revenue(String from, String to) {
        return ticketRepo.findBetween(from, to);
    }
}
