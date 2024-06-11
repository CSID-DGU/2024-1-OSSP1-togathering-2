package togathering.Plogging.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;
import togathering.Plogging.apiPayload.exception.handler.AppHandler;
import togathering.Plogging.app.dto.PloggingCourseDTO;
import togathering.Plogging.converter.PCsConverter;
import togathering.Plogging.domain.PloggingCourse;
import togathering.Plogging.repository.*;

import javax.transaction.Transactional;
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
    public List<PloggingCourseDTO.ResponsePloggingCourseDTO> getCourseListRecommendedByAI(PloggingCourseDTO.RequestRecommendCourseDTO dto){
        List<PloggingCourse> courseList = pgcsRepository.findAll();

        List<String> types = dto.getTypes();
        List<String> pref = dto.getPreference();
        List<String> avo = dto.getAvoidance();
        List<String> together = dto.getTogethers();

        List<PloggingCourse> p = new ArrayList<>(List.of());

        StringBuilder sb;

        for (String type : types){
            for (String toge : together){
                for (String prefer : pref){
                    for (String avoe : avo){
                        sb = new StringBuilder();
                        sb.append(type).append(toge).append(prefer).append(avoe);

                        for (PloggingCourse c : courseList){
                            if (c.getTag().contentEquals(sb))
                                p.add(c);
                        }
                    }
                }
            }
        }

        return p.stream()
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
