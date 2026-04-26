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

import golf.pinpointscore.clubhouse.entities.CoursecardEntity;
import golf.pinpointscore.clubhouse.models.CoursecardModel;
import golf.pinpointscore.clubhouse.repositories.CoursecardRepository;
import golf.pinpointscore.clubhouse.services.CoursecardService;

@RestController
@RequestMapping(path = "/coursecard", produces = "application/json")
@CrossOrigin(origins = "*")
public class CoursecardController {

    private final CoursecardRepository coursecardRepository;
    private final CoursecardService coursecardService;

    CoursecardController(CoursecardRepository coursecardRepository, CoursecardService coursecardService) {
        this.coursecardRepository = coursecardRepository;
        this.coursecardService = coursecardService;
    }

    // Get all coursecards
    @GetMapping("/")
    public List<CoursecardModel> getCoursecards() {

        return coursecardService.getCoursecard();

    }

    // Create a new coursecard
    @PostMapping("/")
    CoursecardEntity newCoursecard(@RequestBody CoursecardEntity newCoursecard) {

        // Fetch the last created coursecard
        CoursecardEntity lastCoursecard = coursecardRepository.findTopByOrderBySubmittedDesc();

        // Calculate next Id
        int newCoursecardId = (lastCoursecard != null)
                ? lastCoursecard.getGolfCourseId() + 1
                : 1;

        newCoursecard.setGolfCourseId(newCoursecardId);
        newCoursecard.setGolfCourseName(
                newCoursecard.getGolfCourseName() != null ? newCoursecard.getGolfCourseName() : "Unknown Course");
        newCoursecard.setGolfCoursePars(newCoursecard.getGolfCoursePars() != null ? newCoursecard.getGolfCoursePars()
                : List.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
        newCoursecard.setGolfCourseTotalPar(
                newCoursecard.getGolfCoursePars() != null ? newCoursecard.getGolfCoursePars().stream()
                        .mapToInt(Integer::intValue)
                        .sum() : 0);

        return coursecardRepository.save(newCoursecard);

    }

    // Update an existing coursecard by golfCourseId
    @PatchMapping("/{golfCourseId}")
    CoursecardEntity updateCoursecard(@RequestBody CoursecardEntity newCoursecard, @PathVariable int golfCourseId) {

        return coursecardRepository.findByGolfCourseId(golfCourseId).map(coursecard -> {
            coursecard.setUpdated(new Timestamp(System.currentTimeMillis()));
            coursecard.setGolfCoursePars(newCoursecard.getGolfCoursePars());
            coursecard.setGolfCourseTotalPar(
                    newCoursecard.getGolfCoursePars().stream()
                            .mapToInt(Integer::intValue)
                            .sum());

            return coursecardRepository.save(coursecard);

        })
                .orElseThrow(() -> new RuntimeException("Coursecard not found"));

    }

    // Delete a coursecard by golfCourseId
    @DeleteMapping("/{golfCourseId}")
    CoursecardEntity deleteCoursecard(@PathVariable int golfCourseId) {

        coursecardRepository.deleteByGolfCourseId(golfCourseId);

        return null;

    }
}
