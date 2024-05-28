package togathering.Plogging.app.dto;

import lombok.Builder;
import lombok.Getter;
import togathering.Plogging.domain.UserPloggingGroupApplyment;
import togathering.Plogging.domain.enums.PloggingGroupStatus;
import togathering.Plogging.domain.enums.PloggingGroupType;

import java.time.LocalDateTime;
import java.util.List;


@Builder
public class PloggingGroupResponseDTO {

    @Getter
    @Builder
    public static class CreatePloggingGroupDTO {
        private Long groupId;
    }

    @Getter
    @Builder
    public static class getPloggingGroupListDTO {
        private Long id;
        private String name;
        private PloggingGroupType type;
        private LocalDateTime dateOfProgress;
        private PloggingGroupStatus status;
        private List<UserPloggingGroupApplymentResponseDTO.GroupUserInfoApplymentDTO> users;
    }

}
