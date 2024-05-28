package togathering.Plogging.service.PloggingGroupService;

import togathering.Plogging.app.dto.PloggingGroupRequestDTO;
import togathering.Plogging.app.dto.PloggingGroupResponseDTO;
import togathering.Plogging.domain.PloggingGroup;

import javax.servlet.http.HttpServletRequest;

public interface PloggingGroupCommandService {
    PloggingGroupResponseDTO.CreatePloggingGroupDTO createPloggingGroup(PloggingGroupRequestDTO.CreatePloggingGroupDTO request, HttpServletRequest httpRequest);
}
