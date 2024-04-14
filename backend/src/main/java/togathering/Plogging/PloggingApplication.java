package togathering.Plogging;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class PloggingApplication {

	public static void main(String[] args) {
		SpringApplication.run(PloggingApplication.class, args);
	}

}
