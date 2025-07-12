package golf.pinpointscore.clubhouse.models;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ScoreboardModel {

    private int userId;
    private Timestamp submitted;
    private String userName;
    private int userHandicap;
    private String golfCourse;
    private int holesPlayed;
    private int totalScore;
    private int scoreboardScore;

}