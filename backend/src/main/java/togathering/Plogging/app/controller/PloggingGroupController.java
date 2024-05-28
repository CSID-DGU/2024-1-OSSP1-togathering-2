package togathering.Plogging.app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import togathering.Plogging.apiPayload.ApiResponse;
import togathering.Plogging.apiPayload.code.status.SuccessStatus;
import togathering.Plogging.app.dto.PloggingGroupRequestDTO;
import togathering.Plogging.app.dto.PloggingGroupResponseDTO;
import togathering.Plogging.domain.enums.PloggingGroupType;
import togathering.Plogging.service.PloggingGroupService.PloggingGroupCommandServiceImpl;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/group")
@RequiredArgsConstructor
public class PloggingGroupController {
    private final PloggingGroupCommandServiceImpl ploggingGroupCommandService;

    // plogging group list 조회
    @GetMapping("/list")
    public ApiResponse<List<PloggingGroupResponseDTO.getPloggingGroupListDTO>> getPloggingGroupList() {
        List<PloggingGroupResponseDTO.getPloggingGroupListDTO> ploggingGroups = ploggingGroupCommandService.getPloggingGroupList();
        return ApiResponse.of(SuccessStatus.PLOGGING_GROUP_LIST_OK, ploggingGroups);
    }

    // plogging group 상세 정보 조회
    @GetMapping("/{groupId}/detail")
    public ApiResponse<PloggingGroupResponseDTO.getPloggingGroupDetailDTO> getPloggingGroupDetail(@PathVariable Long groupId) {
        PloggingGroupResponseDTO.getPloggingGroupDetailDTO ploggingGroup = ploggingGroupCommandService.getPloggingGroupDetail(groupId);
        return ApiResponse.of(SuccessStatus.PLOGGING_GROUP_DETAIL_OK, ploggingGroup);
    }


    // plogging group type으로 검색
    @GetMapping("/list/by-type")
    public ApiResponse<List<PloggingGroupResponseDTO.getPloggingGroupListDTO>> getPloggingGroupTypeOfList(@RequestParam PloggingGroupType type) {
        List<PloggingGroupResponseDTO.getPloggingGroupListDTO> ploggingGroups = ploggingGroupCommandService.getPloggingGroupListByType(type);
        return ApiResponse.of(SuccessStatus.PLOGGING_GROUP_LIST_OK, ploggingGroups);
    }

    // plogging group name으로 검색
    @GetMapping("/list/by-name")
    public ApiResponse<List<PloggingGroupResponseDTO.getPloggingGroupListDTO>> getPloggingGroupTypeOfList(@RequestParam String groupName) {
        List<PloggingGroupResponseDTO.getPloggingGroupListDTO> ploggingGroups = ploggingGroupCommandService.getPloggingGroupListByName(groupName);
        return ApiResponse.of(SuccessStatus.PLOGGING_GROUP_LIST_OK, ploggingGroups);
    }


    // 내가 예약한 plogging group 검색
    @GetMapping("/my-list")
    public ApiResponse<List<PloggingGroupResponseDTO.getPloggingGroupListDTO>> getUsersPloggingGroupList(HttpServletRequest httpRequest) {
        List<PloggingGroupResponseDTO.getPloggingGroupListDTO> ploggingGroups = ploggingGroupCommandService.getUsersPloggingGroupList(httpRequest);
        return ApiResponse.of(SuccessStatus.PLOGGING_GROUP_LIST_OK, ploggingGroups);
    }


    // plogging group 생성
    @PostMapping("/create")
    public ApiResponse<PloggingGroupResponseDTO.CreatePloggingGroupDTO> createPloggingGroup(@RequestBody PloggingGroupRequestDTO.CreatePloggingGroupDTO dto, HttpServletRequest httpRequest) {

        PloggingGroupResponseDTO.CreatePloggingGroupDTO responseDTO = ploggingGroupCommandService.createPloggingGroup(dto, httpRequest);
        return ApiResponse.of(SuccessStatus.PLOGGING_GROUP_CREATE_OK, responseDTO);
    }

    // plogging group 참여
    @PostMapping("/{groupId}/join")
    public ApiResponse<String> joinPloggingGroup(@PathVariable Long groupId, HttpServletRequest httpRequest) {
        ploggingGroupCommandService.joinPloggingGroup(groupId, httpRequest);
        return ApiResponse.of(SuccessStatus.PLOGGING_GROUP_JOIN_OK, "");
    }

    // plogging group 탈퇴
    @PostMapping("/{groupId}/exit")
    public ApiResponse<String> exitPloggingGroup(@PathVariable Long groupId, HttpServletRequest httpRequest) {
        ploggingGroupCommandService.exitPloggingGroup(groupId, httpRequest);
        return ApiResponse.of(SuccessStatus.PLOGGING_GROUP_EXIT_OK, "");
    }

    // 플로깅 시작하기
    @PostMapping("/{groupId}/start")
    public ApiResponse<String> startPloggingGroup(@PathVariable Long groupId, HttpServletRequest httpRequest) {
        ploggingGroupCommandService.startGroupPlogging(groupId, httpRequest);
        return ApiResponse.of(SuccessStatus.PLOGGING_START_OK, "");
    }

    // 플로깅 끝내기
    @PostMapping("/{groupId}/finish")
    public ApiResponse<String> finishPloggingGroup(@PathVariable Long groupId, HttpServletRequest httpRequest) {
        ploggingGroupCommandService.finishGroupPlogging(groupId, httpRequest);
        return ApiResponse.of(SuccessStatus.PLOGGING_FINISH_OK, "");
    }
}
