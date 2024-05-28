package togathering.Plogging.app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import togathering.Plogging.apiPayload.ApiResponse;
import togathering.Plogging.apiPayload.code.status.SuccessStatus;
import togathering.Plogging.app.dto.PloggingCourseDTO;
import togathering.Plogging.app.dto.PloggingGroupReviewDTO;
import togathering.Plogging.converter.PCsConverter;
import togathering.Plogging.domain.mapping.PloggingGroupReview;
import togathering.Plogging.service.PCsQueryService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PloggingCourseController{
    private final PCsQueryService pcsQueryService;

    // plogging course 정보 불러오기
    @GetMapping("/courses/{course_id}")
    public ApiResponse<PloggingCourseDTO.GetPloggingCourseInfoDTO> getPloggingCourseInfo(@PathVariable String course_id){
        PloggingCourseDTO.GetPloggingCourseInfoDTO ploggingCourse = pcsQueryService.getCourseInfo(Long.parseLong(course_id));

        return ApiResponse.of(SuccessStatus.PLOGGING_COURSE_INFO_OK, ploggingCourse);
    }

    // plogging course list 불러오기
    @GetMapping("/courses")
    public ApiResponse<List<PloggingCourseDTO.GetPloggingCourseInfoDTO>> getPloggingCourseList(){
        List<PloggingCourseDTO.GetPloggingCourseInfoDTO> ploggingCourseList = pcsQueryService.getCoursesList();

        return ApiResponse.of(SuccessStatus.PLOGGING_COURSE_LIST_OK, ploggingCourseList);
    }

    // plogging course 생성하기
    @PostMapping("/courses")
    public ApiResponse<PloggingCourseDTO.ResponsePloggingCourseDTO> createPloggingCourse(
            @RequestBody PloggingCourseDTO.RequestPloggingCourseDTO dto
    ) {
        PloggingCourseDTO.ResponsePloggingCourseDTO responseDTO = pcsQueryService.createPloggingCourse(dto);
        return ApiResponse.of(SuccessStatus.PLOGGING_COURSE_CREATE_OK, responseDTO);
   }

    @PostMapping("/courses/{course_id}/modify")
    public ApiResponse<PloggingCourseDTO.ResponsePloggingCourseDTO> modifyPloggingCourse(
            @PathVariable String course_id,
            @RequestBody PloggingCourseDTO.RequestPloggingCourseDTO dto
    ){
        PloggingCourseDTO.ResponsePloggingCourseDTO responseDTO = pcsQueryService.modifyCourse(dto, Long.parseLong(course_id));


        return ApiResponse.of(SuccessStatus.PLOGGING_COURSE_MODIFY_OK, responseDTO);
    }

   @PostMapping("/course/{course_id}/modify-tag")
   public ApiResponse<PloggingCourseDTO.ResponseModifyCourseTagDTO> modifyCourseTag(
           @PathVariable String course_id,
           @RequestBody PloggingCourseDTO.RequestModifyCourseTagDTO dto){

       PloggingCourseDTO.ResponseModifyCourseTagDTO responseDTO = pcsQueryService.modifyCourseTag(dto, Long.parseLong(course_id));

       return ApiResponse.of(SuccessStatus.PLOGGING_COURSE_TAG_MODIFY_OK, responseDTO);
   }

    // plogging course review 사진 업로드하기
    @PostMapping("/course/{course_id}/photos")
    public void uploadPGCsPicture(@RequestBody MultipartFile file){

    }

    @PostMapping("/course/recommend")
    public ApiResponse<List<PloggingCourseDTO.ResponsePloggingCourseDTO>> recommendCourseListByAI(
            @RequestBody PloggingCourseDTO.RequestRecommendCourseDTO dto
    ) {
        List<PloggingCourseDTO.ResponsePloggingCourseDTO> recommendList =
                pcsQueryService.getCourseListRecommendedByAI(dto);

        return ApiResponse.of(SuccessStatus.PLOGGING_COURSE_LIST_OK, recommendList);
    }
    @GetMapping("/course/search")
    public ApiResponse<List<PloggingCourseDTO.ResponsePloggingCourseDTO>> searchCourse(
            @RequestBody PloggingCourseDTO.RequestSearchCourseDTO dto
    ){
        List<PloggingCourseDTO.ResponsePloggingCourseDTO> resultCourseList =
                pcsQueryService.getCourseListSearchBy(dto.getWord());

        return ApiResponse.of(SuccessStatus.PLOGGING_COURSE_LIST_OK, resultCourseList);
    }
}
