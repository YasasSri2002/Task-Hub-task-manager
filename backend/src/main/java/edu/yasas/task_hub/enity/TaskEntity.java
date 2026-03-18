package edu.yasas.task_hub.enity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name="task_table")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String status;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonBackReference
    private UserEntity userEntity;


}
