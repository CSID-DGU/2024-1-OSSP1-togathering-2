package togathering.Plogging.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import togathering.Plogging.domain.enums.PloggingGroupType;

import java.time.LocalDateTime;

public class PloggingGroupRequestDTO {

        @Getter
        @NoArgsConstructor
        public static class CreatePloggingGroupDTO {
                private String groupName;
                private PloggingGroupType type;
                private Long courseId;
                private LocalDateTime dateOfProgress;
        }

        @Getter
        @NoArgsConstructor
        public static class FilterSearchPloggingGroupListDTO {
                private PloggingGroupType type;
        }

        @Getter
        @NoArgsConstructor
        public static class NameSearchPloggingGroupListDTO {
                private String groupName;
        }

}
