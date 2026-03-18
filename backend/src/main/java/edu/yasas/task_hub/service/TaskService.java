package edu.yasas.task_hub.service;

import edu.yasas.task_hub.dto.TaskDto;
import edu.yasas.task_hub.dto.request.TaskRequestDto;
import org.springframework.http.ResponseEntity;

public interface TaskService {

    ResponseEntity<TaskDto>persist(TaskRequestDto taskRequestDto);
}
