package togathering.Plogging.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togathering.Plogging.domain.mapping.PloggingGroupReview;

public interface ReviewRepository extends JpaRepository<PloggingGroupReview, Long> {
}
