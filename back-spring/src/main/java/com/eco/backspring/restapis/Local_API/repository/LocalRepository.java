package com.eco.backspring.restapis.Local_API.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.eco.backspring.restapis.Local_API.entity.Local;
public interface LocalRepository extends JpaRepository<Local, Long>{
}
