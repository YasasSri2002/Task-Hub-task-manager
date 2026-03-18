package edu.yasas.task_hub.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskRequestDto {

    private String title;

    private String description;

    private String status; //In Progress, completed, due

    private LocalDateTime createdAt;

}
