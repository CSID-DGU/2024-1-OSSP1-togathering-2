package togathering.Plogging.domain.mapping;

import lombok.*;
import togathering.Plogging.domain.PloggingGroup;
import togathering.Plogging.domain.common.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PloggingGroupReviewPicture extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "plogging_group_review_picture_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plogging_group_review_id")
    private PloggingGroupReview ploggingGroupReview;

    private String image_url;
}
