package com.eco.backspring.restapis.Fisher_API.entity;

import com.eco.backspring.restapis.Ship_API.entity.Ship;
import jakarta.persistence.*;
import lombok.Getter;

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

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }
}
