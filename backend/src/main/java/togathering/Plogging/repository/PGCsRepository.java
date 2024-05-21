package togathering.Plogging.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import togathering.Plogging.domain.PloggingCourse;

@Repository
public interface PGCsRepository extends JpaRepository<PloggingCourse, Long> {
}
