package com.lpsearch.dto;

import lombok.Data;

@Data
public class SignupRequestDto {
    private String username;
    private String password;
    private String email;
}
