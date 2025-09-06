package golf.pinpointscore.clubhouse.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import golf.pinpointscore.clubhouse.entities.CoursecardEntity;
import golf.pinpointscore.clubhouse.models.CoursecardModel;
import golf.pinpointscore.clubhouse.repositories.CoursecardRepository;

@Service
public class CoursecardService {

    private final CoursecardRepository coursecardRepository;

    public CoursecardService(CoursecardRepository coursecardRepository) {
        this.coursecardRepository = coursecardRepository;
    }

    public List<CoursecardModel> getCoursecard(){

        // Initialize an empty list to hold the coursecard models
        List<CoursecardModel> coursecard = new ArrayList<>();

        // Fetch all coursecards from the repository
        Iterable<CoursecardEntity> golfCourses = coursecardRepository.findAll();

        // Iterate through each golf course and calculate the total score
        golfCourses.forEach(golfCourse -> {

            // For each golf course, create a CoursecardModel entry
            java.sql.Timestamp submitted = golfCourse.getSubmitted();
            java.sql.Timestamp updated = golfCourse.getUpdated();
            int golfCourseId = golfCourse.getGolfCourseId();
            String golfCourseName = golfCourse.getGolfCourseName();
            List<Integer> golfCoursePars = golfCourse.getGolfCoursePars();
            Integer golfCourseTotalPar = golfCoursePars.stream()
                .mapToInt(Integer::intValue)
                .sum();

            // Create a new CoursecardModel instance with the calculated values
            CoursecardModel coursecardEntry = new CoursecardModel(
                submitted,
                updated,
                golfCourseId,
                golfCourseName,
                golfCoursePars,
                golfCourseTotalPar
            );

            // Add the entry to the coursecard list
            coursecard.add(coursecardEntry);

        });

        // Sort the coursecard by golf course name in ascending order
        coursecard.sort((a, b) -> a.getGolfCourseName().compareTo(b.getGolfCourseName()));

        return coursecard;

    }
    
}
