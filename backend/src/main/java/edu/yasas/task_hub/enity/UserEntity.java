package edu.yasas.task_hub.enity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

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

}
