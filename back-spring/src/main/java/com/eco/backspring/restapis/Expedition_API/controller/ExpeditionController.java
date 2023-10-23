package com.eco.backspring.restapis.Expedition_API.controller;

import java.util.List;
import java.util.Optional;

import com.eco.backspring.restapis.Expedition_API.entity.Expedition;
import com.eco.backspring.restapis.Expedition_API.repository.ExpeditionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

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

    @GetMapping("/{id}")
    public ResponseEntity<Expedition> getExpeditionById(@PathVariable Long id) {
        Optional<Expedition> expeditionOptional = repository.findById(id);

        return expeditionOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expedition> atualizar(@PathVariable Long id, @RequestBody Expedition expedition) {
        Optional<Expedition> expeditionExistente = repository.findById(id);

        if (expeditionExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        expedition.setId(id);
        repository.save(expedition);

        return ResponseEntity.ok(expedition);
    }

    @PostMapping
    public void salvar(@RequestBody Expedition expedition) {
        repository.save(expedition);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        Optional<Expedition> optionalExpedition = repository.findById(id);
        if (optionalExpedition.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
