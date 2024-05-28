package togathering.Plogging.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.multipart.MultipartFile;
import togathering.Plogging.Uploader.S3Uploader;
import togathering.Plogging.apiPayload.exception.handler.AppHandler;
import togathering.Plogging.app.dto.PloggingCourseDTO;
import togathering.Plogging.app.dto.PloggingGroupReviewDTO;
import togathering.Plogging.converter.PCsConverter;
import togathering.Plogging.domain.PloggingCourse;
import togathering.Plogging.domain.PloggingGroup;
import togathering.Plogging.domain.User;
import togathering.Plogging.domain.mapping.PloggingGroupReview;
import togathering.Plogging.domain.mapping.PloggingGroupReviewPicture;
import togathering.Plogging.repository.*;


import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class PCsQueryServiceImpl implements PCsQueryService {
    private final PGCsRepository pgcsRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;
    private final ReivewPictureRepository reivewPictureRepository;

    @Autowired
    private S3Uploader uploader;

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
                .duration(ploggingCourse.getDuration())
                .time(ploggingCourse.getTime())
                .build();
    }

    @Transactional
    public PloggingCourseDTO.ResponsePloggingCourseDTO createPloggingCourse(PloggingCourseDTO.RequestPloggingCourseDTO request) throws AppHandler {
        PloggingCourse ploggingCourse = PloggingCourse.builder().
                title(request.getTitle()).
                metadata(request.getMetadata()).
                duration(request.getDuration()).
                time(request.getTime()).
                tag(request.getTag()).
                build();

        return PCsConverter.toResponsePloggingCourseDTO(pgcsRepository.save(ploggingCourse));
    }

    @Override
    @PutMapping
    public PloggingGroupReviewDTO.ResponsePloggingGroupReviewDTO createPloggingGroupReivew(PloggingGroupReviewDTO.RequestPloggingGroupReviewDTO request) throws IOException {
        List<PloggingGroupReviewPicture> images = new ArrayList<>();

        PloggingGroup group = groupRepository.getReferenceById(request.getGroup_id());
        User user = userRepository.getReferenceById(request.getUser_id());
        PloggingGroupReview ploggingGroupReview = PloggingGroupReview.builder().
                ploggingGroup(group).
                user(user).
                reward(request.getReward()).
                cleanliness(request.getCleanliness()).
                build();

        Long id = reviewRepository.save(ploggingGroupReview).getId();

        for (MultipartFile image : request.getImages()){
            PloggingGroupReviewPicture picture = PloggingGroupReviewPicture.builder().
                    image_url(uploader.upload(image, "reivewPicture")).
                    ploggingGroupReview(ploggingGroupReview).
                    build();

            reivewPictureRepository.save(picture);
            images.add(picture);
        }

        PloggingGroupReview p = reviewRepository.getReferenceById(id);

        p = PloggingGroupReview.builder().
                id(id).
                ploggingGroup(p.getPloggingGroup()).
                user(p.getUser()).
                reward(p.getReward()).
                cleanliness(p.getCleanliness()).
                ploggingGroup(p.getPloggingGroup()).
                ploggingGroupReviewPictures(images).build();

        return PCsConverter.toResponsePloggingGroupReviewDTO(reviewRepository.save(p));
    }


    public PloggingGroupReview getReview(Long review_id) {
        PloggingGroupReview review = reviewRepository.getReferenceById(review_id);
        return review;
    }

    @Override
    @PutMapping
    public PloggingCourseDTO.ResponseModifyCourseTagDTO modifyCourseTag(PloggingCourseDTO.RequestModifyCourseTagDTO request, Long id){
        PloggingCourse ploggingCourse = pgcsRepository.getReferenceById(id);

        PloggingCourse ploggingCourse1 = PCsConverter.toUpdatePloggingCourseTag(request, ploggingCourse);

        pgcsRepository.save(ploggingCourse1);

        return PCsConverter.toResponseModifyCourseTagDTO(ploggingCourse1);
    }

    @Override
    @PutMapping
    public PloggingCourseDTO.ResponsePloggingCourseDTO modifyCourse(PloggingCourseDTO.RequestPloggingCourseDTO request, Long id){
        PloggingCourse ploggingCourse = pgcsRepository.getReferenceById(id);
        PloggingCourse ploggingCourse1 = PCsConverter.toUpdatePloggingCourseHidden(ploggingCourse);

        pgcsRepository.save(ploggingCourse1);

        PloggingCourse p = PloggingCourse.builder()
                .metadata(request.getMetadata())
                .title(request.getTitle())
                .duration(request.getDuration())
                .time(request.getTime())
                .tag(request.getTag())
                .build();

        pgcsRepository.save(p);

        return PCsConverter.toResponsePloggingCourseDTO(p);
    }

    @Override
    public List<PloggingCourseDTO.ResponsePloggingCourseDTO> getRecommendCourseListByAI(PloggingCourseDTO.RequestRecommendCourseDTO dto){
        List<PloggingCourse> courseList = pgcsRepository.findAll();

        List<PloggingCourse> response = new ArrayList<>(List.of());

        StringBuilder sb;

        List<String> types = dto.getTypes();
        List<String> togethers = dto.getTogethers();
        List<String> preference = dto.getPreference();
        List<String> avoidance = dto.getAvoidance();

        for (String type : types){
            for (String together : togethers){
                for (String prefer : preference){
                    for (String avoid : avoidance){
                        sb = new StringBuilder();
                        sb.append(type).append(together).append(prefer).append(avoid);

                        for (PloggingCourse p : courseList){
                            if (p.getTag().contentEquals(sb))
                                response.add(p);
                        }

                    }
                }
            }
        }

        return response.stream()
                .map(PCsConverter::toResponsePloggingCourseDTO)
                .collect(Collectors.toList());
    }


    @Override
    public List<PloggingCourseDTO.ResponsePloggingCourseDTO> getCourseListSearchBy(String word){
        List<PloggingCourse> courseList = pgcsRepository.findAll();

        for (PloggingCourse ploggingCourse: courseList) {
            if(!ploggingCourse.getTitle().toLowerCase().contains(word.toLowerCase())) {
                courseList.remove(ploggingCourse);
            }
        }

        return courseList.stream()
                .map(PCsConverter::toResponsePloggingCourseDTO)
                .collect(Collectors.toList());
    }
}
