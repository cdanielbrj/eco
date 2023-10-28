package com.eco.backspring.auth.Users;

public record RegisterDTO(
        String login,
        String password,
        UserRole role) {
}
