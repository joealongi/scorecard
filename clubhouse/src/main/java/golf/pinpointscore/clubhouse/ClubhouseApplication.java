package golf.pinpointscore.clubhouse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ClubhouseApplication {
	
	public static void main(String[] args) {	
		SpringApplication.run(ClubhouseApplication.class, args);

		System.out.println("\nSPRING_APPLICATION_NAME: " + System.getenv("SPRING_APPLICATION_NAME"));
		System.out.println("\nSPRING_DATASOURCE_URL: " + System.getenv("SPRING_DATASOURCE_URL"));
		System.out.println("\nSPRING_DATASOURCE_USERNAME: " + System.getenv("SPRING_DATASOURCE_USERNAME"));
		System.out.println("\nSPRING_DATASOURCE_PASSWORD: " + System.getenv("SPRING_DATASOURCE_PASSWORD"));
		System.out.println("\nSPRING_JPA_HIBERNATE_DDL_AUTO: " + System.getenv("SPRING_JPA_HIBERNATE_DDL_AUTO"));
		System.out.println("\nSPRING_DATASOURCE_DRIVER_CLASS_NAME: " + System.getenv("SPRING_DATASOURCE_DRIVER_CLASS_NAME"));
		System.out.println("\nSPRING_JPA_PROPERTIES_HIBERNATE_DIALECT: " + System.getenv("SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT"));
		System.out.println("\nSPRING_SECURITY_USER_NAME: " + System.getenv("SPRING_SECURITY_USER_NAME"));
		System.out.println("\nSPRING_SECURITY_USER_PASSWORD: " + System.getenv("SPRING_SECURITY_USER_PASSWORD"));
		System.out.println("\nLOGGING_LEVEL_ORG_HIBERNATE_SQL: " + System.getenv("LOGGING_LEVEL_ORG_HIBERNATE_SQL"));
		System.out.println("\nSERVER_PORT: " + System.getenv("SERVER_PORT"));
	}
	
}
