package togathering.Plogging.domain;

import lombok.*;
import togathering.Plogging.domain.common.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "plogging_course")
public class PloggingCourse extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "plogging_course_id")
    private Long id;

    @Column(nullable = false, length = 50)
    private String title;

    @Lob
    private String metadata;

    @Column(nullable = false)
    private Long duration;

    @Column(nullable = false)
    private Long time;

    @Lob
    private String tag;

    @Column(nullable = false)
    private Boolean isHidden;
}
