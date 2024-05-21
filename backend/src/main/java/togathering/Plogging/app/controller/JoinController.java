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
     public ResponseEntity<ResponseDTO> joinProcess(@RequestBody JoinDTO joinDTO) {
        boolean joinSuccess = joinService.joinProcess(joinDTO);
        ResponseDTO response = new ResponseDTO();
        if(joinSuccess) {
            response.setSuccess(true);
            response.setCode(200);
            response.setMessage("회원가입 성공");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.setSuccess(false);
            response.setCode(400);
            response.setMessage("회원가입 실패");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

}
