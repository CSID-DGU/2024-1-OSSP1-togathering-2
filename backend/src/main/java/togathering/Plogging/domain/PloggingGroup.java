package togathering.Plogging.domain;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import togathering.Plogging.domain.common.BaseEntity;
import togathering.Plogging.domain.enums.PloggingGroupStatus;
import togathering.Plogging.domain.mapping.PloggingGroupPicture;
import togathering.Plogging.domain.mapping.PloggingGroupReview;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@DynamicUpdate
@DynamicInsert
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PloggingGroup extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "plogging_group_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private PloggingCourse ploggingCourse;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private LocalDateTime date_of_progress;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "VARCHAR(15) DEFAULT 'BEFORE'")
    private PloggingGroupStatus status;

    @OneToMany(mappedBy = "ploggingGroup", cascade = CascadeType.ALL)
    private List<UserPloggingGroupApplyment> userPloggingGroupApplyments;

    @OneToMany(mappedBy = "ploggingGroup", cascade = CascadeType.ALL)
    private List<PloggingGroupReview> ploggingGroupReviews;

    @OneToMany(mappedBy = "ploggingGroup", cascade = CascadeType.ALL)
    private List<PloggingGroupPicture> ploggingGroupPictures;
}
