package edu.yasas.task_hub.dto.response;

import edu.yasas.task_hub.dto.UserDto;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class TaskResponseDto {

    private Long id;

    private String title;

    private String description;

    private String status;

    private LocalDateTime createdAt;

    private UserDto user;


}
