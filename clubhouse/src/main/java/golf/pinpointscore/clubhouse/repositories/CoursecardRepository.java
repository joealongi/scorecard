package golf.pinpointscore.clubhouse.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import golf.pinpointscore.clubhouse.entities.CoursecardEntity;

@Repository
public interface CoursecardRepository extends CrudRepository<CoursecardEntity, Long> {

    // Find a coursecard by the golf course ID
    CoursecardEntity findByGolfCourseId(int courseId);

    // Find the last created coursecard
    CoursecardEntity findTopByOrderBySubmittedDesc();
}