package com.eco.backspring.auth.Users;

public record AuthenticationDTO(
        String login,
        String password
) { }
