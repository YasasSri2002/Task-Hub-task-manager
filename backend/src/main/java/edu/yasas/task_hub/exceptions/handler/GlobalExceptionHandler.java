package edu.yasas.task_hub.exceptions.handler;

import edu.yasas.task_hub.dto.response.ErrorResponseDto;
import edu.yasas.task_hub.exceptions.EmailAlreadyExistException;
import edu.yasas.task_hub.exceptions.TaskNotFoundException;
import edu.yasas.task_hub.exceptions.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(EmailAlreadyExistException.class)
    public ResponseEntity<ErrorResponseDto> emailIsExist(EmailAlreadyExistException ex){

        ErrorResponseDto errorResponseDto = new ErrorResponseDto();
        errorResponseDto.setMessage(ex.getMessage());
        errorResponseDto.setHttpStatus(HttpStatus.BAD_REQUEST);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponseDto);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> userHasNotFound(UserNotFoundException exception){

        ErrorResponseDto errorResponseDto = new ErrorResponseDto();
        errorResponseDto.setHttpStatus(HttpStatus.NOT_FOUND);
        errorResponseDto.setMessage(exception.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponseDto);

    }

    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<ErrorResponseDto>taskNotFound(TaskNotFoundException ex){

        ErrorResponseDto errorResponseDto = new ErrorResponseDto();
        errorResponseDto.setHttpStatus(HttpStatus.BAD_REQUEST);
        errorResponseDto.setMessage(ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponseDto);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentials(BadCredentialsException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("message", "Invalid username or password");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }
}
