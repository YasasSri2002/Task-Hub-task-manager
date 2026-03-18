package edu.yasas.task_hub.repository;

import edu.yasas.task_hub.enity.TaskEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends CrudRepository<TaskEntity,Long> {
}
