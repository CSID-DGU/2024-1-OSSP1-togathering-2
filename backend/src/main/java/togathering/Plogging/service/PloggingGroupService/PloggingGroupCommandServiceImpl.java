package togathering.Plogging.service.PloggingGroupService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import togathering.Plogging.apiPayload.code.status.ErrorStatus;
import togathering.Plogging.apiPayload.exception.handler.AppHandler;
import togathering.Plogging.app.dto.PloggingGroupRequestDTO;
import togathering.Plogging.app.dto.PloggingGroupResponseDTO;
import togathering.Plogging.converter.PloggingGroupConverter;
import togathering.Plogging.domain.*;
import togathering.Plogging.domain.enums.PloggingGroupStatus;
import togathering.Plogging.domain.enums.PloggingGroupType;
import togathering.Plogging.jwt.JWTUtil;
import togathering.Plogging.repository.PloggingCourseRepository.PloggingCourseRepository;
import togathering.Plogging.repository.PloggingGroupRepository.PloggingGroupRepository;
import togathering.Plogging.repository.UserPloggingGroupApplymentRepository.UserPloggingGroupApplymentRepository;
import togathering.Plogging.repository.UserRepository;
import togathering.Plogging.service.UserPloggingGroupApplymentService.UserPloggingGroupApplymentCommandServiceImpl;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PloggingGroupCommandServiceImpl implements PloggingGroupCommandService {
    private final PloggingGroupRepository ploggingGroupRepository;
    private final PloggingCourseRepository ploggingCourseRepository;
    private final UserRepository userRepository;
    private final UserPloggingGroupApplymentRepository applymentRepository;

    private final UserPloggingGroupApplymentCommandServiceImpl applymentCommandService;

    private final JWTUtil jwtUtil;

    // 플로깅 그룹 조회
    public List<PloggingGroupResponseDTO.getPloggingGroupListDTO> getPloggingGroupList() {
        List<PloggingGroup> ploggingGroupList = ploggingGroupRepository.findAll();
        return ploggingGroupList.stream()
                .map(PloggingGroupConverter::getPloggingGroupListDTO)
                .collect(Collectors.toList());
    }

    // 플로깅 그룹 상세 조회
    public PloggingGroupResponseDTO.getPloggingGroupDetailDTO getPloggingGroupDetail(Long groupId) {
        PloggingGroup ploggingGroup = ploggingGroupRepository.findById(groupId)
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_GROUP));
        return PloggingGroupConverter.getPloggingGroupDetailDTO(ploggingGroup);
    }

    // 플로깅 그룹 생성
    @Transactional
    public PloggingGroupResponseDTO.CreatePloggingGroupDTO createPloggingGroup(PloggingGroupRequestDTO.CreatePloggingGroupDTO request, HttpServletRequest httpRequest) throws AppHandler {
        // token 가져오고 공백 제거
        String accessToken = httpRequest.getHeader("Bearer");
        String token = accessToken.split(" ")[1];

        // id 가져오기
        long id = jwtUtil.getId(token);

        // 사용자 정보 조회
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_USER)); // 존재하지 않는 user
        PloggingCourse course = ploggingCourseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_COURSE)); // 존재하지 않는 course

        // 객체 생성
        PloggingGroup ploggingGroup = PloggingGroup.builder()
                .name(request.getGroupName())
                .type(request.getType())
                .date_of_progress(request.getDateOfProgress())
                .status(PloggingGroupStatus.BEFORE)
                .ploggingCourse(course)
                .build();

        // db에 저장
        ploggingGroupRepository.save(ploggingGroup);

        // applyment 객체 생성 - applyment service에서 호출
        applymentCommandService.createApplyment(user.getId(), ploggingGroup.getId(), true);

        // plogging group 반환
        return PloggingGroupConverter.toCreatePloggingGroupDTO(ploggingGroup);
    }

    // 유저가 그룹에 참여
    @Transactional
    public void joinPloggingGroup(Long groupId, HttpServletRequest httpRequest) throws AppHandler {
        String accessToken = httpRequest.getHeader("Bearer");
        String token = accessToken.split(" ")[1];

        // id 가져오기
        long id = jwtUtil.getId(token);

        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_USER));
        PloggingGroup ploggingGroup = ploggingGroupRepository.findById(groupId)
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_GROUP));

        // 중복 참여 방지
        boolean alreadyMember = ploggingGroup.getUserPloggingGroupApplyments().stream()
                .anyMatch(a -> a.getUser().equals(user));
        if (!alreadyMember) {
            // applyment 객체 생성 - applyment service에서 호출
            applymentCommandService.createApplyment(id, groupId, false);
        } else {
            throw new AppHandler(ErrorStatus.ALREADY_JOIN_GROUP);
        }

        // 변경 사항 저장
        ploggingGroupRepository.save(ploggingGroup);
    }

    // 플로깅 그룹 탈퇴
    @Transactional
    public void exitPloggingGroup(Long groupId, HttpServletRequest httpRequest) throws AppHandler {
        String accessToken = httpRequest.getHeader("Bearer");
        String token = accessToken.split(" ")[1];

        // id 가져오기
        long id = jwtUtil.getId(token);

        applymentCommandService.exitPloggingGroup(id, groupId);
    }

    // 플로깅 시작하기
    @Transactional
    public void startGroupPlogging(Long groupId, HttpServletRequest httpRequest) throws AppHandler {
        String accessToken = httpRequest.getHeader("Bearer");
        String token = accessToken.split(" ")[1];

        // id 가져오기
        long id = jwtUtil.getId(token);
        // 그룹 찾기
        PloggingGroup ploggingGroup = ploggingGroupRepository.findById(groupId)
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_GROUP));

        // 그룹에 포함된 유저 찾기
        UserPloggingGroupApplyment applyment = applymentRepository.findByUserIdAndPloggingGroupId(id, groupId)
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_APPLYMENT));
        if (!applyment.isPloggingGroupAdmin()) { // 유저가 그룹장인지 확인
            throw new AppHandler(ErrorStatus.NOT_GROUP_ADMIN);
        }

        // 상태 변경
        if (ploggingGroup.getStatus() == PloggingGroupStatus.BEFORE) {
            ploggingGroup.setStatus(PloggingGroupStatus.DURING);
            ploggingGroupRepository.save(ploggingGroup); // 저장
        } else {
            throw new AppHandler(ErrorStatus.INVALID_STATUS_CHANGE);
        }
    }

    // 플로깅 끝내기
    @Transactional
    public void finishGroupPlogging(Long groupId, HttpServletRequest httpRequest) throws AppHandler {
        String accessToken = httpRequest.getHeader("Bearer");
        String token = accessToken.split(" ")[1];

        // id 가져오기
        long id = jwtUtil.getId(token);
        // 그룹 찾기
        PloggingGroup ploggingGroup = ploggingGroupRepository.findById(groupId)
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_GROUP));
        // 그룹에 포함된 유저 찾기
        UserPloggingGroupApplyment applyment = applymentRepository.findByUserIdAndPloggingGroupId(id, groupId)
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_APPLYMENT));
        if (!applyment.isPloggingGroupAdmin()) { // 유저가 그룹장인지 확인
            throw new AppHandler(ErrorStatus.NOT_GROUP_ADMIN);
        }

        // 해당 유저의 isFinished 상태를 true로 변경
        applyment.setFinished(true);
        applymentRepository.save(applyment);

        // 모든 유저가 플로깅을 끝냈는지 확인
        boolean allFinished = applymentRepository.findByPloggingGroupId(groupId).stream()
                .allMatch(UserPloggingGroupApplyment::isFinished);
        // 끝냈다면 staus를 AFTER로 변경
        if (allFinished) {
            ploggingGroup.setStatus(PloggingGroupStatus.AFTER);
            ploggingGroupRepository.save(ploggingGroup);
        }

    }


    // 모임 타입으로 모임 리스트 모임
    public List<PloggingGroupResponseDTO.getPloggingGroupListDTO> getPloggingGroupListByType(PloggingGroupType type) {
        List<PloggingGroup> ploggingGroupList = ploggingGroupRepository.findByType(type);
        return ploggingGroupList.stream()
                .map(PloggingGroupConverter::getPloggingGroupListDTO)
                .collect(Collectors.toList());
    }

    // 검색으로 플로깅 모임 리스트 조회
    public List<PloggingGroupResponseDTO.getPloggingGroupListDTO> getPloggingGroupListByName(String groupName) {
        List<PloggingGroup> ploggingGroupList = ploggingGroupRepository.findByNameContaining(groupName);
        return ploggingGroupList.stream()
                .map(PloggingGroupConverter::getPloggingGroupListDTO)
                .collect(Collectors.toList());
    }

    // 내가 예약한 플로깅 모임 리스트 조회
    public List<PloggingGroupResponseDTO.getPloggingGroupListDTO> getUsersPloggingGroupList(HttpServletRequest httpRequest) {
        String accessToken = httpRequest.getHeader("Bearer");
        String token = accessToken.split(" ")[1];

        // id 가져오기
        long id = jwtUtil.getId(token);
        // id로 user 정보 조회
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_USER));

        // user가 포함된 모든 그룹 조회
        List<PloggingGroup> ploggingGroupList = ploggingGroupRepository.findByUserPloggingGroupApplymentsUser(user);
        return ploggingGroupList.stream()
                .map(PloggingGroupConverter::getPloggingGroupListDTO)
                .collect(Collectors.toList());
    }
}
