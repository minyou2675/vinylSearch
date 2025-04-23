package com.lpsearch.service;

import com.lpsearch.domain.User;
import com.lpsearch.dto.LoginRequestDto;
import com.lpsearch.dto.SignupRequestDto;
import com.lpsearch.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jdk.jfr.Enabled;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@Disabled("코드 변경됨")
class AuthServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private AuthenticationManager authenticationManager;
    @Mock private HttpServletRequest request;

    @InjectMocks private AuthService authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void login_success() {
        // given
        LoginRequestDto dto = new LoginRequestDto();
        dto.setUsername("testuser");
        dto.setPassword("testpass");
        MockHttpServletRequest request = new MockHttpServletRequest();

        // when
        authService.login(dto, request);

        // then
        assertNotNull(request.getSession(false)); // 세션이 생겼는지 확인
    }

    @Test
    void signup_duplicateUsername_throwsException() {
        // given
        SignupRequestDto dto = new SignupRequestDto();
        dto.setUsername("existingUser");
        when(userRepository.existsByUsername("existingUser")).thenReturn(true);

        // expect
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> {
            authService.signup(dto);
        });
        assertEquals("이미 존재하는 사용자명입니다.", ex.getMessage());
    }


    @Test
    void logout_success() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.getSession(); // 세션 미리 생성

        authService.logout(request);

        assertNull(request.getSession(false)); // 세션 무효화 확인
    }
}