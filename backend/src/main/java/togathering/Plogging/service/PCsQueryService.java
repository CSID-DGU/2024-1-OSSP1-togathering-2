package togathering.Plogging.service;

import org.springframework.web.multipart.MultipartFile;
import togathering.Plogging.app.dto.PloggingCourseDTO;
import togathering.Plogging.app.dto.PloggingGroupReviewDTO;
import togathering.Plogging.domain.PloggingCourse;
import togathering.Plogging.domain.mapping.PloggingGroupReview;

import java.util.List;

public interface PCsQueryService {
    List<PloggingCourseDTO.GetPloggingCourseInfoDTO> getCoursesList();
    PloggingCourseDTO.ResponsePloggingCourseDTO createPloggingCourse(PloggingCourseDTO.RequestPloggingCourseDTO request);
    void uploadCoursePicture(PloggingCourse ploggingCourse, MultipartFile file);
    PloggingGroupReviewDTO.ResponsePloggingGroupReviewDTO createPloggingGroupReivew(PloggingGroupReviewDTO.RequestPloggingGroupReviewDTO request);
    PloggingGroupReview getReview(Long review_id);

    PloggingCourseDTO.GetPloggingCourseInfoDTO getCourseInfo(Long course_id);
}
