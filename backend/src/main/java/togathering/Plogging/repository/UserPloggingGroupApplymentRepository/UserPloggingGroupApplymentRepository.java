package togathering.Plogging.repository.UserPloggingGroupApplymentRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import togathering.Plogging.domain.UserPloggingGroupApplyment;
import togathering.Plogging.domain.UserPloggingGroupApplymentId;

import java.util.Optional;

@Repository
public interface UserPloggingGroupApplymentRepository extends JpaRepository<UserPloggingGroupApplyment, Long> {
    Optional<UserPloggingGroupApplyment> findById(UserPloggingGroupApplymentId id);
}