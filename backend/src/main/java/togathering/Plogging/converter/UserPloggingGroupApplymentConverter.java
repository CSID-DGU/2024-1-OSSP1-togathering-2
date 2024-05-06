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

}
