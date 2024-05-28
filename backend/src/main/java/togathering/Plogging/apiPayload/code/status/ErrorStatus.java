package togathering.Plogging.apiPayload.code.status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import togathering.Plogging.apiPayload.code.BaseErrorCode;
import togathering.Plogging.apiPayload.code.ErrorReasonDTO;

@Getter
@AllArgsConstructor
public enum ErrorStatus implements BaseErrorCode {

    // 기본 응답(http)
    _INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 500, "서버 에러, 관리자에게 문의 바랍니다."),
    _BAD_REQUEST(HttpStatus.BAD_REQUEST,400,"잘못된 요청입니다."),
    _UNAUTHORIZED(HttpStatus.UNAUTHORIZED,401,"인증이 필요합니다."),
    _FORBIDDEN(HttpStatus.FORBIDDEN, 403, "금지된 요청입니다."),

    // 테스트용
    TEMP_EXCEPTION(HttpStatus.BAD_REQUEST, 4001, "이거는 테스트"),

    // plogging group 생성
    NOT_FOUND_USER(HttpStatus.BAD_REQUEST, 40401, "존재하지 않는 유저입니다."),
    NOT_FOUND_GROUP(HttpStatus.BAD_REQUEST, 40402, "존재하지 않는 그룹입니다."),
    NOT_FOUND_COURSE(HttpStatus.BAD_REQUEST, 40403, "존재하지 않는 코스입니다."),

    ALREADY_JOIN_GROUP(HttpStatus.BAD_REQUEST, 40901, "이미 참가 중인 그룹입니다."),
    ALREADY_EXIT_GROUP(HttpStatus.BAD_REQUEST, 40902, "이미 탈퇴한 그룹입니다."),
    ADMIN_CANNOT_EXIT(HttpStatus.BAD_REQUEST, 40903, "그룹장은 탈퇴할 수 없습니다."),

    INVALID_STATUS_CHANGE(HttpStatus.BAD_REQUEST, 40601, "플로깅 시작에 실패하였습니다."),
    NOT_GROUP_ADMIN(HttpStatus.BAD_REQUEST, 40602, "그룹장이 아닙니다."),
    NOT_FOUND_APPLYMENT(HttpStatus.BAD_REQUEST, 40603, "해당 그룹에 참여하지 않은 유저입니다.");


    // 여기 관련해서 하고싶은 응답들 정의해주세요..

    private final HttpStatus httpStatus;
    private final int code;
    private final String message;

    @Override
    public ErrorReasonDTO getReason() {
        return ErrorReasonDTO.builder()
                .message(message)
                .code(code)
                .isSuccess(false)
                .build();
    }

    @Override
    public ErrorReasonDTO getReasonHttpStatus() {
        return ErrorReasonDTO.builder()
                .message(message)
                .code(code)
                .isSuccess(false)
                .httpStatus(httpStatus)
                .build()
                ;
    }
}