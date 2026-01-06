package golf.pinpointscore.clubhouse.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import golf.pinpointscore.clubhouse.entities.UserEntity;


@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long> {

    // Find a user by their user ID
    UserEntity findByUserId(String userId);

}