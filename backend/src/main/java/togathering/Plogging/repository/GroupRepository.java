package togathering.Plogging.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togathering.Plogging.domain.PloggingGroup;

public interface GroupRepository extends JpaRepository<PloggingGroup, Long> {
}
