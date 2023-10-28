package com.eco.backspring.restapis.Ship_API.entity;

import com.eco.backspring.restapis.Fisher_API.entity.Fisher;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity(name = "ships")
public class Ship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String motor;

    @Column(nullable = false)
    private Integer capacidade;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_fisher_id")
    private Fisher ownerFisher;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partner_fisher_id")
    private Fisher partnerFisher;

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setMotor(String motor) {
        this.motor = motor;
    }

    public void setCapacidade(Integer capacidade) {
        this.capacidade = capacidade;
    }

    public void setOwnerFisher(Fisher ownerFisher) {
        if (partnerFisher != null && partnerFisher.equals(ownerFisher)){
            throw new IllegalArgumentException("O Dono e o Parceiro não podem ser a mesma pessoa");
        }
        this.ownerFisher = ownerFisher;
    }

    public void setPartnerFisher(Fisher partnerFisher) {
        if (ownerFisher != null && ownerFisher.equals(partnerFisher)){
            throw new IllegalArgumentException("O Dono e o Parceiro não podem ser a mesma pessoa");
        }
        this.partnerFisher = partnerFisher;
    }
}
