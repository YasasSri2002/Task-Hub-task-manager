package edu.yasas.task_hub.dto.response;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ErrorResponseDto {
    private String message;
    private HttpStatus httpStatus;
}
