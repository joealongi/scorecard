package golf.pinpointscore.clubhouse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ClubhouseApplication {
	
	public static void main(String[] args) {	
		var context = SpringApplication.run(ClubhouseApplication.class, args);

		System.out.println("\nSPRING_APPLICATION_NAME: " + context.getEnvironment().getProperty("spring.application.name"));
		System.out.println("\nSPRING_DATASOURCE_URL: " + context.getEnvironment().getProperty("spring.datasource.url"));
		System.out.println("\nSPRING_DATASOURCE_USERNAME: " + context.getEnvironment().getProperty("spring.datasource.username"));
		System.out.println("\nSPRING_DATASOURCE_PASSWORD: " + context.getEnvironment().getProperty("spring.datasource.password"));
		System.out.println("\nSPRING_JPA_HIBERNATE_DDL_AUTO: " + context.getEnvironment().getProperty("spring.jpa.hibernate.ddl-auto"));
		System.out.println("\nSPRING_DATASOURCE_DRIVER_CLASS_NAME: " + context.getEnvironment().getProperty("spring.datasource.driver-class-name"));
		System.out.println("\nSPRING_JPA_PROPERTIES_HIBERNATE_DIALECT: " + context.getEnvironment().getProperty("spring.jpa.properties.hibernate.dialect"));
		System.out.println("\nSPRING_SECURITY_USER_NAME: " + context.getEnvironment().getProperty("spring.security.user.name"));
		System.out.println("\nSPRING_SECURITY_USER_PASSWORD: " + context.getEnvironment().getProperty("spring.security.user.password"));
		System.out.println("\nLOGGING_LEVEL_ORG_HIBERNATE_SQL: " + context.getEnvironment().getProperty("logging.level.org.hibernate.SQL"));
		System.out.println("\nSERVER_PORT: " + context.getEnvironment().getProperty("server.port"));
	}
	
}
