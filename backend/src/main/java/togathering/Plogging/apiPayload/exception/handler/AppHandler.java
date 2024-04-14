package togathering.Plogging.apiPayload.exception.handler;

import togathering.Plogging.apiPayload.code.BaseErrorCode;
import togathering.Plogging.apiPayload.exception.GeneralException;

public class AppHandler extends GeneralException  {
    public AppHandler(BaseErrorCode errorCode) {
        super(errorCode);
    }
}
