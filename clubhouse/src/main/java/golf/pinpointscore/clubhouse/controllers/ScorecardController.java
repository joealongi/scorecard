package golf.pinpointscore.clubhouse.controllers;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import golf.pinpointscore.clubhouse.entities.ScorecardEntity;
import golf.pinpointscore.clubhouse.models.ScorecardModel;
import golf.pinpointscore.clubhouse.repositories.ScorecardRepository;
import golf.pinpointscore.clubhouse.services.ScorecardService;

@RestController
@RequestMapping(path="/scorecard", produces="application/json")
@CrossOrigin(origins="*")
public class ScorecardController {

    private final ScorecardRepository scorecardRepository;
    private final ScorecardService scorecardService;

    ScorecardController(ScorecardRepository scorecardRepository, ScorecardService scorecardService) {
        this.scorecardRepository = scorecardRepository;
        this.scorecardService = scorecardService;
    }

    // Get all scorecards by userId
    @RequestMapping("/{userId}")
    public List<ScorecardModel> getScorecardsByUserId(@PathVariable int userId) {

        return scorecardService.getScorecardsByUserId(userId);

    }

    // Get a scorecard by userId and timestamp
    @GetMapping("/{userId}/{timestamp}")
    List<ScorecardEntity> getScorecardsByUserId(@PathVariable int userId, @PathVariable Timestamp timestamp) {

        return scorecardService.getScorecardsByUserIdAndTimestamp(userId, timestamp);

    }

    // Create a new scorecard
    @PostMapping("/")
    ScorecardEntity newScorecard(@RequestBody ScorecardEntity newScorecard) {

        newScorecard.setSubmitted(new Timestamp(System.currentTimeMillis()));
        newScorecard.setUpdated(new Timestamp(System.currentTimeMillis()));
        newScorecard.setGolfCourseName(newScorecard.getGolfCourseName() != null ? newScorecard.getGolfCourseName() : "Unknown Course");
        newScorecard.setGolfCoursePars(newScorecard.getGolfCoursePars() != null ? newScorecard.getGolfCoursePars() : List.of(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0));

        // TODO: Get golfCourse name from the golfCourse
        // TODO: Get golfCourse pars from the golfCourse

        return scorecardRepository.save(newScorecard);

    }

    // Update an existing scorecard by userId
    @PatchMapping("/{userId}")
    ScorecardEntity updateScorecard(@RequestBody ScorecardEntity newScorecard, @PathVariable Long userId) {

        return scorecardRepository.findById(userId).map(scorecard -> {

            scorecard.setUpdated(new Timestamp(System.currentTimeMillis()));
            if (newScorecard.getUserScores() != null) {
                scorecard.setUserScores(newScorecard.getUserScores());
            }
            if (newScorecard.getGolfCourseId() != 0) {
                scorecard.setGolfCourseId(newScorecard.getGolfCourseId());
            }
            if (newScorecard.getGolfCourseName() != null) {
                scorecard.setGolfCourseName(newScorecard.getGolfCourseName());
            }
            if (newScorecard.getGolfCoursePars() != null) {
                scorecard.setGolfCoursePars(newScorecard.getGolfCoursePars());
            }

            return scorecardRepository.save(scorecard);

        })
        .orElseGet(() -> scorecardRepository.save(newScorecard));

    }

    // Delete a scorecard by userId
    @DeleteMapping("/user/{userId}")
    ScorecardEntity deleteScorecard(@PathVariable Long userId) {

        scorecardRepository.deleteById(userId);
        return null;

    }
}
