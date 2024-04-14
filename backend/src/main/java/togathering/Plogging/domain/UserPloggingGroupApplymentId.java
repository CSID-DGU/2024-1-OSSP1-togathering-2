package togathering.Plogging.domain;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserPloggingGroupApplymentId implements Serializable {

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "plogging_group_id")
    private Long ploggingGroupId;

    // 생성자
    public UserPloggingGroupApplymentId() {
    }

    public UserPloggingGroupApplymentId(Long userId, Long ploggingGroupId) {
        this.userId = userId;
        this.ploggingGroupId = ploggingGroupId;
    }

    // equals() and hashCode() 메소드 오버라이드
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPloggingGroupApplymentId that = (UserPloggingGroupApplymentId) o;
        return Objects.equals(userId, that.userId) && Objects.equals(ploggingGroupId, that.ploggingGroupId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, ploggingGroupId);
    }
}
