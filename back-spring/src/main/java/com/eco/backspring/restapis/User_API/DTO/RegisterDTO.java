package com.eco.backspring.restapis.User_API.DTO;

public record RegisterDTO(
        String login,
        String password,
        String nome,
        String contato,
        UserRole role
) { }
