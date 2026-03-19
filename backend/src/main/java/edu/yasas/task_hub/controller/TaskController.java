package edu.yasas.task_hub.controller;

import edu.yasas.task_hub.dto.TaskDto;
import edu.yasas.task_hub.dto.request.TaskRequestDto;
import edu.yasas.task_hub.dto.response.TaskResponseDto;
import edu.yasas.task_hub.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/task")
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/persist")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<TaskDto> persist(@RequestBody TaskRequestDto taskRequestDto){
        return taskService.persist(taskRequestDto);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<List<TaskResponseDto>>getAllTask(){
        return taskService.getAllTasks();
    }

    @GetMapping("/by-id")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<TaskResponseDto>getTaskById(@RequestParam Long taskId){
        return taskService.getTaskById(taskId);
    }

    @DeleteMapping("/by-id")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<String,String>>deleteById(@RequestParam Long taskId){
        return taskService.deleteTaskById(taskId);
    }

    @PutMapping("/by-id")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<TaskDto>updateById
            (@RequestParam Long taskId, @RequestBody TaskRequestDto taskRequestDto){
        return taskService.updateTaskById(taskId,taskRequestDto);
    }

    @PatchMapping("/by-id/mark-as-completed")
    public ResponseEntity<Map<String,String>> markAsCompleted(@RequestParam Long taskId){
        return taskService.markAsComplete(taskId);
    }

    @PatchMapping("/by-id/mark-as-in-progress")
    public ResponseEntity<Map<String,String>> markAsInProgress(@RequestParam Long taskId){
        return taskService.markAsInProgress(taskId);
    }

}
