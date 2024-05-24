package togathering.Plogging.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togathering.Plogging.app.dto.JoinDTO;
import togathering.Plogging.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findById(Long id);

    boolean existsByUsername(String username);

    User findByUsername(String username);
}
