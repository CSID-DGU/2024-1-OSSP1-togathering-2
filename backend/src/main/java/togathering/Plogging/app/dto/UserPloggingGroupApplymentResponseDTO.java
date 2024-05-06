package togathering.Plogging.app.dto;

import lombok.Builder;
import lombok.Getter;

public class UserPloggingGroupApplymentResponseDTO {

    @Getter
    @Builder
    public static class GroupUserInfoApplymentDTO {
        private Long id;
        private String nickname;
    }
}
