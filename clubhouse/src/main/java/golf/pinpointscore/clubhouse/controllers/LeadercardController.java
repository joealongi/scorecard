package golf.pinpointscore.clubhouse.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import golf.pinpointscore.clubhouse.models.LeadercardModel;
import golf.pinpointscore.clubhouse.services.LeadercardService;

@RestController
@RequestMapping(path="/leadercard", produces="application/json")
@CrossOrigin(origins="*")
public class LeadercardController {

    private final LeadercardService leadercardService;

    LeadercardController(LeadercardService leadercardService) {
        this.leadercardService = leadercardService;
    }

    // Get the leadercard
    @GetMapping("/")
    List<LeadercardModel> getLeadercard() {

        return leadercardService.getLeadercard();

    }

    // Get the leadercard limited by amount
    @GetMapping("/{amount}")
    List<LeadercardModel> getLeadercardLimited(@PathVariable int amount) {

        return leadercardService.getLeadercardLimited(amount);

    }

}
