# Parking Backend (Spring Boot + MySQL)

## Setup
1. Create database in MySQL:
   ```sql
   CREATE DATABASE parkingdb;
   USE parkingdb;

   CREATE TABLE slot (
     code VARCHAR(20) PRIMARY KEY,
     type VARCHAR(50) NOT NULL,
     is_free TINYINT(1) NOT NULL DEFAULT 1
   );

   CREATE TABLE ticket (
     id BIGINT AUTO_INCREMENT PRIMARY KEY,
     slot_code VARCHAR(20) NOT NULL,
     vehicle_no VARCHAR(50) NOT NULL,
     in_ts DATETIME NOT NULL,
     out_ts DATETIME,
     amount DECIMAL(10,2),
     status VARCHAR(20) NOT NULL,
     FOREIGN KEY (slot_code) REFERENCES slot(code)
   );
   ```

2. Update `src/main/resources/application.properties` with your MySQL username/password.

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

## Endpoints
- GET `/api/slots`
- GET `/api/slots/free`
- GET `/api/tickets/open`
- POST `/api/checkin` (body: `{ "vehicleNo": "TN01AB1234", "type": "Compact" }`)
- POST `/api/checkout` (body: `{ "ticketId": "1" }`)
- GET `/api/revenue?from=2025-01-01T00:00:00&to=2025-12-31T23:59:59`
