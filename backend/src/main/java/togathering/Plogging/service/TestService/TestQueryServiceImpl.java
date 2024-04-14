package togathering.Plogging.service.TestService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import togathering.Plogging.apiPayload.code.status.ErrorStatus;
import togathering.Plogging.apiPayload.exception.handler.AppHandler;

@Service
@RequiredArgsConstructor
public class TestQueryServiceImpl implements TestQueryService {
    @Override
    public void CheckFlag(Integer flag) {
        if (flag == 1)
            throw new AppHandler(ErrorStatus.TEMP_EXCEPTION);
    }
}
