package com.eco.backspring.restapis.Ship_API.controller;

import com.eco.backspring.restapis.Fisher_API.entity.Fisher;
import com.eco.backspring.restapis.Fisher_API.repository.FisherRepository;
import com.eco.backspring.restapis.Ship_API.DTO.ShipDTO;
import com.eco.backspring.restapis.Ship_API.DTO.ShipMapper;
import com.eco.backspring.restapis.Ship_API.entity.Ship;
import com.eco.backspring.restapis.Ship_API.repository.ShipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/eco_system/ship-oprs")
public class ShipController {

    @Autowired
    private ShipRepository shipRepository;

    @Autowired
    private ShipMapper shipMapper;

    @Autowired
    private FisherRepository fisherRepository;

    @GetMapping
    public List<ShipDTO> getAllShips() {
        List<Ship> ships = shipRepository.findAll();
        return ships.stream().map(shipMapper::toDTO).collect(Collectors.toList());
    }
    @GetMapping("/{id}")
    public ResponseEntity<ShipDTO> getShipById(@PathVariable Long id) {
        Optional<Ship> shipOptional = shipRepository.findById(id);
        return shipOptional.map(ship -> ResponseEntity.ok(shipMapper.toDTO(ship))).orElseGet(() -> ResponseEntity.notFound().build());
    }

    private boolean isFisherAssignedAsOwner(Long fisherId) {
        return shipRepository.findByOwnerFisherId(fisherId).isPresent();
    }

    private boolean isFisherAssignedAsPartner(Long fisherId) {
        return shipRepository.findByPartnerFisherId(fisherId).isPresent();
    }

    @PostMapping
    public ResponseEntity<Object> createShip(@RequestBody ShipDTO shipDTO) {
        Ship ship = shipMapper.toEntity(shipDTO, null);
        System.out.println("Owner Fisher ID: " + shipDTO.ownerFisherId());
        // Associando os pescadores ao barco com base nos IDs
        if (shipDTO.ownerFisherId() != null) {
            if(isFisherAssignedAsOwner(shipDTO.ownerFisherId()) || isFisherAssignedAsPartner(shipDTO.ownerFisherId())) {
                return ResponseEntity.badRequest().body("Owner fisher is already assigned to another ship.");
            }

            Optional<Fisher> ownerFisherOptional = fisherRepository.findById(shipDTO.ownerFisherId());
            if (ownerFisherOptional.isPresent()) {
                ship.setOwnerFisher(ownerFisherOptional.get());
            } else {
                return ResponseEntity.badRequest().body("Owner fisher not found.");
            }
        }
        System.out.println("Owner Fisher ID: " + shipDTO.ownerFisherId());
        System.out.println("Partner Fisher ID: " + shipDTO.partnerFisherId());
        if (shipDTO.partnerFisherId() != null) {
            if(isFisherAssignedAsOwner(shipDTO.partnerFisherId()) || isFisherAssignedAsPartner(shipDTO.partnerFisherId())) {
                return ResponseEntity.badRequest().body("Partner fisher is already assigned to another ship.");
            }

            Optional<Fisher> partnerFisherOptional = fisherRepository.findById(shipDTO.partnerFisherId());
            if (partnerFisherOptional.isPresent()) {
                ship.setPartnerFisher(partnerFisherOptional.get());
            } else {
                return ResponseEntity.badRequest().body("Partner fisher not found.");
            }
        }
        System.out.println("Partner Fisher ID: " + shipDTO.partnerFisherId());
        Ship savedShip = shipRepository.save(ship);
        return ResponseEntity.status(HttpStatus.CREATED).body(shipMapper.toDTO(savedShip));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateShip(@PathVariable Long id, @RequestBody ShipDTO shipDTO) {
        Optional<Ship> shipOptional = shipRepository.findById(id);
        if (shipOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Ship existingShip = shipOptional.get();
        shipMapper.toEntity(shipDTO, existingShip); // Popula os detalhes atualizados

        // Associando os pescadores ao barco com base nos IDs
        if (shipDTO.ownerFisherId() != null) {
            Long existingOwnerId = (existingShip.getOwnerFisher() != null) ? existingShip.getOwnerFisher().getId() : null;

            if ((existingOwnerId == null || !shipDTO.ownerFisherId().equals(existingOwnerId))
                    && (isFisherAssignedAsOwner(shipDTO.ownerFisherId())
                    || isFisherAssignedAsPartner(shipDTO.ownerFisherId()))) {
                return ResponseEntity.badRequest().body("Owner fisher is already assigned to another ship.");
            }

            Optional<Fisher> ownerFisherOptional = fisherRepository.findById(shipDTO.ownerFisherId());
            ownerFisherOptional.ifPresent(existingShip::setOwnerFisher);
        }

        if (shipDTO.partnerFisherId() != null) {
            Long existingPartnerId = (existingShip.getPartnerFisher() != null) ? existingShip.getPartnerFisher().getId() : null;

            if ((existingPartnerId == null || !shipDTO.partnerFisherId().equals(existingPartnerId))
                    && (isFisherAssignedAsPartner(shipDTO.partnerFisherId())
                    || isFisherAssignedAsOwner(shipDTO.partnerFisherId()))) {
                return ResponseEntity.badRequest().body("Partner fisher is already assigned to another ship.");
            }

            Optional<Fisher> partnerFisherOptional = fisherRepository.findById(shipDTO.partnerFisherId());
            partnerFisherOptional.ifPresent(existingShip::setPartnerFisher);
        }

        Ship updatedShip = shipRepository.save(existingShip);
        return ResponseEntity.ok(shipMapper.toDTO(updatedShip));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShip(@PathVariable Long id) {
        if (!shipRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        shipRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
