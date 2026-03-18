package edu.yasas.task_hub.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class TaskResponseDto {

    private String title;

    private String description;

    private String status;

    private LocalDateTime createdAt;


}
