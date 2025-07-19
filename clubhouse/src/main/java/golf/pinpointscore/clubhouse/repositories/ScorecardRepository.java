package golf.pinpointscore.clubhouse.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import golf.pinpointscore.clubhouse.entities.ScorecardEntity;

@Repository
public interface ScorecardRepository extends CrudRepository<ScorecardEntity, Long> {

    // Find all scorecards by userId
    List<ScorecardEntity> findByUserId(int userId);

}