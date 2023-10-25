package com.eco.backspring.restapis.Fisher_API.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import com.eco.backspring.restapis.Fisher_API.entity.Fisher;
import com.eco.backspring.restapis.Fisher_API.repository.FisherRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/eco_system/fisher-oprs")
public class FisherController {
    @Autowired
    private FisherRepository repository;

    @GetMapping
    public List<Fisher> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fisher> getFisherById(@PathVariable Long id) {
        Optional<Fisher> fisherOptional = repository.findById(id);

        return fisherOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fisher> atualizar(@PathVariable Long id, @RequestBody Fisher fisher) {
        Optional<Fisher> fisherExistente = repository.findById(id);

        if (fisherExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        fisher.setId(id);
        repository.save(fisher);

        return ResponseEntity.ok(fisher);
    }

    @PostMapping
    public void salvar(@RequestBody Fisher fisher) {
        repository.save(fisher);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        Optional<Fisher> optionalFisher = repository.findById(id);
        if (optionalFisher.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
