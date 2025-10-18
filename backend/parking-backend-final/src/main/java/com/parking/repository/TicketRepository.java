package com.parking.repository;

import com.parking.model.Ticket;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public class TicketRepository {
    private final JdbcTemplate jdbcTemplate;

    public TicketRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    private RowMapper<Ticket> mapper = (rs, rowNum) -> {
        Ticket t = new Ticket();
        t.setId(rs.getLong("id"));
        t.setSlotCode(rs.getString("slot_code"));
        t.setVehicleNo(rs.getString("vehicle_no"));
        t.setInTs(rs.getTimestamp("in_ts").toLocalDateTime());
        if (rs.getTimestamp("out_ts") != null)
            t.setOutTs(rs.getTimestamp("out_ts").toLocalDateTime());
        t.setAmount(rs.getDouble("amount"));
        t.setStatus(rs.getString("status"));
        return t;
    };

    public Ticket save(Ticket ticket) {
        jdbcTemplate.update("INSERT INTO ticket(slot_code,vehicle_no,in_ts,status) VALUES(?,?,?,?)",
                ticket.getSlotCode(), ticket.getVehicleNo(), Timestamp.valueOf(ticket.getInTs()), ticket.getStatus());
        return ticket;
    }

    public Ticket findById(Long id) {
        List<Ticket> list = jdbcTemplate.query("SELECT * FROM ticket WHERE id=?", mapper, id);
        return list.isEmpty() ? null : list.get(0);
    }

    public void updateCheckout(Long id, Timestamp outTs, Double amount) {
        jdbcTemplate.update("UPDATE ticket SET out_ts=?, amount=?, status='Closed' WHERE id=?", outTs, amount, id);
    }

    public List<Ticket> findOpen() {
        return jdbcTemplate.query("SELECT * FROM ticket WHERE status='Open'", mapper);
    }

    public List<Ticket> findBetween(String from, String to) {
        return jdbcTemplate.query("SELECT * FROM ticket WHERE in_ts BETWEEN ? AND ?", mapper, from, to);
    }
}
