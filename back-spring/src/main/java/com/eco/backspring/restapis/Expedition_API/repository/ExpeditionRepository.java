package com.eco.backspring.restapis.Expedition_API.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.eco.backspring.restapis.Expedition_API.entity.Expedition;

public interface ExpeditionRepository extends JpaRepository<Expedition, Long> {

}