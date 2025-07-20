package golf.pinpointscore.clubhouse.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import golf.pinpointscore.clubhouse.models.LeaderboardModel;
import golf.pinpointscore.clubhouse.services.LeaderboardService;

@RestController
@RequestMapping(path="/leaderboard", produces="application/json")
@CrossOrigin(origins="*")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    // Get the leaderboard
    @GetMapping("/")
    List<LeaderboardModel> getLeaderboard() {

        return leaderboardService.getLeaderboard();

    }

    // Get the leaderboard limited by amount
    @GetMapping("/{amount}")
    List<LeaderboardModel> getLeaderboardLimited(@PathVariable int amount) {

        return leaderboardService.getLeaderboardLimited(amount);

    }

}
