package com.lpsearch.controller;

import com.lpsearch.dto.LoginRequestDto;
import com.lpsearch.dto.SignupRequestDto;
import com.lpsearch.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequestDto dto) {
        authService.signup(dto);
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDto dto) {
        String token = authService.login(dto);
        return ResponseEntity.ok(token);
    }

    @GetMapping("/check")
    public ResponseEntity<String> checkAuth() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !authentication.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.ok("인증됨");
        }
        return ResponseEntity.status(401).body("인증되지 않음");
    }
}

