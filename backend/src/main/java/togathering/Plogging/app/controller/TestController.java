package togathering.Plogging.app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import togathering.Plogging.apiPayload.ApiResponse;
import togathering.Plogging.app.dto.TestResponse;
import togathering.Plogging.converter.TestConverter;
import togathering.Plogging.service.TestService.TestQueryService;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    private final TestQueryService testQueryService;

    @GetMapping("/")
    public ApiResponse<TestResponse.TestStringDTO> testAPI(){
        return ApiResponse.onSuccess(TestConverter.toTestStringDTO());
    }

    @GetMapping("/exception")
    public ApiResponse<TestResponse.TestExceptionDTO> exceptionAPI(@RequestParam Integer flag){
        testQueryService.CheckFlag(flag);
        return ApiResponse.onSuccess(TestConverter.toTestExceptionDTO(flag));
    }
}