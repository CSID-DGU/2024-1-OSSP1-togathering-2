package togathering.Plogging.converter;

import org.springframework.beans.factory.annotation.Autowired;
import togathering.Plogging.app.dto.UserPloggingGroupApplymentRequestDTO;
import togathering.Plogging.domain.PloggingGroup;
import togathering.Plogging.domain.User;
import togathering.Plogging.domain.UserPloggingGroupApplyment;
import togathering.Plogging.domain.UserPloggingGroupApplymentId;
import togathering.Plogging.repository.PloggingGroupRepository.PloggingGroupRepository;
import togathering.Plogging.repository.UserRepository.UserRepository;

import javax.persistence.Convert;
import javax.persistence.EntityNotFoundException;

// UserPloggingApplyment 생성
@Convert
public class UserPloggingGroupApplymentConverter {
    private final UserRepository userRepository;
    private final PloggingGroupRepository ploggingGroupRepository;

    public UserPloggingGroupApplymentConverter(UserRepository userRepository, PloggingGroupRepository ploggingGroupRepository) {
        this.userRepository = userRepository;
        this.ploggingGroupRepository = ploggingGroupRepository;
    }

    public UserPloggingGroupApplyment toEntity(UserPloggingGroupApplymentRequestDTO.PloggingGroupUserDTO dto, PloggingGroup group) {
        // userId를 사용하여 userRepository에서 User 조회
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + dto.getUserId()));
        // plogging group id를 사용하여 plogging group 조회
        PloggingGroup ploggingGroup = ploggingGroupRepository.findById(group.getId())
                .orElseThrow(() -> new EntityNotFoundException("Group not found with id: " + dto.getUserId()));

        UserPloggingGroupApplymentId id = new UserPloggingGroupApplymentId(dto.getUserId(), group.getId());

        return UserPloggingGroupApplyment.builder()
                    .id(id)
                    .user(user)
                    .ploggingGroup(ploggingGroup)
                    .isPloggingGroupAdmin(true)
                    .build();
    }
}
