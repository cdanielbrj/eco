package com.eco.backspring.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {
    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/eco_system/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/eco_system/auth/register").permitAll()
                        // Lista todas as expedições - all users //
                        .requestMatchers(HttpMethod.GET, "/eco_system/expedition-oprs").permitAll()
                        // Lista uma expedição - all users //
                        .requestMatchers(HttpMethod.GET, "/eco_system/expedition-oprs/**").permitAll()
                        // Atualiza uma expedição - all users //
                        .requestMatchers(HttpMethod.PUT, "/eco_system/expedition-oprs/**").permitAll()
                        // Cria uma expedição - all users //
                        .requestMatchers(HttpMethod.POST, "/eco_system/expedition").permitAll()
                        // Exclui uma expedição - admin only //
                        .requestMatchers(HttpMethod.DELETE, "/eco_system/expedition-oprs/**").hasRole("ADMIN")
                        // Lista todas as expedições - all users //
                        .requestMatchers(HttpMethod.GET, "/eco_system/fisher-oprs").permitAll()
                        // Lista uma expedição - all users //
                        .requestMatchers(HttpMethod.GET, "/eco_system/fisher-oprs/**").permitAll()
                        // Atualiza uma expedição - all users //
                        .requestMatchers(HttpMethod.PUT, "/eco_system/fisher-oprs/**").permitAll()
                        // Cria uma expedição - all users //
                        .requestMatchers(HttpMethod.POST, "/eco_system/fisher-oprs").permitAll()
                        // Exclui uma pescador - admin only //
                        .requestMatchers(HttpMethod.DELETE, "/eco_system/fisher-oprs/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.addAllowedOrigin("http://localhost:4200");
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
