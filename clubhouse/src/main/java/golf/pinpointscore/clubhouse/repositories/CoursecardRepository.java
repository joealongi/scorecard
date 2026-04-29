package golf.pinpointscore.clubhouse.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import golf.pinpointscore.clubhouse.entities.CoursecardEntity;

public interface CoursecardRepository extends JpaRepository<CoursecardEntity, Long> {

    // Find a coursecard by the coursecardId
    Optional<CoursecardEntity> findByCoursecardId(int coursecardId);

    // Find the last created coursecard
    CoursecardEntity findTopByOrderBySubmittedDesc();

    // Delete a coursecard by coursecardId
    Optional<CoursecardEntity> deleteByCoursecardId(int coursecardId);
}
