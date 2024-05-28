package togathering.Plogging.apiPayload.code.status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import togathering.Plogging.apiPayload.code.BaseCode;
import togathering.Plogging.apiPayload.code.ReasonDTO;
import togathering.Plogging.domain.PloggingCourse;

@Getter
@AllArgsConstructor
public enum SuccessStatus implements BaseCode {

    // 일반적인 응답
    _OK(HttpStatus.OK, 200, "성공입니다."),

    // 모임 관련
    PLOGGING_GROUP_CREATE_OK(HttpStatus.OK, 200, "그룹 생성 성공!"),
    PLOGGING_GROUP_JOIN_OK(HttpStatus.OK, 200, " 그룹 참여 성공!"),
    PLOGGING_GROUP_EXIT_OK(HttpStatus.OK, 200, "그룹 탈퇴 성공!"),
    PLOGGING_GROUP_LIST_OK(HttpStatus.OK, 200, "그룹 리스트 조회 성공!"),
    PLOGGING_GROUP_DETAIL_OK(HttpStatus.OK, 200, "그룹 상세 정보 조회 성공!"),
    PLOGGING_NAME_GROUP_LIST_OK(HttpStatus.OK, 200, "groupName 리스트 조회 성공!"),
    PLOGGING_TYPE_GROUP_LIST_OK(HttpStatus.OK, 200, "type 그룹 리스트 조회 성공!"),
    PLOGGING_RESERVED_GROUP_LIST_OK(HttpStatus.OK, 200, "내가 예약한 그룹 리스트 조회 성공!"),
    PLOGGING_START_OK(HttpStatus.OK, 200, "플로깅 시작 성공!"),
    PLOGGING_FINISH_OK(HttpStatus.OK, 200, "플로깅 종료 성공!"),

    PLOGGING_COURSE_CREATE_OK(HttpStatus.OK, 200, "코스 생성 성공!"),
    PLOGGING_COURSE_LIST_OK(HttpStatus.OK, 200, "코스 리스트 조회 성공!"),
    PLOGGING_COURSE_INFO_OK(HttpStatus.OK, 200, "코스 정보 조회 성공!"),
    PLOGGING_COURSE_REVIEW_OK(HttpStatus.OK, 200, "코스 리뷰 생성 성공!"),
    PLOGGING_COURSE_TAG_MODIFY_OK(HttpStatus.OK, 200, "코스 태그 수정 성공!"),
    PLOGGING_COURSE_MODIFY_OK(HttpStatus.OK, 200, "코스 수정 성공!"),
    PLOGGING_COURSE_RECOMMEND_OK(HttpStatus.OK, 200, "코스 추천 성공!"),

    // 회원가입 관련
    REGISTER_JOIN_OK(HttpStatus.OK, 200, "회원가입 성공!");

    private final HttpStatus httpStatus;
    private final int code;
    private final String message;

    @Override
    public ReasonDTO getReason() {
        return ReasonDTO.builder()
                .message(message)
                .code(code)
                .isSuccess(true)
                .build();
    }

    @Override
    public ReasonDTO getReasonHttpStatus() {
        return ReasonDTO.builder()
                .message(message)
                .code(code)
                .isSuccess(true)
                .httpStatus(httpStatus)
                .build()
                ;
    }
}