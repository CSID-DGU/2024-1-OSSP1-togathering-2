package togathering.Plogging.converter;

import org.springframework.beans.factory.annotation.Autowired;
import togathering.Plogging.app.dto.UserPloggingGroupApplymentRequestDTO;
import togathering.Plogging.app.dto.UserPloggingGroupApplymentResponseDTO;
import togathering.Plogging.domain.PloggingGroup;
import togathering.Plogging.domain.User;
import togathering.Plogging.domain.UserPloggingGroupApplyment;
import togathering.Plogging.domain.UserPloggingGroupApplymentId;
import togathering.Plogging.repository.PloggingGroupRepository.PloggingGroupRepository;
import togathering.Plogging.repository.UserRepository;

import javax.persistence.Convert;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

// UserPloggingApplyment 생성
@Convert
public class UserPloggingGroupApplymentConverter {

    // UserPloggingGroupApplyment 리스트를 GroupUserInfoApplymentDTO로 변환
    public static List<UserPloggingGroupApplymentResponseDTO.GroupUserInfoApplymentDTO> toGroupUserInfoApplymentDTOList(List<UserPloggingGroupApplyment> applyments) {
        return applyments.stream()
                .map(applyment -> UserPloggingGroupApplymentResponseDTO.GroupUserInfoApplymentDTO.builder()
                        .id(applyment.getUser().getId())
                        .nickname(applyment.getUser().getNickname())
                        .build())
                .collect(Collectors.toList());
    }
}
