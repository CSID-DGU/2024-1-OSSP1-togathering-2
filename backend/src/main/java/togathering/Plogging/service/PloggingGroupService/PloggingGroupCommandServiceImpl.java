package togathering.Plogging.service.PloggingGroupService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import togathering.Plogging.apiPayload.code.status.ErrorStatus;
import togathering.Plogging.apiPayload.exception.handler.AppHandler;
import togathering.Plogging.app.dto.PloggingGroupRequestDTO;
import togathering.Plogging.app.dto.PloggingGroupResponseDTO;
import togathering.Plogging.converter.PloggingGroupConverter;
import togathering.Plogging.converter.UserPloggingGroupApplymentConverter;
import togathering.Plogging.domain.*;
import togathering.Plogging.domain.enums.PloggingGroupStatus;
import togathering.Plogging.repository.PloggingCourseRepository.PloggingCourseRepository;
import togathering.Plogging.repository.PloggingGroupRepository.PloggingGroupRepository;
import togathering.Plogging.repository.UserPloggingGroupApplymentRepository.UserPloggingGroupApplymentRepository;
import togathering.Plogging.repository.UserRepository.UserRepository;
import togathering.Plogging.service.UserPloggingGroupApplymentService.UserPloggingGroupApplymentCommandServiceImpl;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PloggingGroupCommandServiceImpl implements PloggingGroupCommandService {
    private final PloggingGroupRepository ploggingGroupRepository;
    private final PloggingCourseRepository ploggingCourseRepository;
    private final UserRepository userRepository;
    private final UserPloggingGroupApplymentRepository applymentRepository;

    private final UserPloggingGroupApplymentCommandServiceImpl applymentCommandService;


    // 플로깅 그룹 생성
    @Transactional
    public PloggingGroupResponseDTO.CreatePloggingGroupDTO createPloggingGroup(PloggingGroupRequestDTO.CreatePloggingGroupDTO request) throws AppHandler {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_USER)); // 존재하지 않는 user
        PloggingCourse course = ploggingCourseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_COURSE)); // 존재하지 않는 course

        PloggingGroup ploggingGroup = PloggingGroup.builder()
                .name(request.getGroupName())
                .address(request.getAddress())
                .date_of_progress(request.getDateOfProgress())
                .status(PloggingGroupStatus.BEFORE)
                .ploggingCourse(course)
                .build();

        // plogging group db 저장
        ploggingGroupRepository.save(ploggingGroup);

        // applyment 객체 생성 - applyment service에서 호출
        applymentCommandService.createApplyment(request.getUserId(), ploggingGroup.getId(), true);

        // plogging group 반환
        return PloggingGroupConverter.toPloggingGroupDTO(ploggingGroup);
    }

}
