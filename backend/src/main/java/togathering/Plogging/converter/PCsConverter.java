package togathering.Plogging.converter;

import org.springframework.web.multipart.MultipartFile;
import togathering.Plogging.app.dto.PloggingCourseDTO;
import togathering.Plogging.app.dto.PloggingGroupReviewDTO;
import togathering.Plogging.domain.PloggingCourse;
import togathering.Plogging.domain.mapping.PloggingGroupReview;

import java.util.List;

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

    public static PloggingCourse toUpdatePloggingCourseTag(PloggingCourseDTO.RequestModifyCourseTagDTO request, PloggingCourse ploggingCourse) {
        return PloggingCourse.builder().
                id(ploggingCourse.getId()).
                metadata(ploggingCourse.getMetadata()).
                title(ploggingCourse.getTitle()).
                duration(ploggingCourse.getDuration()).
                time(ploggingCourse.getTime()).
                isHidden(ploggingCourse.getIsHidden()).
                tag(request.getTag()).build();
    }

    public static PloggingCourse toUpdatePloggingCourseHidden(PloggingCourse ploggingCourse) {
        return PloggingCourse.builder().
                id(ploggingCourse.getId()).
                metadata(ploggingCourse.getMetadata()).
                title(ploggingCourse.getTitle()).
                duration(ploggingCourse.getDuration()).
                time(ploggingCourse.getTime()).
                isHidden(!ploggingCourse.getIsHidden()).
                tag(ploggingCourse.getTag()).build();
    }

    public static PloggingCourseDTO.ResponseModifyCourseTagDTO toResponseModifyCourseTagDTO(PloggingCourse ploggingCourse){
        return PloggingCourseDTO.ResponseModifyCourseTagDTO.builder().
                course_id(ploggingCourse.getId()).
                tag(ploggingCourse.getTag()).
                build();
    }

    public static PloggingGroupReviewDTO.ResponsePloggingGroupReviewDTO toResponsePloggingGroupReviewDTO(PloggingGroupReview ploggingGroupReview) {
        return PloggingGroupReviewDTO.ResponsePloggingGroupReviewDTO.builder()
                .review_id(ploggingGroupReview.getId())
                .build();
    }

    public static PloggingGroupReviewDTO.RequestPloggingGroupReviewDTO toRequestPloggingGroupReviewDTO(String review, List<MultipartFile> images) {


        return PloggingGroupReviewDTO.RequestPloggingGroupReviewDTO.builder().
                group_id(1L).
                user_id(2L).
                reward(3).
                images(images).
                cleanliness(4).
                build();
    }
}
