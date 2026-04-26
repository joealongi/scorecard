package golf.pinpointscore.clubhouse.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import golf.pinpointscore.clubhouse.entities.CoursecardEntity;

public interface CoursecardRepository extends JpaRepository<CoursecardEntity, Long> {

    // Find a coursecard by the golf course ID
    Optional<CoursecardEntity> findByGolfCourseId(int courseId);

    // Find all coursecards by the golf course ID
    List<CoursecardEntity> findAllByGolfCourseId(int courseId);

    // Find the last created coursecard
    CoursecardEntity findTopByOrderBySubmittedDesc();

    // Delete a coursecard by golf course ID
    void deleteByGolfCourseId(int golfCourseId);
}
