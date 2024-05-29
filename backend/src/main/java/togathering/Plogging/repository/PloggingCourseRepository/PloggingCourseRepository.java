package togathering.Plogging.repository.PloggingCourseRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import togathering.Plogging.domain.PloggingCourse;
import togathering.Plogging.domain.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface PloggingCourseRepository extends JpaRepository<PloggingCourse, Long> {
    Optional<PloggingCourse> findById(Long id);
}