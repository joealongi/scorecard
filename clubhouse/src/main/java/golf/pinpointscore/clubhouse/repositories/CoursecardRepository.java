package golf.pinpointscore.clubhouse.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import golf.pinpointscore.clubhouse.entities.CoursecardEntity;

@Repository
public interface CoursecardRepository extends CrudRepository<CoursecardEntity, Long> {


}