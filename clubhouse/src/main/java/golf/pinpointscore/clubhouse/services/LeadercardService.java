package golf.pinpointscore.clubhouse.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import golf.pinpointscore.clubhouse.entities.ScorecardEntity;
import golf.pinpointscore.clubhouse.entities.UserEntity;
import golf.pinpointscore.clubhouse.models.LeadercardModel;
import golf.pinpointscore.clubhouse.repositories.ScorecardRepository;
import golf.pinpointscore.clubhouse.repositories.UserRepository;

@Service
public class LeadercardService {

    private final ScorecardRepository scorecardRepository;
    private final UserRepository userRepository;

    public LeadercardService(ScorecardRepository scorecardRepository, UserRepository userRepository) {
        this.scorecardRepository = scorecardRepository;
        this.userRepository = userRepository;
    }

    public List<LeadercardModel> getLeadercard(){
        
        // Initialize an empty list to hold the leadercard models
        List<LeadercardModel> leadercard = new ArrayList<>();

        // Fetch all scorecards from the repository
        Iterable<ScorecardEntity> scorecards = scorecardRepository.findAll();

        // Iterate through each scorecard and calculate the total score
        scorecards.forEach(scorecard -> {

            // Fetch the user associated with the scorecard
            UserEntity user = userRepository.findByUserId(scorecard.getUserId());

            // For each scorecard, create a LeadercardModel entry
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
            int golfCourseId = scorecard.getGolfCourseId();
            String golfCourseName = scorecard.getGolfCourseName();
            List<Integer> golfCoursePars = scorecard.getGolfCoursePars();
            Integer golfCourseTotalPar = golfCoursePars.stream()
                .mapToInt(Integer::intValue)
                .sum();
            Integer golfCourseHolesPlayed = scorecard.getUserScores().size();

            // Create a new LeadercardModel instance with the calculated values
            LeadercardModel leadercardEntry = new LeadercardModel(
                submitted,
                updated,
                userId,
                userName,
                userRank,
                userHandicap,
                userScores,
                userTotalScore,
                golfCourseId,
                golfCourseName,
                golfCoursePars,
                golfCourseTotalPar,
                golfCourseHolesPlayed
            );

            // TODO: Get golfCourse name from the golfCourse
            // TODO: Get golfCourse pars from the golfCourse

            // Add the new leadercard entry to the leadercard list
            leadercard.add(leadercardEntry);

        });

        return leadercard;

    }

	public List<LeadercardModel> getLeadercardLimited(int amount) {

        // Get the full leadercard
        List<LeadercardModel> leadercard = this.getLeadercard();

        // Sort the leadercard by user rank in ascending order
        leadercard.sort((a, b) -> Integer.compare(a.getUserRank(), b.getUserRank()));

        // If the leadercard has more entries than the specified amount, limit it to that amount
        if (leadercard.size() > amount) {
            return leadercard.subList(0, amount);
        }

        return leadercard;

	}

}
