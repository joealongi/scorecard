package golf.pinpointscore.clubhouse.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import golf.pinpointscore.clubhouse.entities.CoursecardEntity;

public interface CoursecardRepository extends CrudRepository<CoursecardEntity, Long> {

    // Find a coursecard by the golf course ID
    CoursecardEntity findByGolfCourseId(int courseId);

    // Find all coursecards by the golf course ID
    List<CoursecardEntity> findAllByGolfCourseId(int courseId);

    // Find the last created coursecard
    CoursecardEntity findTopByOrderBySubmittedDesc();
}