package togathering.Plogging.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JoinDTO {
    private String nickname;
    private String email;
    private String password;
    private String user_address;
}
