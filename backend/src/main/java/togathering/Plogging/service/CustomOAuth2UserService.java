package togathering.Plogging.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import togathering.Plogging.app.dto.*;
import togathering.Plogging.domain.SocialUser;
import togathering.Plogging.domain.User;
import togathering.Plogging.repository.SocialUserRepository;
import togathering.Plogging.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final SocialUserRepository socialUserRepository;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;
        if (registrationId.equals("naver")) {
            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        }
        else if (registrationId.equals("google")) {
            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        }else {
            return null;
        }

        String username = oAuth2Response.getProvider()+" "+oAuth2Response.getProviderId();
        SocialUser existData = socialUserRepository.findByUsername(username);

        if(existData == null) {
            SocialUserDTO socialUserDTO = new SocialUserDTO();
            socialUserDTO.setUsername(username);
            socialUserDTO.setEmail(oAuth2Response.getEmail());
            socialUserDTO.setNickname(oAuth2Response.getName());
            socialUserDTO.setRole("ROLE_USER");

            SocialUser socialUser = SocialUser.toSocialUser(socialUserDTO);
            socialUserRepository.save(socialUser);

            return new CustomOAuth2User(socialUserDTO);

        }else{
            existData.setEmail(oAuth2Response.getEmail());
            existData.setNickname(oAuth2Response.getName());

            socialUserRepository.save(existData);

            SocialUserDTO socialUserDTO = new SocialUserDTO();
            socialUserDTO.setUsername(existData.getUsername());
            socialUserDTO.setNickname(oAuth2Response.getName());
            socialUserDTO.setRole(existData.getRole());

            return new CustomOAuth2User(socialUserDTO);
        }

    }

}
