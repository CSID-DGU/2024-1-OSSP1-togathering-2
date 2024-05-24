package togathering.Plogging.service.PloggingGroupService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import togathering.Plogging.app.dto.PloggingGroupRequestDTO;
import togathering.Plogging.converter.PloggingGroupConverter;
import togathering.Plogging.domain.PloggingCourse;
import togathering.Plogging.domain.PloggingGroup;
import togathering.Plogging.domain.UserPloggingGroupApplyment;
import togathering.Plogging.repository.PloggingGroupRepository.PloggingGroupRepository;

import java.util.List;

@Service
public class PloggingGroupQueryServiceImpl implements PloggingGroupQueryService{

    @Override
    public List<PloggingGroup> findAllGroups() {
        return null;
    }
}
