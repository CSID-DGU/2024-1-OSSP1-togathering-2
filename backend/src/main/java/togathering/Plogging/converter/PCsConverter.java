package togathering.Plogging.converter;

import togathering.Plogging.app.dto.PloggingCourseDTO;
import togathering.Plogging.app.dto.PloggingGroupReviewDTO;
import togathering.Plogging.domain.PloggingCourse;
import togathering.Plogging.domain.mapping.PloggingGroupReview;

public class PCsConverter {
    public static PloggingCourseDTO.GetPloggingCourseInfoDTO toPloggingCourseInfoDTO(PloggingCourse ploggingCourse) {
        return PloggingCourseDTO.GetPloggingCourseInfoDTO.builder()
                .course_id(ploggingCourse.getId())
                .metadata(ploggingCourse.getMetadata())
                .title(ploggingCourse.getTitle())
                .build();
    }

    public static PloggingCourseDTO.ResponsePloggingCourseDTO toResponsePloggingCourseDTO(PloggingCourse ploggingCourse) {
        return PloggingCourseDTO.ResponsePloggingCourseDTO.builder()
                .course_id(ploggingCourse.getId())
                .build();
    }

    public static PloggingGroupReviewDTO.ResponsePloggingGroupReviewDTO toResponsePloggingGroupReviewDTO(PloggingGroupReview ploggingGroupReview) {
        return PloggingGroupReviewDTO.ResponsePloggingGroupReviewDTO.builder()
                .review_id(ploggingGroupReview.getId())
                .content(ploggingGroupReview.getContent())
                .build();
    }
}
