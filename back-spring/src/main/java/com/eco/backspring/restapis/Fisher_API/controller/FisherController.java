package com.eco.backspring.restapis.Fisher_API.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.eco.backspring.restapis.Fisher_API.entity.Fisher;
import com.eco.backspring.restapis.Fisher_API.repository.FisherRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Fisher> atualizar(@PathVariable Long id, @RequestBody Fisher fisherDetalhes) {
        return repository.findById(id).map(fisherExistente -> {
            if (fisherDetalhes.getNome() != null) {
                fisherExistente.setNome(fisherDetalhes.getNome());
            }
            if (fisherDetalhes.getContato() != null) {
                fisherExistente.setContato(fisherDetalhes.getContato());
            }
            repository.save(fisherExistente);
            return ResponseEntity.ok(fisherExistente);
        }).orElseGet(() -> ResponseEntity.notFound().build()); // Retorna 404 se não encontrar o pescador
    }

    @PostMapping
    public ResponseEntity<Fisher> salvar(@RequestBody Fisher fisher) {
        Fisher savedFisher = repository.save(fisher);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFisher);
    }

    /* Advertências */
    @PostMapping("/{id}/newAdv")
    public ResponseEntity<Fisher> addAdvertencia(@PathVariable Long id, @RequestBody Map<String, List<String>> advertenciaMap) {
        Optional<Fisher> fisherOptional = repository.findById(id);
        if (fisherOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Fisher fisher = fisherOptional.get();
        List<String> advertencias = advertenciaMap.get("advertencias");
        if (advertencias != null && !advertencias.isEmpty()) {
            if (fisher.getAdvertencias() == null) {
                fisher.setAdvertencias(new ArrayList<>());
            }
            fisher.getAdvertencias().addAll(advertencias);
            repository.save(fisher);
            return new ResponseEntity<>(fisher, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
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
