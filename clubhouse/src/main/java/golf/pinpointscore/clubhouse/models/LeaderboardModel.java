package golf.pinpointscore.clubhouse.models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LeaderboardModel {

    private java.sql.Timestamp submitted;
    private java.sql.Timestamp updated;
    private int userId;
    private String userName;
    private int userRank;
    private int userHandicap;
    private List<Integer> userScores;
    private Integer userTotalScore;
    private String golfCourse;
    private List<Integer> golfCoursePars;
    private Integer golfCourseTotalPar;
    private Integer golfCourseHolesPlayed;

}