package edu.yasas.task_hub.service.impl;

import edu.yasas.task_hub.dto.TaskDto;
import edu.yasas.task_hub.dto.request.TaskRequestDto;
import edu.yasas.task_hub.dto.response.TaskResponseDto;
import edu.yasas.task_hub.enity.TaskEntity;
import edu.yasas.task_hub.enity.UserEntity;
import edu.yasas.task_hub.exceptions.TaskNotFoundException;
import edu.yasas.task_hub.exceptions.UserNotFoundException;
import edu.yasas.task_hub.repository.TaskRepository;
import edu.yasas.task_hub.repository.UserRepository;
import edu.yasas.task_hub.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static edu.yasas.task_hub.service.impl.UserServiceImpl.getUserDto;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public static TaskResponseDto getTaskResponseDto(TaskEntity taskEntity){
        TaskResponseDto taskResponseDto = new TaskResponseDto();
        taskResponseDto.setId(taskEntity.getId());
        taskResponseDto.setStatus(taskEntity.getStatus());
        taskResponseDto.setTitle(taskEntity.getTitle());
        taskResponseDto.setDescription(taskEntity.getDescription());
        taskResponseDto.setCreatedAt(taskEntity.getCreatedAt());
        taskResponseDto.setUser(getUserDto(taskEntity.getUserEntity()));

        return taskResponseDto;
    }

    public static  TaskDto getTaskDto(TaskEntity taskEntity){

        TaskDto taskDto = new TaskDto();
        taskDto.setId(taskEntity.getId());
        taskDto.setStatus(taskEntity.getStatus());
        taskDto.setTitle(taskEntity.getTitle());
        taskDto.setDescription(taskEntity.getDescription());
        taskDto.setCreatedAt(taskEntity.getCreatedAt());

        return taskDto;
    }


    @Override
    public ResponseEntity<TaskDto> persist(TaskRequestDto taskRequestDto) {
        TaskEntity taskEntity = new TaskEntity();
        taskEntity.setTitle(taskRequestDto.getTitle());
        taskEntity.setDescription(taskRequestDto.getDescription());
        taskEntity.setCreatedAt(LocalDateTime.now());
        taskEntity.setStatus(taskRequestDto.getStatus());

        UserEntity userEntity = userRepository.findById(UUID.fromString(taskRequestDto.getUserId()))
                .orElseThrow(() -> new UserNotFoundException("user has not found"));

        taskEntity.setUserEntity(userEntity);

        TaskEntity saved = taskRepository.save(taskEntity);

        return ResponseEntity.ok(getTaskDto(saved));

    }

    @Override
    public ResponseEntity<List<TaskResponseDto>> getAllTasks() {
        ArrayList<TaskResponseDto> taskResponseDtoArrayList = new ArrayList<>();

        Iterable<TaskEntity> taskEntityList = taskRepository.findAll();

        taskEntityList.forEach(taskEntity ->
                taskResponseDtoArrayList.add(getTaskResponseDto(taskEntity)));
        return ResponseEntity.ok(taskResponseDtoArrayList);

    }

    @Override
    public ResponseEntity<TaskResponseDto> getTaskById(Long taskId) {

        TaskEntity taskEntity = taskRepository.findById(taskId).orElseThrow(
                () -> new TaskNotFoundException("task is not found"));

        return ResponseEntity.ok(getTaskResponseDto(taskEntity));
    }

    @Override
    public ResponseEntity<Map<String, String>> deleteTaskById(Long taskId) {
        if(!taskRepository.existsById(taskId)){
            throw new TaskNotFoundException("task is not found");
        }

        taskRepository.deleteById(taskId);

        return ResponseEntity.ok(Map.of("Success", taskId +" has been deleted"));
    }

    @Override
    public ResponseEntity<TaskDto> updateTaskById(
            Long taskId, TaskRequestDto taskRequestDto)
    {
        TaskEntity taskEntity = taskRepository.findById(taskId).orElseThrow(() ->
                new TaskNotFoundException(String.format("%d task is not found", taskId)));

        if(taskRequestDto.getTitle() != null || !taskRequestDto.getTitle().isEmpty()){
            taskEntity.setTitle(taskRequestDto.getTitle());
        }
        if(taskRequestDto.getDescription() != null || !taskRequestDto.getDescription().isEmpty()){
            taskEntity.setDescription(taskRequestDto.getDescription());
        }

        if(taskRequestDto.getStatus() != null || !taskRequestDto.getStatus().isEmpty()){
            taskEntity.setStatus(taskRequestDto.getStatus());
        }


        TaskEntity saved = taskRepository.save(taskEntity);

        return ResponseEntity.ok(getTaskDto(saved));
    }
}
