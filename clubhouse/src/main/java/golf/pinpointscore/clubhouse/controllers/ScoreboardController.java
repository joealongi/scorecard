package golf.pinpointscore.clubhouse.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import golf.pinpointscore.clubhouse.models.ScoreboardModel;
import golf.pinpointscore.clubhouse.services.ScoreboardService;

@RestController
@RequestMapping(path="/scoreboard", produces="application/json")
@CrossOrigin(origins="*")
public class ScoreboardController {

    private final ScoreboardService scoreboardService;

    ScoreboardController(ScoreboardService scoreboardService) {
        this.scoreboardService = scoreboardService;
    }

    // Get the scoreboard
    @GetMapping("/")
    List<ScoreboardModel> getScoreboard() {

        return scoreboardService.getScoreboard();

    }

    // Get the scoreboard limited by amount
    @GetMapping("/{amount}")
    List<ScoreboardModel> getScoreboardLimited(@PathVariable int amount) {

        return scoreboardService.getScoreboardLimited(amount);

    }

}
