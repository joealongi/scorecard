package golf.pinpointscore.clubhouse.controllers;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import golf.pinpointscore.clubhouse.entities.CoursecardEntity;
import golf.pinpointscore.clubhouse.entities.ScorecardEntity;
import golf.pinpointscore.clubhouse.models.ScorecardModel;
import golf.pinpointscore.clubhouse.repositories.CoursecardRepository;
import golf.pinpointscore.clubhouse.repositories.ScorecardRepository;
import golf.pinpointscore.clubhouse.services.ScorecardService;

@RestController
@RequestMapping(path = "/scorecard", produces = "application/json")
@CrossOrigin(origins = "*")
public class ScorecardController {

    private final ScorecardRepository scorecardRepository;
    private final ScorecardService scorecardService;
    private final CoursecardRepository coursecardRepository;

    ScorecardController(ScorecardRepository scorecardRepository, ScorecardService scorecardService,
            CoursecardRepository coursecardRepository) {
        this.scorecardRepository = scorecardRepository;
        this.scorecardService = scorecardService;
        this.coursecardRepository = coursecardRepository;
    }

    // Get all scorecards
    @GetMapping("/")
    public List<ScorecardModel> getScorecards() {

        return scorecardService.getAllScorecards();

    }

    // Get all scorecards by userId
    @GetMapping("/{userId}")
    public List<ScorecardModel> getScorecardsByUserId(@PathVariable String userId) {
        List<ScorecardModel> scorecards = scorecardService.getScorecardsByUserId(userId);
        return scorecards;
    }

    // Get a scorecard by userId and timestamp
    @GetMapping("/{userId}/{timestamp}")
    List<ScorecardEntity> getScorecardsByUserId(@PathVariable String userId, @PathVariable Timestamp timestamp) {

        return scorecardService.getScorecardsByUserIdAndTimestamp(userId, timestamp);

    }

    // Create a new scorecard
    @PostMapping("/")
    ScorecardEntity newScorecard(@RequestBody ScorecardEntity newScorecard) {

        // Fetch the last created scorecard
        ScorecardEntity lastScorecard = scorecardRepository.findTopByOrderBySubmittedDesc();

        // Calculate next Id
        int newScorecardId = (lastScorecard != null)
                ? lastScorecard.getScorecardId() + 1
                : 1;

        newScorecard.setScorecardId(newScorecardId);
        newScorecard.setUserId(
                (newScorecard.getUserId() != null && newScorecard.getUserId().length() > 0) ? newScorecard.getUserId()
                        : "");
        newScorecard.setUserScores(newScorecard.getUserScores() != null ? newScorecard.getUserScores()
                : List.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
        newScorecard.setCoursecardId(newScorecard.getCoursecardId() != 0 ? newScorecard.getCoursecardId() : 0);

        // Fetch the coursecard associated with the scorecard
        List<CoursecardEntity> coursecards = coursecardRepository.findAllByCoursecardId(newScorecard.getCoursecardId());
        CoursecardEntity coursecard = coursecards.isEmpty() ? null : coursecards.get(0);

        newScorecard.setCoursecardName(coursecard != null ? coursecard.getCoursecardName() : "Unknown Course");
        newScorecard.setCoursecardPars(coursecard != null ? coursecard.getCoursecardPars()
                : List.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

        return scorecardRepository.save(newScorecard);

    }

    // Update an existing scorecard by scorecardId
    @PatchMapping("/{scorecardId}")
    ScorecardEntity updateScorecard(@RequestBody ScorecardEntity newScorecard, @PathVariable int scorecardId) {

        System.out.println("updateScorecard " + scorecardId);
        System.out.println("updateScorecard " + newScorecard);

        if (scorecardId == 0) {
            throw new IllegalArgumentException("scorecardId cannot be 0");
        }
        return scorecardRepository.findByScorecardId(scorecardId).map(scorecard -> {

            if (newScorecard.getUserScores() != null) {
                scorecard.setUserScores(newScorecard.getUserScores());
            }

            return scorecardRepository.save(scorecard);

        })
                .orElseThrow(() -> new RuntimeException("Scorecard not found with id: " + scorecardId));

    }

    // Delete a scorecard by scorecardId
    @DeleteMapping("/{scorecardId}")
    @Transactional
    ScorecardEntity deleteScorecard(@PathVariable int scorecardId) {

        ScorecardEntity scorecard = scorecardRepository.findByScorecardId(scorecardId)
            .orElseThrow(() -> new RuntimeException("Scorecard not found with id: " + scorecardId));

        scorecardRepository.delete(scorecard);

        return scorecard;

    }
}
