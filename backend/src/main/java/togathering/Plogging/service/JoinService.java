package togathering.Plogging.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import togathering.Plogging.app.dto.JoinDTO;
import togathering.Plogging.domain.User;
import togathering.Plogging.repository.UserRepository;

@Service
public class JoinService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public JoinService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    public boolean joinProcess(JoinDTO joinDTO) {
        String username = joinDTO.getUsername();
        String password = joinDTO.getPassword();
        String encodedPW = bCryptPasswordEncoder.encode(password);
        joinDTO.setPassword(encodedPW);

        boolean isExist = userRepository.existsByUsername(username);

        if(isExist) {
            return false;
        }

        User data = User.toUser(joinDTO);
        data.setRole("ROLE_ADMIN");
        userRepository.save(data);

        return true;
    }
}
