package togathering.Plogging.converter;

import togathering.Plogging.app.dto.TestResponse;

public class TestConverter {   public static TestResponse.TestStringDTO toTestStringDTO(){
    return TestResponse.TestStringDTO.builder()
            .testString("test string 성공입니다!")
            .build();
}

    public static TestResponse.TestExceptionDTO toTestExceptionDTO(Integer flag){
        return TestResponse.TestExceptionDTO.builder()
                .flag(flag)
                .build();
    }

}
