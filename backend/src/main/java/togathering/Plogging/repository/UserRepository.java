package togathering.Plogging.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togathering.Plogging.app.dto.JoinDTO;
import togathering.Plogging.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {


    boolean existsByUsername(String username);

    User findByUsername(String username);
}
