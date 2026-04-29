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
import jakarta.transaction.Transactional;

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
                ? lastCoursecard.getCoursecardId() + 1
                : 1;

        newCoursecard.setCoursecardId(newCoursecardId);
        newCoursecard.setCoursecardName(
                newCoursecard.getCoursecardName() != null ? newCoursecard.getCoursecardName() : "Unknown Course");
        newCoursecard.setCoursecardPars(newCoursecard.getCoursecardPars() != null ? newCoursecard.getCoursecardPars()
                : List.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
        newCoursecard.setCoursecardTotalPar(
                newCoursecard.getCoursecardPars() != null ? newCoursecard.getCoursecardPars().stream()
                        .mapToInt(Integer::intValue)
                        .sum() : 0);

        return coursecardRepository.save(newCoursecard);

    }

    // Update an existing coursecard by CoursecardId
    @PatchMapping("/{CoursecardId}")
    CoursecardEntity updateCoursecard(@RequestBody CoursecardEntity newCoursecard, @PathVariable int CoursecardId) {

        return coursecardRepository.findByCoursecardId(CoursecardId).map(coursecard -> {
            coursecard.setUpdated(new Timestamp(System.currentTimeMillis()));
            coursecard.setCoursecardPars(newCoursecard.getCoursecardPars());
            coursecard.setCoursecardTotalPar(
                    newCoursecard.getCoursecardPars().stream()
                            .mapToInt(Integer::intValue)
                            .sum());

            return coursecardRepository.save(coursecard);

        })
                .orElseThrow(() -> new RuntimeException("Coursecard not found"));

    }

    // Delete a coursecard by CoursecardId
    @DeleteMapping("/{CoursecardId}")
    @Transactional
    CoursecardEntity deleteCoursecard(@PathVariable int CoursecardId) {

        CoursecardEntity coursecard = coursecardRepository.findByCoursecardId(CoursecardId)
            .orElseThrow(() -> new RuntimeException("Coursecard not found with id: " + CoursecardId));
        
        coursecardRepository.delete(coursecard);


        return coursecard;

    }
}
