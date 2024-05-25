package togathering.Plogging.app.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public class PloggingGroupReviewDTO {
    @Getter
    @Builder
    public static class RequestPloggingGroupReviewDTO {
        private Long group_id;
        private Long user_id;
        private int cleanliness;
        private int reward;
        private int like;
        List<MultipartFile> images;
    }

    @Getter
    @Builder
    public static class ResponsePloggingGroupReviewDTO {
        private Long review_id;
    }
}
