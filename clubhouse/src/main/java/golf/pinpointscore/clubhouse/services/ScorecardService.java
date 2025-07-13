package golf.pinpointscore.clubhouse.services;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.stereotype.Service;

import golf.pinpointscore.clubhouse.entities.ScorecardEntity;
import golf.pinpointscore.clubhouse.repositories.ScorecardRepository;

@Service
public class ScorecardService {

    private final ScorecardRepository scorecardRepository;

    public ScorecardService(ScorecardRepository scorecardRepository) {
        this.scorecardRepository = scorecardRepository;
    }

    // Fetch all scorecards by userId
    public List<ScorecardEntity> getScorecardsByUserIdAndTimestamp(int userId, Timestamp timestamp) {
        return scorecardRepository.findByUserId(userId)
            .stream()
            .filter(scorecard -> scorecard.getSubmitted().equals(timestamp))
            .toList();
    }

}
