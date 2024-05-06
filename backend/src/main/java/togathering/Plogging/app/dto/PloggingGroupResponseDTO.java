package togathering.Plogging.app.dto;

import lombok.Builder;
import lombok.Getter;
import togathering.Plogging.domain.UserPloggingGroupApplyment;

import java.util.List;


@Builder
public class PloggingGroupResponseDTO {

    @Getter
    @Builder
    public static class CreatePloggingGroupDTO {
        private Long groupId;
    }

}
