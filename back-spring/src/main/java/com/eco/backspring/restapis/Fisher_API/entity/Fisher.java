package com.eco.backspring.restapis.Fisher_API.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
    private Integer contato;

    @Column(nullable = false)
    private String local_coleta;

    @Column(nullable = false)
    private String barco;

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setContato(Integer contato) {
        this.contato = contato;
    }

    public void setLocal_coleta(String local_coleta) {
        this.local_coleta = local_coleta;
    }

    public void setBarco(String barco) {
        this.barco = barco;
    }
}
