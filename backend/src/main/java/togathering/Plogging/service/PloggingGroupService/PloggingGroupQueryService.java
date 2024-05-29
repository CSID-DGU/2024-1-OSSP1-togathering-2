package togathering.Plogging.service.PloggingGroupService;

import togathering.Plogging.domain.PloggingGroup;

import java.util.List;

public interface PloggingGroupQueryService {
    List<PloggingGroup> findAllGroups();
}
