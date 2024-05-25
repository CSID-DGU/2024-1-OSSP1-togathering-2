package togathering.Plogging.app.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
public class MainController {

    @GetMapping("/social")    //일단 소셜로그인 쪽경로
    @ResponseBody
    public String mainAPI() {

        return "main route";
    }
}
