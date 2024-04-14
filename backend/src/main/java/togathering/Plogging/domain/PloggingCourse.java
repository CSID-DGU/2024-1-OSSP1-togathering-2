package togathering.Plogging.domain;

import lombok.*;
import togathering.Plogging.domain.common.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PloggingCourse extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "plogging_course_id")
    private Long id;

    @Column(nullable = false, length = 50)
    private String title;

    @Lob
    private String metadata;
}
