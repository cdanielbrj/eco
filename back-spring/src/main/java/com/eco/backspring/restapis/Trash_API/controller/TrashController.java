package com.eco.backspring.restapis.Trash_API.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import com.eco.backspring.restapis.Trash_API.entity.Trash;
import com.eco.backspring.restapis.Trash_API.repository.TrashRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

@CrossOrigin(origins = "http://trashhost:4200/")
@RestController
@RequestMapping("/eco_system/trash-oprs")
public class TrashController {
    @Autowired
    private TrashRepository repository;
    
    @GetMapping
    public List<Trash> listar(){
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trash> getTrashById(@PathVariable Long id) {
        Optional<Trash> trashOptional = repository.findById(id);

        return trashOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trash> atualizar(@PathVariable Long id, @RequestBody Trash trash) {
        Optional<Trash> trashExistente = repository.findById(id);

        if (trashExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        trash.setId(id);
        repository.save(trash);

        return ResponseEntity.ok(trash);
    }

    @PostMapping
    public void salvar(@RequestBody Trash trash) {
        repository.save(trash);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        Optional<Trash> optionalTrash = repository.findById(id);
        if (optionalTrash.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
