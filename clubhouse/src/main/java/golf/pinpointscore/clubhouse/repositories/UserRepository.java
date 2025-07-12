package golf.pinpointscore.clubhouse.repositories;

import org.springframework.data.repository.CrudRepository;

import golf.pinpointscore.clubhouse.entities.UserEntity;

public interface UserRepository extends CrudRepository<UserEntity, Long> {

}