package togathering.Plogging.repository.PloggingGroupRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import togathering.Plogging.domain.mapping.PloggingGroupReview;

import java.util.List;

@Repository
public interface PloggingGroupReviewRepository extends JpaRepository<PloggingGroupReview, Long> {

}