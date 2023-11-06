package com.eco.backspring.restapis.Fisher_API.entity;

import jakarta.persistence.*;
import lombok.Getter;
import java.util.List;

@Getter
@Entity(name = "fishers")
public class Fisher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String contato;

    @Column
    @ElementCollection
    private List<String> advertencias;

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    public void setAdvertencias(List<String> advertencias) {
        this.advertencias = advertencias;
    }
}
