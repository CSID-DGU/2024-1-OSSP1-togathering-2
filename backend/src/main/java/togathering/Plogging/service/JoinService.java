package togathering.Plogging.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import togathering.Plogging.apiPayload.code.status.ErrorStatus;
import togathering.Plogging.apiPayload.code.status.StatusResponse;
import togathering.Plogging.apiPayload.code.status.SuccessStatus;
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
    public StatusResponse joinProcess(JoinDTO joinDTO) {
        String username = joinDTO.getUsername();
        String password = joinDTO.getPassword();
        String nickname = joinDTO.getNickname();

        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";    //이메일 형식검사
        String passwordRegex = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$";  //비밀번호 형식 검사

        boolean isExist = userRepository.existsByUsername(username);

        if(isExist) {   //이미 존재하는 이메일로 회원가입시도
            return StatusResponse.ofError(ErrorStatus.REGISTER_ALREADY_USER_EXIST);
        }

        if (username == null || username.trim().isEmpty()) {        //아이디(이메일)이 입력되지 않은 경우
            return StatusResponse.ofError(ErrorStatus.REGISTER_EMAIL_EMPTY);
        }

        if (!username.matches(emailRegex)) {    //아이디(이메일)이 이메일의 형식이 아닌경우
            return StatusResponse.ofError(ErrorStatus.REGISTER_EMAIL_INVALID);
        }

        if (username.length() > 50) {   //아이디(이메일)이 너무 긴경우
            return StatusResponse.ofError(ErrorStatus.REGISTER_EMAIL_TOO_LONG);
        }

        if (nickname == null || nickname.trim().isEmpty()) {    //닉네임이 빈경우
            return StatusResponse.ofError(ErrorStatus.REGISTER_NICKNAME_EMPTY);
        }

        if (nickname != null && !nickname.matches("^[a-zA-Z0-9가-힣]*$")) {   //닉네임에 특수문자가 들어간경우
            return StatusResponse.ofError(ErrorStatus.REGISTER_NICKNAME_PUNCT);
        }

        if (nickname != null && nickname.length() > 50) {   //닉네임이 너무 긴경우
            return StatusResponse.ofError(ErrorStatus.REGISTER_NICKNAME_TOO_LONG);
        }

        if (password == null || password.trim().isEmpty()) {
            return StatusResponse.ofError(ErrorStatus.REGISTER_PASSWORD_EMPTY);
        }

        if (!password.matches(passwordRegex)) {
            return StatusResponse.ofError(ErrorStatus.REGISTER_PASSWORD_INVALID);
        }

        if (password.length() > 70) {
            return StatusResponse.ofError(ErrorStatus.REGISTER_PASSWORD_TOO_LONG);
        }

        String encodedPW = bCryptPasswordEncoder.encode(password);
        joinDTO.setPassword(encodedPW);
        User data = User.toUser(joinDTO);
        data.setRole("ROLE_ADMIN");
        userRepository.save(data);

        return StatusResponse.ofSuccess(SuccessStatus.REGISTER_JOIN_OK);
    }
}
