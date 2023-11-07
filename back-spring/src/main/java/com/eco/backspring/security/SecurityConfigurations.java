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

                        // Endpoints abertos a todos os usuários
                        .requestMatchers(HttpMethod.POST, "/eco_system/auth/login").permitAll()

                        // Endpoints de expedição restritos ao papel USER ou ADMIN
                        .requestMatchers(HttpMethod.POST, "/eco_system/expedition-oprs").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.PUT, "/eco_system/expedition-oprs/**").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/eco_system/expedition-oprs/**").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/eco_system/expedition-oprs").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/eco_system/auth/user/list").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/eco_system/fisher-oprs").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/eco_system/ship-oprs").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/eco_system/local-oprs").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/eco_system/trash-oprs").hasAnyRole("ADMIN", "USER")

                        // Endpoints de expedição restritos ao papel ADMIN
                        .requestMatchers(HttpMethod.GET, "/eco_system/auth/user/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/eco_system/auth/register").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/eco_system/auth/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/eco_system/auth/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/eco_system/expedition-oprs/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/eco_system/fisher-oprs/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/eco_system/fisher-oprs").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/eco_system/fisher-oprs/**/newAdv").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/eco_system/fisher-oprs/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/eco_system/fisher-oprs/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/eco_system/ship-oprs/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/eco_system/ship-oprs").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/eco_system/ship-oprs/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/eco_system/ship-oprs/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/eco_system/local-oprs/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/eco_system/local-oprs").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/eco_system/local-oprs/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/eco_system/local-oprs/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/eco_system/trash-oprs/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/eco_system/trash-oprs").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/eco_system/trash-oprs/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/eco_system/trash-oprs/**").hasRole("ADMIN")

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
