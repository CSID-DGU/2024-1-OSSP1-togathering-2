package togathering.Plogging.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togathering.Plogging.domain.mapping.PloggingGroupReviewPicture;

public interface ReivewPictureRepository extends JpaRepository<PloggingGroupReviewPicture, Long> {
}
