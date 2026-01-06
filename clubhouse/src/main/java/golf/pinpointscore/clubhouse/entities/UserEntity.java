package golf.pinpointscore.clubhouse.entities;

import java.sql.Timestamp;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false)
    private Timestamp submitted;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = true)
    private Timestamp updated;

    @Column(nullable = false)
    private String userId;
    private String userName;
    private String userFirstName;
    private String userLastName;
    private String userEmail;
    private String userCountry;
    private String userCity;
    private int userCourseId;
    private String userCourseName;
    private int userHandicap;
    private int userRank;

    @PrePersist
    protected void onCreate() {
        this.submitted = new Timestamp(System.currentTimeMillis());
        this.updated = new Timestamp(System.currentTimeMillis());
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated = new Timestamp(System.currentTimeMillis());
    }

}