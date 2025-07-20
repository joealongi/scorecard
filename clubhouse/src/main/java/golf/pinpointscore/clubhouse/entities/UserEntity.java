package golf.pinpointscore.clubhouse.entities;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
    private int userId;
    private String userName;
    private String userFirstName;
    private String userLastName;
    private String userEmail;
    private String userCountry;
    private String userCity;
    private String userCourse;
    private int userHandicap;
    private int userRank;
    
}