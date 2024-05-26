package togathering.Plogging.app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import togathering.Plogging.apiPayload.ApiResponse;
import togathering.Plogging.apiPayload.code.status.SuccessStatus;
import togathering.Plogging.app.dto.PloggingGroupRequestDTO;
import togathering.Plogging.app.dto.PloggingGroupResponseDTO;
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

    // plogging group 생성
    @PostMapping("/create")
    public ApiResponse<PloggingGroupResponseDTO.CreatePloggingGroupDTO> createPloggingGroup(@RequestBody PloggingGroupRequestDTO.CreatePloggingGroupDTO dto, HttpServletRequest httpRequest) {

        PloggingGroupResponseDTO.CreatePloggingGroupDTO responseDTO = ploggingGroupCommandService.createPloggingGroup(dto, httpRequest);
        return ApiResponse.of(SuccessStatus.PLOGGING_GROUP_CREATE_OK, responseDTO);
    }

    // plogging group 참여
    @PostMapping("/{groupId}/join")
    public ApiResponse<String> joinPloggingGroup(@PathVariable Long groupId, @RequestBody PloggingGroupRequestDTO.JoinPloggingGroupDTO dto) {
        ploggingGroupCommandService.joinPloggingGroup(groupId, dto);
        return ApiResponse.of(SuccessStatus.PLOGGING_GROUP_JOIN_OK, "");
    }

    // plogging group 탈퇴
    @PostMapping("/{groupId}/exit")
    public ApiResponse<String> exitPloggingGroup(@PathVariable Long groupId, @RequestBody PloggingGroupRequestDTO.ExitPloggingGroupDTO dto) {
        ploggingGroupCommandService.exitPloggingGroup(groupId, dto);
        return ApiResponse.of(SuccessStatus.PLOGGING_GROUP_EXIT_OK, "");
    }

}
