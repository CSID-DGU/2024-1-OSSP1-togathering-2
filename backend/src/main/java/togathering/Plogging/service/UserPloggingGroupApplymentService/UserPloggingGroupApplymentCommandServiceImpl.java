package togathering.Plogging.service.UserPloggingGroupApplymentService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import togathering.Plogging.apiPayload.code.status.ErrorStatus;
import togathering.Plogging.apiPayload.exception.handler.AppHandler;
import togathering.Plogging.app.dto.PloggingGroupRequestDTO;
import togathering.Plogging.app.dto.PloggingGroupResponseDTO;
import togathering.Plogging.converter.PloggingGroupConverter;
import togathering.Plogging.domain.*;
import togathering.Plogging.domain.enums.PloggingGroupStatus;
import togathering.Plogging.repository.PloggingCourseRepository.PloggingCourseRepository;
import togathering.Plogging.repository.PloggingGroupRepository.PloggingGroupRepository;
import togathering.Plogging.repository.UserPloggingGroupApplymentRepository.UserPloggingGroupApplymentRepository;
import togathering.Plogging.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserPloggingGroupApplymentCommandServiceImpl {
    private final UserPloggingGroupApplymentRepository applymentRepository;
    private final PloggingGroupRepository ploggingGroupRepository;
    private final UserRepository userRepository;

    public UserPloggingGroupApplyment createApplyment(Long userId, Long ploggingGroupId, boolean isAdmin) throws AppHandler {
        // 사용자와 플로깅 그룹을 ID로 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_USER)); // 존재하지 않는 user
        PloggingGroup ploggingGroup = ploggingGroupRepository.findById(ploggingGroupId)
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_GROUP)); // 존재하지 않는 group

        // applyment 객체 생성
        UserPloggingGroupApplyment applyment = UserPloggingGroupApplyment.builder()
                .id(new UserPloggingGroupApplymentId(user.getId(), ploggingGroup.getId()))
                .user(user)
                .ploggingGroup(ploggingGroup)
                .isPloggingGroupAdmin(isAdmin)
                .build();

        // db 저장 및 반환
        applymentRepository.save(applyment);
        return applyment;
    }

    @Transactional
    public void exitPloggingGroup(Long userId, Long ploggingGroupId) throws AppHandler {
        // 사용자와 플로깅 그룹을 ID로 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_USER)); // 존재하지 않는 user
        PloggingGroup ploggingGroup = ploggingGroupRepository.findById(ploggingGroupId)
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_GROUP)); // 존재하지 않는 group

        // applyment 객체 조회
        UserPloggingGroupApplyment applyment = applymentRepository.findById(new UserPloggingGroupApplymentId(userId, ploggingGroupId))
                .orElseThrow(() -> new AppHandler(ErrorStatus.ALREADY_EXIT_GROUP)); // 이미 탈퇴한 사용자

        // applyment 객체 삭제
        applymentRepository.delete(applyment);
    }
}
