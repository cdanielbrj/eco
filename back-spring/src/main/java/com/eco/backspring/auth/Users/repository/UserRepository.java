package com.eco.backspring.auth.Users.repository;

import com.eco.backspring.auth.Users.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<UserAuth, String> {
    UserDetails findByLogin(String login);
}
