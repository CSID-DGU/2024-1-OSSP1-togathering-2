package togathering.Plogging.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togathering.Plogging.domain.SocialUser;
import togathering.Plogging.domain.User;

public interface SocialUserRepository extends JpaRepository<SocialUser, Long> {

    boolean existsByUsername(String username);

    SocialUser findByUsername(String username);

}
