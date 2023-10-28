package com.eco.backspring.restapis.Ship_API.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.eco.backspring.restapis.Ship_API.entity.Ship;

import java.util.Optional;

public interface ShipRepository extends JpaRepository<Ship, Long>{
    Optional<Ship> findByOwnerFisherId(Long fisherId);

    Optional<Ship> findByPartnerFisherId(Long fisherId);
}
