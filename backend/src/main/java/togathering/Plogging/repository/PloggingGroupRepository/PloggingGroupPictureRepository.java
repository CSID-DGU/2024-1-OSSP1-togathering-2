package togathering.Plogging.repository.PloggingGroupRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import togathering.Plogging.domain.mapping.PloggingGroupPicture;

import java.util.List;

@Repository
public interface PloggingGroupPictureRepository extends JpaRepository<PloggingGroupPicture, Long> {
}