package togathering.Plogging.app.dto;

import lombok.*;

public class PloggingCourseDTO {

    @Getter
    @NoArgsConstructor
    public static class RequestPloggingCourseDTO {
        private String metadata;
        private String title;
        private Long time;
        private Long duration;
        private String tag;
    }

    @Getter
    @Builder
    public static class GetPloggingCourseInfoDTO {
        private Long course_id;
        private String metadata;
        private String title;

        private Long time;
        private Long duration;
        private String tag;
    }

    @Getter
    @Builder
    public static class ResponsePloggingCourseDTO{
        private Long course_id;
    }

    @Getter
    @NoArgsConstructor
    public static class RequestModifyCourseTagDTO{
        private String tag;
    }

    @Getter
    @Builder
    public static class ResponseModifyCourseTagDTO{
        private Long course_id;
        private String tag;
    }

    @Getter
    @NoArgsConstructor
    public static class RequestRecommendCourseDTO{
        private String tag;
    }

    @Getter
    @NoArgsConstructor
    public static class RequestSearchCourseDTO{
        private String word;
    }
}
