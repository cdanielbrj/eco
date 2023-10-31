package com.eco.backspring.restapis.User_API.controller;

import com.eco.backspring.restapis.Fisher_API.entity.Fisher;
import com.eco.backspring.restapis.User_API.DTO.AuthenticationDTO;
import com.eco.backspring.restapis.User_API.DTO.LoginResponseDTO;
import com.eco.backspring.restapis.User_API.DTO.RegisterDTO;
import com.eco.backspring.restapis.User_API.DTO.UpdateDTO;
import com.eco.backspring.restapis.User_API.entity.User;
import com.eco.backspring.restapis.User_API.repository.UserRepository;
import com.eco.backspring.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/eco_system/auth")
public class UserController {

    private final UserRepository repository;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    @Autowired
    public UserController(UserRepository repository,
                                    AuthenticationManager authenticationManager,
                                    TokenService tokenService) {
        this.repository = repository;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @GetMapping("/user/list")
    public List<User> listar() {
        return repository.findAll();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        Optional<User> userOptional = repository.findById(id);

        return userOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO data){
        if (this.repository.findByLogin(data.login()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.login(), encryptedPassword, data.role(), data.nome(), data.contato());

        this.repository.save(newUser);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody UpdateDTO updateData) {
        // Validação para encontrar primeiro
        Optional<User> optionalUser = repository.findById(id);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }


        User user = optionalUser.get();
        user.setNome(updateData.nome());
        user.setContato(updateData.contato());
        repository.save(user);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
