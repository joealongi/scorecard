package golf.pinpointscore.clubhouse.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import golf.pinpointscore.clubhouse.entities.ScorecardEntity;
import golf.pinpointscore.clubhouse.entities.UserEntity;
import golf.pinpointscore.clubhouse.models.ScoreboardModel;
import golf.pinpointscore.clubhouse.repositories.ScorecardRepository;
import golf.pinpointscore.clubhouse.repositories.UserRepository;

@Service
public class ScoreboardService {

    private final ScorecardRepository scorecardRepository;
    private final UserRepository userRepository;

    public ScoreboardService(ScorecardRepository scorecardRepository, UserRepository userRepository) {
        this.scorecardRepository = scorecardRepository;
        this.userRepository = userRepository;
    }

    public List<ScoreboardModel> getScoreboard(){
        
        // Initialize an empty list to hold the scoreboard models
        List<ScoreboardModel> scoreboard = new ArrayList<>();

        // Fetch all scorecards from the repository
        Iterable<ScorecardEntity> scorecards = scorecardRepository.findAll();

        // Iterate through each scorecard and calculate the total score
        scorecards.forEach(scorecard -> {

            // Fetch the user associated with the scorecard
            UserEntity user = userRepository.findByUserId((int) scorecard.getUserId());

            // For each scorecard, create a ScoreboardModel entry
            int userId = scorecard.getUserId();
            java.sql.Timestamp submitted = scorecard.getSubmitted();
            String userName = user.getUserName();
            int userHandicap = user.getUserHandicap();
            String golfCourse = scorecard.getGolfCourse();
            int holesPlayed = scorecard.getHolesPlayed();
            int totalScore = scorecard.getTotalScore();

            // Calculate the total score based on the scorecard, golf course par, and user handicap
            Integer scoreboardScore = Integer.parseInt(String.valueOf(scorecard.getTotalScore()))
                - Integer.parseInt(String.valueOf(scorecard.getGolfCoursePar()))
                - Integer.parseInt(String.valueOf(user.getUserHandicap()));

            // Create a new ScoreboardModel instance with the calculated values
            ScoreboardModel scoreboardEntry = new ScoreboardModel(
                userId,
                submitted,
                userName,
                userHandicap,
                golfCourse,
                holesPlayed,
                totalScore,
                scoreboardScore
            );

            // Add the new scoreboard entry to the scoreboard list
            scoreboard.add(scoreboardEntry);

        });

        return scoreboard;

    }

	public List<ScoreboardModel> getScoreboardLimited(int amount) {

        // Get the full scoreboard
        List<ScoreboardModel> scoreboard = this.getScoreboard();

        // Sort the scoreboard by scoreboard score in ascending order
        scoreboard.sort((a, b) -> Integer.compare(a.getScoreboardScore(), b.getScoreboardScore()));

        // If the scoreboard has more entries than the specified amount, limit it to that amount
        if (scoreboard.size() > amount) {
            return scoreboard.subList(0, amount);
        }

        return scoreboard;

	}

}
