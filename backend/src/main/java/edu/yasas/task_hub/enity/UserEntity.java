package edu.yasas.task_hub.enity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;
import java.util.UUID;
@Entity
@Table(name = "user_table")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {

    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    private UUID id;

    private String username;

    @Column(unique = true)
    private String email;

    private String password;

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.PERSIST)
    @JsonManagedReference
    private List<TaskEntity> taskEntityList;

}
