package edu.yasas.task_hub.service.impl;

import edu.yasas.task_hub.config.CustomUserDetail;
import edu.yasas.task_hub.dto.UserDto;
import edu.yasas.task_hub.dto.request.LoginRequestDto;
import edu.yasas.task_hub.dto.request.UserRequstDto;
import edu.yasas.task_hub.dto.response.LoginResponseDto;
import edu.yasas.task_hub.enity.UserEntity;
import edu.yasas.task_hub.exceptions.EmailAlreadyExistException;
import edu.yasas.task_hub.repository.UserRepository;
import edu.yasas.task_hub.service.UserService;
import edu.yasas.task_hub.utill.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

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

    @Override
    public ResponseEntity<LoginResponseDto> login(LoginRequestDto loginRequestDto) {

        Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(
                loginRequestDto.getEmail(), loginRequestDto.getPassword());

        Authentication authResponse;

        try{
            authResponse = authenticationManager.authenticate(authentication);
        }catch (Exception ex){
            throw new BadCredentialsException("Bad Credentials",ex);

        }

        if(authResponse == null || !authResponse.isAuthenticated()){
            throw new BadCredentialsException("Bad Credentials");
        }

        CustomUserDetail userDetail = (CustomUserDetail) authResponse.getPrincipal();

        String token = "Bearer " +  jwtTokenProvider.generateToken(authResponse);

        assert userDetail != null;

        return ResponseEntity.ok()
                .header("Authorization",token)
                .body(new LoginResponseDto(
                        userDetail.getUserId(),userDetail.getUsername(),token)
                );
    }
}
