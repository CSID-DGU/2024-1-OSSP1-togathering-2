package togathering.Plogging.repository.PloggingGroupRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import togathering.Plogging.domain.PloggingGroup;
import togathering.Plogging.domain.User;
import togathering.Plogging.domain.mapping.PloggingGroupPicture;

import java.util.List;
import java.util.Optional;

@Repository
public interface PloggingGroupRepository extends JpaRepository<PloggingGroup, Long> {
    Optional<PloggingGroup> findById(Long id);
}
