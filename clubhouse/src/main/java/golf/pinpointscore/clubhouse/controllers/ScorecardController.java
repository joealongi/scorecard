package golf.pinpointscore.clubhouse.controllers;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import golf.pinpointscore.clubhouse.entities.ScorecardEntity;
import golf.pinpointscore.clubhouse.repositories.ScorecardRepository;
import golf.pinpointscore.clubhouse.services.ScorecardService;

public class ScorecardController {

    private final ScorecardRepository scorecardRepository;
    private final ScorecardService scorecardService;

    ScorecardController(ScorecardRepository scorecardRepository, ScorecardService scorecardService) {
        this.scorecardRepository = scorecardRepository;
        this.scorecardService = scorecardService;
    }

    // Get all scorecards by userId
    @GetMapping("/scorecards/{userId}")
    List<ScorecardEntity> getScorecardsByUserId(@PathVariable int userId) {

        return scorecardRepository.findByUserId(userId);

    }

    // Get a scorecard by userId and timestamp
    @GetMapping("/scorecards/{userId}/{timestamp}")
    List<ScorecardEntity> getScorecardsByUserId(@PathVariable int userId, @PathVariable Timestamp timestamp) {

        return scorecardService.getScorecardsByUserIdAndTimestamp(userId, timestamp);

    }

    // Create a new scorecard
    @PostMapping("/scorecards")
    ScorecardEntity newScorecard(@RequestBody ScorecardEntity newScorecard) {

        return scorecardRepository.save(newScorecard);

    }

    // Update an existing scorecard by userId
    @PatchMapping("/scorecards/{userId}")
    ScorecardEntity updateScorecard(@RequestBody ScorecardEntity newScorecard, @PathVariable Long userId) {

        return scorecardRepository.findById(userId).map(scorecard -> {

            updateScorecardFields(scorecard, newScorecard);
            return scorecardRepository.save(scorecard);

        })
        .orElseGet(() -> scorecardRepository.save(newScorecard));

    }

    // Delete a scorecard by userId
    @DeleteMapping("/scorecards/user/{userId}")
    ScorecardEntity deleteScorecard(@PathVariable Long userId) {

        scorecardRepository.deleteById(userId);
        return null;

    }

    // Helper method to update scorecard fields
    private void updateScorecardFields(ScorecardEntity scorecard, ScorecardEntity newScorecard) {
        if (newScorecard.getGolfCourse() != null) {
            scorecard.setGolfCourse(newScorecard.getGolfCourse());
        }
        if (newScorecard.getGolfCoursePar() != 0) {
            scorecard.setGolfCoursePar(newScorecard.getGolfCoursePar());
        }
        if (newScorecard.getHolesPlayed() != 0) {
            scorecard.setHolesPlayed(newScorecard.getHolesPlayed());
        }
        if (newScorecard.getTotalScore() != 0) {
            scorecard.setTotalScore(newScorecard.getTotalScore());
        }

        updateHoleScore(scorecard, newScorecard, 1);
        updateHoleScore(scorecard, newScorecard, 2);
        updateHoleScore(scorecard, newScorecard, 3);
        updateHoleScore(scorecard, newScorecard, 4);
        updateHoleScore(scorecard, newScorecard, 5);
        updateHoleScore(scorecard, newScorecard, 6);
        updateHoleScore(scorecard, newScorecard, 7);
        updateHoleScore(scorecard, newScorecard, 8);
        updateHoleScore(scorecard, newScorecard, 9);
        updateHoleScore(scorecard, newScorecard, 10);
        updateHoleScore(scorecard, newScorecard, 11);
        updateHoleScore(scorecard, newScorecard, 12);
        updateHoleScore(scorecard, newScorecard, 13);
        updateHoleScore(scorecard, newScorecard, 14);
        updateHoleScore(scorecard, newScorecard, 15);
        updateHoleScore(scorecard, newScorecard, 16);
        updateHoleScore(scorecard, newScorecard, 17);
        updateHoleScore(scorecard, newScorecard, 18);
    }

    // Helper to update hole scores by number
    private void updateHoleScore(ScorecardEntity scorecard, ScorecardEntity newScorecard, int holeNumber) {
        int newScore = 0;
        switch (holeNumber) {
            case 1: newScore = newScorecard.getHoleOneScore(); break;
            case 2: newScore = newScorecard.getHoleTwoScore(); break;
            case 3: newScore = newScorecard.getHoleThreeScore(); break;
            case 4: newScore = newScorecard.getHoleFourScore(); break;
            case 5: newScore = newScorecard.getHoleFiveScore(); break;
            case 6: newScore = newScorecard.getHoleSixScore(); break;
            case 7: newScore = newScorecard.getHoleSevenScore(); break;
            case 8: newScore = newScorecard.getHoleEightScore(); break;
            case 9: newScore = newScorecard.getHoleNineScore(); break;
            case 10: newScore = newScorecard.getHoleTenScore(); break;
            case 11: newScore = newScorecard.getHoleElevenScore(); break;
            case 12: newScore = newScorecard.getHoleTwelveScore(); break;
            case 13: newScore = newScorecard.getHoleThirteenScore(); break;
            case 14: newScore = newScorecard.getHoleFourteenScore(); break;
            case 15: newScore = newScorecard.getHoleFifteenScore(); break;
            case 16: newScore = newScorecard.getHoleSixteenScore(); break;
            case 17: newScore = newScorecard.getHoleSeventeenScore(); break;
            case 18: newScore = newScorecard.getHoleEighteenScore(); break;
            default: break;
        }
        if (newScore != 0) {
            switch (holeNumber) {
                case 1: scorecard.setHoleOneScore(newScore); break;
                case 2: scorecard.setHoleTwoScore(newScore); break;
                case 3: scorecard.setHoleThreeScore(newScore); break;
                case 4: scorecard.setHoleFourScore(newScore); break;
                case 5: scorecard.setHoleFiveScore(newScore); break;
                case 6: scorecard.setHoleSixScore(newScore); break;
                case 7: scorecard.setHoleSevenScore(newScore); break;
                case 8: scorecard.setHoleEightScore(newScore); break;
                case 9: scorecard.setHoleNineScore(newScore); break;
                case 10: scorecard.setHoleTenScore(newScore); break;
                case 11: scorecard.setHoleElevenScore(newScore); break;
                case 12: scorecard.setHoleTwelveScore(newScore); break;
                case 13: scorecard.setHoleThirteenScore(newScore); break;
                case 14: scorecard.setHoleFourteenScore(newScore); break;
                case 15: scorecard.setHoleFifteenScore(newScore); break;
                case 16: scorecard.setHoleSixteenScore(newScore); break;
                case 17: scorecard.setHoleSeventeenScore(newScore); break;
                case 18: scorecard.setHoleEighteenScore(newScore); break;
                default: break;
            }
        }
    }
    
}
