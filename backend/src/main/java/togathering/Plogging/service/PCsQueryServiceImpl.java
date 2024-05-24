package togathering.Plogging.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import togathering.Plogging.apiPayload.exception.handler.AppHandler;
import togathering.Plogging.app.dto.PloggingCourseDTO;
import togathering.Plogging.app.dto.PloggingGroupReviewDTO;
import togathering.Plogging.converter.PCsConverter;
import togathering.Plogging.domain.PloggingCourse;
import togathering.Plogging.domain.mapping.PloggingGroupReview;
import togathering.Plogging.repository.GroupRepository;
import togathering.Plogging.repository.PGCsRepository;
import togathering.Plogging.repository.ReviewRepository;
import togathering.Plogging.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class PCsQueryServiceImpl implements PCsQueryService {
    private final PGCsRepository pgcsRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;

    @Override
    public List<PloggingCourseDTO.GetPloggingCourseInfoDTO> getCoursesList() {
        List<PloggingCourse> courseList = pgcsRepository.findAll();

        return courseList.stream()
                .map(PCsConverter::toPloggingCourseInfoDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PloggingCourseDTO.GetPloggingCourseInfoDTO getCourseInfo(Long course_id) {
        PloggingCourse ploggingCourse = pgcsRepository.getReferenceById(course_id);
        return PloggingCourseDTO.GetPloggingCourseInfoDTO
                .builder()
                .course_id(ploggingCourse.getId())
                .title(ploggingCourse.getTitle())
                .metadata(ploggingCourse.getMetadata())
                .build();
    }

    @Transactional
    public PloggingCourseDTO.ResponsePloggingCourseDTO createPloggingCourse(PloggingCourseDTO.RequestPloggingCourseDTO request) throws AppHandler {
        PloggingCourse ploggingCourse = PloggingCourse.builder()
                                .title(request.getTitle())
                                .metadata(request.getMetadata())
                                .build();

        return PCsConverter.toResponsePloggingCourseDTO(pgcsRepository.save(ploggingCourse));
    }

    @Override
    public void uploadCoursePicture(PloggingCourse ploggingCourse, MultipartFile file) {

    }

    @Override
    public PloggingGroupReviewDTO.ResponsePloggingGroupReviewDTO createPloggingGroupReivew(PloggingGroupReviewDTO.RequestPloggingGroupReviewDTO request) {
        PloggingGroupReview ploggingGroupReview = PloggingGroupReview.builder()
                .ploggingGroup(null)
                .content(request.getContent())
                .reward(request.getReward())
                .user(null)
                .build();
        return PCsConverter.toResponsePloggingGroupReviewDTO(reviewRepository.save(ploggingGroupReview));
    }

    public PloggingGroupReview getReview(Long review_id) {
        PloggingGroupReview review = reviewRepository.getReferenceById(review_id);
        return review;
    }

}
