package togathering.Plogging.app.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import togathering.Plogging.domain.PloggingGroup;
import togathering.Plogging.domain.User;
import togathering.Plogging.domain.UserPloggingGroupApplymentId;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
public class UserPloggingGroupApplymentRequestDTO {

    @Getter
    @NoArgsConstructor
    public static class PloggingGroupUserDTO {
        private Long ploggingGroupId;
        private boolean isPloggingGroupAdmin;
    }
}
