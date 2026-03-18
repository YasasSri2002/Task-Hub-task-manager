package edu.yasas.task_hub.controller;

import edu.yasas.task_hub.dto.UserDto;
import edu.yasas.task_hub.dto.request.UserRequstDto;
import edu.yasas.task_hub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto>register(@RequestBody UserRequstDto userRequstDto){
        return userService.register(userRequstDto);
    }
}
