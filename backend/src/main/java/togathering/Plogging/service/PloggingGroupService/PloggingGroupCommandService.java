package togathering.Plogging.service.PloggingGroupService;

import togathering.Plogging.app.dto.PloggingGroupRequestDTO;
import togathering.Plogging.app.dto.PloggingGroupResponseDTO;
import togathering.Plogging.domain.PloggingGroup;

public interface PloggingGroupCommandService {
    PloggingGroupResponseDTO.CreatePloggingGroupDTO createPloggingGroup(PloggingGroupRequestDTO.CreatePloggingGroupDTO request);
}
