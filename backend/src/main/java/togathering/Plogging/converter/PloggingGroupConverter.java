package togathering.Plogging.converter;

import togathering.Plogging.app.dto.PloggingGroupRequestDTO;
import togathering.Plogging.app.dto.PloggingGroupResponseDTO;
import togathering.Plogging.domain.PloggingCourse;
import togathering.Plogging.domain.PloggingGroup;
import togathering.Plogging.domain.UserPloggingGroupApplyment;

import javax.persistence.Convert;
import java.time.LocalDateTime;
import java.util.List;

@Convert
public class PloggingGroupConverter {

    // plogging group 생성
    public static PloggingGroupResponseDTO.CreatePloggingGroupDTO toPloggingGroupDTO(PloggingGroup ploggingGroup) {
        return PloggingGroupResponseDTO.CreatePloggingGroupDTO.builder()
                .groupId(ploggingGroup.getId())
                .build();
    }
}
