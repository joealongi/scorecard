package golf.pinpointscore.clubhouse.entities;

import java.sql.Timestamp;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
public class ScorecardEntity {

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
    private String userId;
    private List<Integer> userScores;
    private int golfCourseId;
    private String golfCourseName;
    private List<Integer> golfCoursePars;

    // TODO: See if element collection solves binary array and effects other functionality
    // @ElementCollection
    // @CollectionTable(name = "scorecard_user_scores", joinColumns = @JoinColumn(name = "scorecard_id"))
    // @Column(name = "score")  // Each integer stored as a row in this table
    // private List<Integer> userScores = new ArrayList<>();

    // @ElementCollection
    // @CollectionTable(name = "scorecard_golf_course_pars", joinColumns = @JoinColumn(name = "scorecard_id"))
    // @Column(name = "par")
    // private List<Integer> golfCoursePars = new ArrayList<>();

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