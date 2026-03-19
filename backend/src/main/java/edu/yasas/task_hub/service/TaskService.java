package edu.yasas.task_hub.service;

import edu.yasas.task_hub.dto.TaskDto;
import edu.yasas.task_hub.dto.request.TaskRequestDto;
import edu.yasas.task_hub.dto.response.TaskResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface TaskService {

    ResponseEntity<TaskDto>persist(TaskRequestDto taskRequestDto);

    ResponseEntity<List<TaskResponseDto>>getAllTasks();

    ResponseEntity<TaskResponseDto>getTaskById(Long taskId);

    ResponseEntity<Map<String,String>>deleteTaskById(Long taskId);

    ResponseEntity<TaskDto> updateTaskById(Long taskId, TaskRequestDto taskRequestDto);

    ResponseEntity<Map<String,String>>markAsComplete(Long taskId);

    ResponseEntity<Map<String,String>>markAsInProgress(Long taskId);


}
