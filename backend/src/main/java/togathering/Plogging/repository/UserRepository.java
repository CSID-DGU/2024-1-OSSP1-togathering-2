package togathering.Plogging.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togathering.Plogging.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
