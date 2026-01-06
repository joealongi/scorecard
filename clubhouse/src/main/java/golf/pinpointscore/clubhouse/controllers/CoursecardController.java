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
@RequestMapping(path="/coursecard", produces="application/json")
@CrossOrigin(origins="*")
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
        int newCoursecardId = (lastCoursecard != null && lastCoursecard.getGolfCourseId() != 0) ? lastCoursecard.getGolfCourseId() + 1 : 0;

        newCoursecard.setGolfCourseId(newCoursecardId);
        newCoursecard.setGolfCourseName(newCoursecard.getGolfCourseName() != null ? newCoursecard.getGolfCourseName() : "Unknown Course");
        newCoursecard.setGolfCoursePars(newCoursecard.getGolfCoursePars() != null ? newCoursecard.getGolfCoursePars() : List.of(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0));
        newCoursecard.setGolfCourseTotalPar(newCoursecard.getGolfCoursePars() != null ? newCoursecard.getGolfCoursePars().stream()
                .mapToInt(Integer::intValue)
                .sum() : 0);

        return coursecardRepository.save(newCoursecard);

    }

    // Update an existing coursecard by golfCourseId
    @PatchMapping("/{golfCourseId}")
    CoursecardEntity updateCoursecard(@RequestBody CoursecardEntity newCoursecard, @PathVariable Long golfCourseId) {

        return coursecardRepository.findById(golfCourseId).map(coursecard -> {

            coursecard.setUpdated(new Timestamp(System.currentTimeMillis()));
            if (newCoursecard.getGolfCourseName() != null) {
                coursecard.setGolfCourseName(newCoursecard.getGolfCourseName());
            }
            if (newCoursecard.getGolfCoursePars() != null) {
                coursecard.setGolfCoursePars(newCoursecard.getGolfCoursePars());
            }
            if (newCoursecard.getGolfCourseTotalPar() != null) {
                coursecard.setGolfCourseTotalPar(newCoursecard.getGolfCoursePars().stream()
                .mapToInt(Integer::intValue)
                .sum());
            }

            return coursecardRepository.save(coursecard);

        })
        .orElseGet(() -> coursecardRepository.save(newCoursecard));

    }

    // Delete a coursecard by golfCourseId
    @DeleteMapping("/course/{golfCourseId}")
    CoursecardEntity deleteCoursecard(@PathVariable Long golfCourseId) {

        coursecardRepository.deleteById(golfCourseId);
        
        return null;

    }
}
