package togathering.Plogging.domain.mapping;

import lombok.*;
import togathering.Plogging.domain.PloggingGroup;
import togathering.Plogging.domain.User;
import togathering.Plogging.domain.common.BaseEntity;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PloggingGroupReview extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "plogging_group_review_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plogging_group_id")
    private PloggingGroup ploggingGroup;

    private int reward;

    @Lob
    private String content;

    @OneToMany(mappedBy = "ploggingGroupReview", cascade = CascadeType.ALL)
    private List<PloggingGroupReviewPicture> ploggingGroupReviewPictures;
}
