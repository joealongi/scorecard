package golf.pinpointscore.clubhouse.services;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import golf.pinpointscore.clubhouse.entities.CoursecardEntity;
import golf.pinpointscore.clubhouse.entities.ScorecardEntity;
import golf.pinpointscore.clubhouse.entities.UserEntity;
import golf.pinpointscore.clubhouse.models.ScorecardModel;
import golf.pinpointscore.clubhouse.repositories.CoursecardRepository;
import golf.pinpointscore.clubhouse.repositories.ScorecardRepository;
import golf.pinpointscore.clubhouse.repositories.UserRepository;

@Service
public class ScorecardService {

    private final ScorecardRepository scorecardRepository;
    private final UserRepository userRepository;
    private final CoursecardRepository coursecardRepository;

    public ScorecardService(ScorecardRepository scorecardRepository, UserRepository userRepository, CoursecardRepository coursecardRepository) {
        this.scorecardRepository = scorecardRepository;
        this.userRepository = userRepository;
        this.coursecardRepository = coursecardRepository;
    }

    public List<ScorecardModel> getAllScorecards(){
        // Initialize an empty list to hold the scorecard models
        List<ScorecardModel> scorecards = new ArrayList<>();

        // Fetch all scorecards from the repository
        Iterable<ScorecardEntity> allScorecards = scorecardRepository.findAll();

        allScorecards.forEach(scorecard -> {

            // Get the scorecard ID
            Long id = scorecard.getId();
            int scorecardId = scorecard.getScorecardId();

            // Fetch the user associated with the scorecard
            UserEntity user = userRepository.findByUserId(scorecard.getUserId());

            // For each scorecard, create a ScorecardModel entry
            java.sql.Timestamp submitted = scorecard.getSubmitted();
            java.sql.Timestamp updated = scorecard.getSubmitted();
            
            String userName = user.getUserName();
            int userRank = user.getUserRank();
            int userHandicap = user.getUserHandicap();
            List<Integer> userScores = scorecard.getUserScores();
            Integer userTotalScore = userScores.stream()
                .mapToInt(Integer::intValue)
                .sum();
            int coursecardId = scorecard.getCoursecardId();

            // Fetch the coursecard associated with the scorecard
            List<CoursecardEntity> coursecards = coursecardRepository.findAllByCoursecardId(coursecardId);
            CoursecardEntity coursecard = coursecards.isEmpty() ? null : coursecards.get(0);

            // If the coursecard is found, use its details; otherwise, use defaults from the scorecard
            String coursecardName = coursecard != null ? coursecard.getCoursecardName() : scorecard.getCoursecardName();
            List<Integer> coursecardPars = coursecard != null ? coursecard.getCoursecardPars() : scorecard.getCoursecardPars();
            Integer coursecardTotalPar = coursecardPars.stream()
                .mapToInt(Integer::intValue)
                .sum();
            Integer coursecardHolesPlayed = scorecard.getUserScores().size();

            // Create a new ScorecardModel instance with the calculated values
            ScorecardModel scorecardEntry = new ScorecardModel(
                id,
                scorecardId,
                submitted,
                updated,
                user.getUserId(),
                userName,
                userRank,
                userHandicap,
                userScores,
                userTotalScore,
                coursecardId,
                coursecardName,
                coursecardPars,
                coursecardTotalPar,
                coursecardHolesPlayed
            );

            // Add the new scorecard entry to the scorecard list
            scorecards.add(scorecardEntry);
        });

        // Sort the scorecards by submitted timestamp in descending order
        scorecards.sort((a, b) -> b.getSubmitted().compareTo(a.getSubmitted()));
        List<ScorecardModel> limitedScorecards = scorecards.stream().limit(18).collect(Collectors.toList());

        return limitedScorecards;
    }

    public List<ScorecardModel> getScorecardsByUserId(String userId){

        // Initialize an empty list to hold the scorecard models
        List<ScorecardModel> scorecards = new ArrayList<>();

        // Fetch all scorecards from the repository
        Iterable<ScorecardEntity> userScorecards = scorecardRepository.findByUserId(userId);

        // Iterate through each scorecard and calculate the total score
        userScorecards.forEach(scorecard -> {

            // Get the scorecard ID
            Long id = scorecard.getId();
            int scorecardId = scorecard.getScorecardId();

            // Fetch the user associated with the scorecard
            UserEntity user = userRepository.findByUserId(scorecard.getUserId());

            // For each scorecard, create a ScorecardModel entry
            java.sql.Timestamp submitted = scorecard.getSubmitted();
            java.sql.Timestamp updated = scorecard.getSubmitted();
            String userName = user.getUserName();
            int userRank = user.getUserRank();
            int userHandicap = user.getUserHandicap();
            List<Integer> userScores = scorecard.getUserScores();
            Integer userTotalScore = userScores.stream()
                .mapToInt(Integer::intValue)
                .sum();
            int coursecardId = scorecard.getCoursecardId();

            // Fetch the coursecard associated with the scorecard
            List<CoursecardEntity> coursecards = coursecardRepository.findAllByCoursecardId(coursecardId);
            CoursecardEntity coursecard = coursecards.isEmpty() ? null : coursecards.get(0);

            // If the coursecard is found, use its details; otherwise, use defaults from the scorecard
            String coursecardName = coursecard != null ? coursecard.getCoursecardName() : scorecard.getCoursecardName();
            List<Integer> coursecardPars = coursecard != null ? coursecard.getCoursecardPars() : scorecard.getCoursecardPars();
            Integer coursecardTotalPar = coursecardPars.stream()
                .mapToInt(Integer::intValue)
                .sum();
            Integer coursecardHolesPlayed = scorecard.getUserScores().size();

            // Create a new ScorecardModel instance with the calculated values
            ScorecardModel scorecardEntry = new ScorecardModel(
                id,
                scorecardId,
                submitted,
                updated, 
                userId,
                userName,
                userRank,
                userHandicap,
                userScores,
                userTotalScore,
                coursecardId,
                coursecardName,
                coursecardPars,
                coursecardTotalPar,
                coursecardHolesPlayed
            );

            // Add the new scorecard entry to the scorecard list
            scorecards.add(scorecardEntry);

        });

        return scorecards;

    }

    // Fetch all scorecards by userId and timestamp
    public List<ScorecardEntity> getScorecardsByUserIdAndTimestamp(String userId, Timestamp timestamp) {

        return scorecardRepository.findByUserId(userId)
            .stream()
            .filter(scorecard -> scorecard.getSubmitted().equals(timestamp))
            .toList();
            
    }

}
