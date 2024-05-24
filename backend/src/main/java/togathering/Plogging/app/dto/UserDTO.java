package togathering.Plogging.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import togathering.Plogging.domain.User;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserDTO {
    private Long id;
    private String nickname;
    private String username;
    private String password;
    private String user_address;

    public static UserDTO toUserDto(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setPassword(user.getPassword());
        userDTO.setUser_address(user.getUser_address());
        userDTO.setNickname(user.getNickname());
        return userDTO;
    }
}
