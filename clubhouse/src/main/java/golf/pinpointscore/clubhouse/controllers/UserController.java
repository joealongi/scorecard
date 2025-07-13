package golf.pinpointscore.clubhouse.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import golf.pinpointscore.clubhouse.entities.UserEntity;
import golf.pinpointscore.clubhouse.repositories.ScorecardRepository;
import golf.pinpointscore.clubhouse.repositories.UserRepository;
@RestController
@RequestMapping(path="/user")
public class UserController {

    private final UserRepository userRepository;
    private final ScorecardRepository scorecardRepository;

    UserController(UserRepository userRepository, ScorecardRepository scorecardRepository) {
        this.userRepository = userRepository;
        this.scorecardRepository = scorecardRepository;
    }

    // Get a user by userId
    @GetMapping(path="/{userId}", produces = "application/json")
    UserEntity getUserById(@PathVariable Long userId) {

        return userRepository.findById(userId).orElse(null);

    }

    // Create a new user
    @PostMapping(path="/", produces = "application/json")
    UserEntity newUser(@RequestBody UserEntity newUser) {

        return userRepository.save(newUser);

    }

    // Update a user by userId
    @PatchMapping(path="/{userId}", produces = "application/json")
    UserEntity updateUser(@RequestBody UserEntity newUser, @PathVariable Long userId) {

        return userRepository.findById(userId)
        .map(user -> {

            updateUserFields(user, newUser);
            return userRepository.save(user);

        })
        .orElseGet(() -> userRepository.save(newUser));

    }

    // Delete a user and their scorecards by userId
    @DeleteMapping(path="/{userId}", produces = "application/json")
    UserEntity deleteUser(@PathVariable Long userId) {
        
        userRepository.deleteById(userId);
        scorecardRepository.deleteById(userId);
        return null;

    }

    // Helper method to update user fields
    private void updateUserFields(UserEntity user, UserEntity newUser) {

        // Set the userHandicap as an Integer to handle null values
        final Integer userHandicap;

        // Set the userHandicap based on the newUser object
        userHandicap = newUser.getUserHandicap();

        if(newUser.getUserName() != null) {
            user.setUserName(newUser.getUserName());
        }
        if(newUser.getUserFirstName() != null) {
            user.setUserFirstName(newUser.getUserFirstName());
        }
        if(newUser.getUserLastName() != null) {
            user.setUserLastName(newUser.getUserLastName());
        }
        if(newUser.getUserEmail() != null) {
            user.setUserEmail(newUser.getUserEmail());
        }
        if(newUser.getUserCountry() != null) {
            user.setUserCountry(newUser.getUserCountry());
        }
        if(newUser.getUserCity() != null) {
            user.setUserCity(newUser.getUserCity());
        }
        if(newUser.getUserCourse() != null) {
            user.setUserCourse(newUser.getUserCourse());
        }
        if(userHandicap != null) {
            user.setUserHandicap(newUser.getUserHandicap());
        }
    }
    
}
