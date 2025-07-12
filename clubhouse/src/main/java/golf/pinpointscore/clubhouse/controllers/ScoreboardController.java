package golf.pinpointscore.clubhouse.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import golf.pinpointscore.clubhouse.models.ScoreboardModel;
import golf.pinpointscore.clubhouse.services.ScoreboardService;

public class ScoreboardController {

    private final ScoreboardService scoreboardService;

    ScoreboardController(ScoreboardService scoreboardService) {
        this.scoreboardService = scoreboardService;
    }

    // Get the scoreboard
    @GetMapping("/scoreboard")
    List<ScoreboardModel> getScoreboard() {

        return scoreboardService.getScoreboard();

    }

    // Get the scoreboard limited by amount
    @GetMapping("/scoreboard/{amount}")
    List<ScoreboardModel> getScoreboardLimited(@PathVariable int amount) {

        return scoreboardService.getScoreboardLimited(amount);

    }

}
