package edu.yasas.task_hub.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskDto {

    private Long id;

    private String title;

    private String description;

    private String status;

    private LocalDateTime createdAt;

}
