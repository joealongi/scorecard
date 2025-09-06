package golf.pinpointscore.clubhouse.models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CoursecardModel {

    private java.sql.Timestamp submitted;
    private java.sql.Timestamp updated;
    private int golfCourseId;
    private String golfCourseName;
    private List<Integer> golfCoursePars;
    private Integer golfCourseTotalPar;

}