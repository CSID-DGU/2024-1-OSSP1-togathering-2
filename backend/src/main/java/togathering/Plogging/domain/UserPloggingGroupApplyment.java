package togathering.Plogging.domain;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import togathering.Plogging.domain.common.BaseEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserPloggingGroupApplyment extends BaseEntity implements Serializable {

    @EmbeddedId
    private UserPloggingGroupApplymentId id;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id")
    private User user;

    @MapsId("ploggingGroupId")
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "plogging_group_id")
    private PloggingGroup ploggingGroup;

    private boolean isPloggingGroupAdmin;

    @Setter
    private boolean isFinished = false; // 플로깅 끝냈는지 여부 확인

}

