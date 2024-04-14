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
    ;


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