package togathering.Plogging.domain;

import lombok.*;
import togathering.Plogging.app.dto.JoinDTO;
import togathering.Plogging.app.dto.SocialUserDTO;
import togathering.Plogging.domain.common.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED) // dbms
@AllArgsConstructor
public class SocialUser extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "user_id")
    private Long id;

    @Column(nullable = false, length = 50, unique = true)
    private String email;

    @Column(nullable = false, length = 50)
    private String username;

    @Column(nullable = false, length = 50)
    private String nickname;

    @Column(length = 255)
    private String profile_image_url;

    @Column(nullable = false)
    private String role;
    /*
    @Column(nullable = false)
    private String user_address;
    */
    public static SocialUser toSocialUser(SocialUserDTO socialUserDTO) {
        SocialUser socialUser = new SocialUser();
        socialUser.setNickname(socialUserDTO.getNickname());
        socialUser.setEmail(socialUserDTO.getEmail());
        socialUser.setRole(socialUserDTO.getRole());
        return socialUser;
    }
}