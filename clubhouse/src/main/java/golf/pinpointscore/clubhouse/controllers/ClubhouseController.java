package golf.pinpointscore.clubhouse.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/")
public class ClubhouseController {

    @GetMapping(path="/")
    public @ResponseBody String Clubhouse() {

        return "Pinpointscore - Clubhouse";

    }

}