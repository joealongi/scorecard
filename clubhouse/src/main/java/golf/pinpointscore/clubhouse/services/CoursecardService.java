package golf.pinpointscore.clubhouse.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
        Iterable<CoursecardEntity> coursecards = coursecardRepository.findAll();

        // Iterate through each golf course and calculate the total score
        coursecards.forEach(coursecardEntity -> {

            // For each golf course, create a CoursecardModel entry
            Long id = coursecardEntity.getId();
            int coursecardId = coursecardEntity.getCoursecardId();
            java.sql.Timestamp submitted = coursecardEntity.getSubmitted();
            java.sql.Timestamp updated = coursecardEntity.getUpdated();
            String coursecardName = coursecardEntity.getCoursecardName();
            List<Integer> coursecardPars = coursecardEntity.getCoursecardPars();
            Integer coursecardTotalPar = coursecardPars != null ? coursecardPars.stream()
                .mapToInt(Integer::intValue)
                .sum() : null;

            // Create a new CoursecardModel instance with the calculated values
            CoursecardModel coursecardEntry = new CoursecardModel(
                id,
                coursecardId,
                submitted,
                updated,
                coursecardName,
                coursecardPars,
                coursecardTotalPar
            );

            // Add the entry to the coursecard list
            coursecard.add(coursecardEntry);

        });

        // Sort the coursecard by golf course name in ascending order
        coursecard.sort((a, b) -> a.getCoursecardName().compareTo(b.getCoursecardName()));
        List<CoursecardModel> limitedCoursecard = coursecard.stream().limit(18).collect(Collectors.toList());

        return limitedCoursecard;

    }
    
}
