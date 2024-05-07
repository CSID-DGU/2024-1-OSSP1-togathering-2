package togathering.Plogging.app.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginDTO {
    private String username;    //이메일임.
    private String password;
    private String role;
}
