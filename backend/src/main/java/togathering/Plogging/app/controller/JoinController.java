package togathering.Plogging.app.controller;

import io.swagger.models.Response;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import togathering.Plogging.apiPayload.ApiResponse;
import togathering.Plogging.apiPayload.code.status.ErrorStatus;
import togathering.Plogging.apiPayload.code.status.StatusResponse;
import togathering.Plogging.apiPayload.code.status.SuccessStatus;
import togathering.Plogging.app.dto.JoinDTO;
import togathering.Plogging.app.dto.ResponseDTO;
import togathering.Plogging.service.JoinService;

@Controller
@ResponseBody
@RequiredArgsConstructor
@RequestMapping("/user")
public class JoinController {

    private final JoinService joinService;
    @PostMapping("/join")
     public ApiResponse<String> joinProcess(@RequestBody JoinDTO joinDTO) {
        StatusResponse statusResponse = joinService.joinProcess(joinDTO);
        if(statusResponse.isSuccess()) {
            return ApiResponse.of(statusResponse.getSuccessStatus(), "");
        } else {
            return ApiResponse.errorof(statusResponse.getErrorStatus(), "");
        }
    }

}
