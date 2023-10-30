package com.eco.backspring.restapis.Trash_API.repository;
import com.eco.backspring.restapis.Trash_API.entity.Trash;
import org.springframework.data.jpa.repository.JpaRepository;
public interface TrashRepository extends JpaRepository<Trash, Long>{
}
