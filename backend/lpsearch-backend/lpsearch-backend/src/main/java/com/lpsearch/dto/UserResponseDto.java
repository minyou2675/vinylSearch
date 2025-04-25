package com.lpsearch.dto;

import com.lpsearch.domain.User;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class UserResponseDto {
    private final Long userId;
    private final String username;
    private final String email;

    public UserResponseDto(User user) {
        this.userId = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
}
