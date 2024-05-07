package togathering.Plogging.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JoinDTO {
    private String nickname;
    private String username;    //(email이다. spring security에서 username으로 받아서 어쩔수없이 이렇게 명명함.
    private String password;
    private String user_address;
}
