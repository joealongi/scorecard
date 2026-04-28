package golf.pinpointscore.clubhouse.entities;

import java.sql.Timestamp;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
public class CoursecardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Timestamp submitted;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = true)
    private Timestamp updated;

    @Column(nullable = false)
    private int coursecardId;
    private String coursecardName;
    private List<Integer> coursecardPars;
    private Integer coursecardTotalPar;

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