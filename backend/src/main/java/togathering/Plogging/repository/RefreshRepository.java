package togathering.Plogging.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togathering.Plogging.domain.RefreshEntity;

import javax.transaction.Transactional;

public interface RefreshRepository extends JpaRepository<RefreshEntity, Long> {
    Boolean existsByRefresh(String refresh);

    @Transactional
    void deleteByRefresh(String refresh);
}
