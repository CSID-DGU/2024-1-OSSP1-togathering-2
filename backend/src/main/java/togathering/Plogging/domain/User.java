package togathering.Plogging.domain;

import lombok.*;
import togathering.Plogging.app.dto.JoinDTO;
import togathering.Plogging.domain.common.BaseEntity;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED) // dbms
@AllArgsConstructor
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "user_id")
    private Long id;

    @Column(nullable = false, length = 50)
    private String nickname;

    @Column(nullable = false, length = 50, unique = true)
    private String email;

    @Column(nullable = false, length = 70)
    private String password;

    @Column(length = 255)
    private String profile_image_url;

    @Column(nullable = false)
    private String user_address;

    @Column(nullable = false)
    private String role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserPloggingGroupApplyment> userPloggingGroupApplyments;

    public static User toUser(JoinDTO joinDTO) {
        User user = new User();
        user.setNickname(joinDTO.getNickname());
        user.setEmail(joinDTO.getEmail());
        user.setPassword(joinDTO.getPassword());
        user.setUser_address(joinDTO.getUser_address());
        return user;
    }
}