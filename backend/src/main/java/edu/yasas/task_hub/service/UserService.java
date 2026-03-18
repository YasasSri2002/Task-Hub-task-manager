package edu.yasas.task_hub.service;

import edu.yasas.task_hub.dto.UserDto;
import edu.yasas.task_hub.dto.request.UserRequstDto;
import org.springframework.http.ResponseEntity;

public interface UserService {

    ResponseEntity<UserDto>register(UserRequstDto userRequestDto);

}
