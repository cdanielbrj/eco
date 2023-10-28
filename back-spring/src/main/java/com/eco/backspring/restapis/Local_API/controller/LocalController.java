package com.eco.backspring.restapis.Local_API.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import com.eco.backspring.restapis.Local_API.entity.Local;
import com.eco.backspring.restapis.Local_API.repository.LocalRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/eco_system/local-oprs")
public class LocalController {
    @Autowired
    private LocalRepository repository;

    @GetMapping
    public List<Local> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Local> getLocalById(@PathVariable Long id) {
        Optional<Local> localOptional = repository.findById(id);

        return localOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Local> atualizar(@PathVariable Long id, @RequestBody Local local) {
        Optional<Local> localExistente = repository.findById(id);

        if (localExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        local.setId(id);
        repository.save(local);

        return ResponseEntity.ok(local);
    }

    @PostMapping
    public void salvar(@RequestBody Local local) {
        repository.save(local);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        Optional<Local> optionalLocal = repository.findById(id);
        if (optionalLocal.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
