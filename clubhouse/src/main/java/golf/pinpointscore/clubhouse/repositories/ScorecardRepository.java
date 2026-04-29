package golf.pinpointscore.clubhouse.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import golf.pinpointscore.clubhouse.entities.ScorecardEntity;

@Repository
public interface ScorecardRepository extends CrudRepository<ScorecardEntity, Long> {

    // Find a scorecard by scorecardId
    Optional<ScorecardEntity> findByScorecardId(Integer scorecardId);

    // Find all scorecards by userId
    List<ScorecardEntity> findByUserId(String userId);

    // Find the last created scorecard
    ScorecardEntity findTopByOrderBySubmittedDesc();

    void deleteByScorecardId(Integer scorecardId);

}