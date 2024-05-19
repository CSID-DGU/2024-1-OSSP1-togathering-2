package togathering.Plogging.app.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;


public class PloggingGroupReviewDTO {
    @Getter
    @Builder
    public static class RequestPloggingGroupReviewDTO {
        private Long group_id;
        private Long user_id;
        private String content;
        private int reward;
    }

    @Getter
    @Builder
    public static class ResponsePloggingGroupReviewDTO {
        private Long review_id;
        private String content;
    }
}
