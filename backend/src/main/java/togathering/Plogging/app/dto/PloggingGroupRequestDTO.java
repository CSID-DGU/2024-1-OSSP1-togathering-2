package togathering.Plogging.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class PloggingGroupRequestDTO {

        @Getter
        @NoArgsConstructor
        public static class CreatePloggingGroupDTO {
                private String groupName;
                private String address;
                private Long courseId;
                private LocalDateTime dateOfProgress;
        }

}
