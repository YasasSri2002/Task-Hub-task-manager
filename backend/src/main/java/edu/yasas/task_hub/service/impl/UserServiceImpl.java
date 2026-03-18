package edu.yasas.task_hub.service.impl;

import edu.yasas.task_hub.dto.UserDto;
import edu.yasas.task_hub.dto.request.UserRequstDto;
import edu.yasas.task_hub.enity.UserEntity;
import edu.yasas.task_hub.exceptions.EmailAlreadyExistException;
import edu.yasas.task_hub.repository.UserRepository;
import edu.yasas.task_hub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public static UserDto getUserDto(UserEntity userEntity){
        return UserDto.builder()
                .id(userEntity.getId())
                .username(userEntity.getUsername())
                .email(userEntity.getEmail())
                .build();
    }


    @Override
    public ResponseEntity<UserDto> register(UserRequstDto userRequestDto) {

        Optional<UserEntity> byEmail =
                userRepository.findByEmail(userRequestDto.getEmail());

        if(byEmail.isPresent()){
            throw new EmailAlreadyExistException("This email has been registered before");
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(userRequestDto.getUsername());
        userEntity.setEmail(userRequestDto.getEmail());
        userEntity.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));

        UserEntity saved = userRepository.save(userEntity);

        return ResponseEntity.ok(getUserDto(saved));
    }
}
