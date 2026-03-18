package edu.yasas.task_hub.service;

import edu.yasas.task_hub.dto.UserDto;
import edu.yasas.task_hub.dto.request.LoginRequestDto;
import edu.yasas.task_hub.dto.request.UserRequstDto;
import edu.yasas.task_hub.dto.response.LoginResponseDto;
import org.springframework.http.ResponseEntity;

public interface UserService {

    ResponseEntity<UserDto>register(UserRequstDto userRequestDto);

    ResponseEntity<LoginResponseDto>login (LoginRequestDto loginRequestDto);

}
