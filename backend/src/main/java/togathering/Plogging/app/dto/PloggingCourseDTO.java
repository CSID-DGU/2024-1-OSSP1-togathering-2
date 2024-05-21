package togathering.Plogging.app.dto;

import lombok.*;

public class PloggingCourseDTO {

    @Getter
    @NoArgsConstructor
    public static class RequestPloggingCourseDTO {
        private String metadata;
        private String title;
    }

    @Getter
    @Builder
    public static class GetPloggingCourseInfoDTO {
        private Long course_id;
        private String metadata;
        private String title;
    }

    @Getter
    @Builder
    public static class ResponsePloggingCourseDTO{
        private Long course_id;
    }
}
