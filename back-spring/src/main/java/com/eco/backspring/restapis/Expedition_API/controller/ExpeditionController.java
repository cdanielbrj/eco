package com.eco.backspring.restapis.Expedition_API.controller;

import java.util.List;
import com.eco.backspring.restapis.Expedition_API.entity.Expedition;
import com.eco.backspring.restapis.Expedition_API.repository.ExpeditionRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/eco_system/expedition-oprs")
public class ExpeditionController {
    @Autowired
    private ExpeditionRepository repository;

    @GetMapping
    public List<Expedition> listar() {
        return repository.findAll();
    }

    @PostMapping
    public void salvar(@RequestBody Expedition expedition) {
        repository.save(expedition);
    }

    @PutMapping
    public void alterar(@RequestBody Expedition expedition) {
        if(expedition.getId()>0) {
            repository.save(expedition);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody Expedition expedition) {
        repository.delete(expedition);
    }
}
