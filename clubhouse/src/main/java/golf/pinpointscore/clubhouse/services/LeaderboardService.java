package golf.pinpointscore.clubhouse.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import golf.pinpointscore.clubhouse.entities.ScorecardEntity;
import golf.pinpointscore.clubhouse.entities.UserEntity;
import golf.pinpointscore.clubhouse.models.LeaderboardModel;
import golf.pinpointscore.clubhouse.repositories.ScorecardRepository;
import golf.pinpointscore.clubhouse.repositories.UserRepository;

@Service
public class LeaderboardService {

    private final ScorecardRepository scorecardRepository;
    private final UserRepository userRepository;

    public LeaderboardService(ScorecardRepository scorecardRepository, UserRepository userRepository) {
        this.scorecardRepository = scorecardRepository;
        this.userRepository = userRepository;
    }

    public List<LeaderboardModel> getLeaderboard(){
        
        // Initialize an empty list to hold the leaderboard models
        List<LeaderboardModel> leaderboard = new ArrayList<>();

        // Fetch all scorecards from the repository
        Iterable<ScorecardEntity> scorecards = scorecardRepository.findAll();

        // Iterate through each scorecard and calculate the total score
        scorecards.forEach(scorecard -> {

            // Fetch the user associated with the scorecard
            UserEntity user = userRepository.findByUserId(scorecard.getUserId());

            // For each scorecard, create a LeaderboardModel entry
            java.sql.Timestamp submitted = scorecard.getSubmitted();
            java.sql.Timestamp updated = scorecard.getSubmitted();
            int userId = scorecard.getUserId();
            String userName = user.getUserName();
            int userRank = user.getUserRank();
            int userHandicap = user.getUserHandicap();
            List<Integer> userScores = scorecard.getUserScores();
            Integer userTotalScore = userScores.stream()
                .mapToInt(Integer::intValue)
                .sum();
            String golfCourse = scorecard.getGolfCourse();
            List<Integer> golfCoursePars = scorecard.getGolfCoursePars();
            Integer golfCourseTotalPar = golfCoursePars.stream()
                .mapToInt(Integer::intValue)
                .sum();
            Integer golfCourseHolesPlayed = scorecard.getUserScores().size();

            // Create a new LeaderboardModel instance with the calculated values
            LeaderboardModel leaderboardEntry = new LeaderboardModel(
                submitted,
                updated,
                userId,
                userName,
                userRank,
                userHandicap,
                userScores,
                userTotalScore,
                golfCourse,
                golfCoursePars,
                golfCourseTotalPar,
                golfCourseHolesPlayed
            );

            // Add the new leaderboard entry to the leaderboard list
            leaderboard.add(leaderboardEntry);

        });

        return leaderboard;

    }

	public List<LeaderboardModel> getLeaderboardLimited(int amount) {

        // Get the full leaderboard
        List<LeaderboardModel> leaderboard = this.getLeaderboard();

        // Sort the leaderboard by user rank in ascending order
        leaderboard.sort((a, b) -> Integer.compare(a.getUserRank(), b.getUserRank()));

        // If the leaderboard has more entries than the specified amount, limit it to that amount
        if (leaderboard.size() > amount) {
            return leaderboard.subList(0, amount);
        }

        return leaderboard;

	}

}
