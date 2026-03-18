package edu.yasas.task_hub.service;

import edu.yasas.task_hub.dto.TaskDto;
import edu.yasas.task_hub.dto.request.TaskRequestDto;
import edu.yasas.task_hub.dto.response.TaskResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TaskService {

    ResponseEntity<TaskDto>persist(TaskRequestDto taskRequestDto);

    ResponseEntity<List<TaskResponseDto>>getAllTasks();
}
