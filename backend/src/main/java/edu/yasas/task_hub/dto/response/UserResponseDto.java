package edu.yasas.task_hub.dto.response;


import edu.yasas.task_hub.dto.TaskDto;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class UserResponseDto {

    private UUID id;

    private String username;

    private String email;

    private List<TaskDto> taskDtoList;
}
