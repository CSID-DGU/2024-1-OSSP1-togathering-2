package togathering.Plogging.converter;

import togathering.Plogging.app.dto.PloggingGroupRequestDTO;
import togathering.Plogging.app.dto.PloggingGroupResponseDTO;
import togathering.Plogging.app.dto.UserPloggingGroupApplymentResponseDTO;
import togathering.Plogging.domain.PloggingCourse;
import togathering.Plogging.domain.PloggingGroup;
import togathering.Plogging.domain.UserPloggingGroupApplyment;

import javax.persistence.Convert;
import java.time.LocalDateTime;
import java.util.List;

import static togathering.Plogging.converter.UserPloggingGroupApplymentConverter.toGroupUserInfoApplymentDTOList;

@Convert
public class PloggingGroupConverter {

    // plogging group 생성
    public static PloggingGroupResponseDTO.CreatePloggingGroupDTO toCreatePloggingGroupDTO(PloggingGroup ploggingGroup) {
        return PloggingGroupResponseDTO.CreatePloggingGroupDTO.builder()
                .groupId(ploggingGroup.getId())
                .build();
    }

    // plogging group 리스트 조회를 위한 DTO 변환
    public static PloggingGroupResponseDTO.getPloggingGroupListDTO getPloggingGroupListDTO(PloggingGroup ploggingGroup) {
        // 유저 리스트 dto 변환
        List<UserPloggingGroupApplymentResponseDTO.GroupUserInfoApplymentDTO> userDTOs = toGroupUserInfoApplymentDTOList(ploggingGroup.getUserPloggingGroupApplyments());

        return PloggingGroupResponseDTO.getPloggingGroupListDTO.builder()
                .id(ploggingGroup.getId())
                .name(ploggingGroup.getName())
                .dateOfProgress(ploggingGroup.getDate_of_progress())
                .status(ploggingGroup.getStatus())
                .users(userDTOs)
                .build();
    }
}
