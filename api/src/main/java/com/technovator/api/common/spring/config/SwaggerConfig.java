package com.technovator.api.common.spring.config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.apache.http.HttpStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;

import com.fasterxml.classmate.TypeResolver;
import com.technovator.api.common.constants.Constants;
import com.technovator.api.common.controllers.RestResponse.ErrorResponse;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseBuilder;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.GrantType;
import springfox.documentation.service.OAuth;
import springfox.documentation.service.ResourceOwnerPasswordCredentialsGrant;
import springfox.documentation.service.Response;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.SecurityConfiguration;
import springfox.documentation.swagger.web.SecurityConfigurationBuilder;

@Configuration
//@ComponentScan(basePackages = "com.spydermama.api",includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION,classes = RestController.class))
public class SwaggerConfig {
	//@Value("${oauth2.client.secret}")
	private String oauthClientSecret;
   
    @Bean
    public Docket api(TypeResolver typeResolver) {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.spydermama.api")) 
                .paths(PathSelectors.any())
                .build()
                .useDefaultResponseMessages(false)
                .additionalModels(typeResolver.resolve(ErrorResponse.class))
                .globalResponses(HttpMethod.POST, 
                        Arrays.asList(badrequestResponse())
                			);
                			
    }

    private Response badrequestResponse() {
    	return new ResponseBuilder()
        .code(String.valueOf(HttpStatus.SC_BAD_REQUEST)).description("Bad request")
        .representation(MediaType.APPLICATION_JSON)
        .apply(representation ->
          representation.model ( model ->
            model.referenceModel( reference ->
              reference.key ( key ->
                key.qualifiedModelName ( qualifier ->
                  qualifier.name("ErrorModel")
                )
              )
            )
          )
        )
        .build();
    }
    private OAuth securitySchema() {

        List<AuthorizationScope> authorizationScopeList = new ArrayList<>();
        authorizationScopeList.add(new AuthorizationScope("read", "read all"));
        authorizationScopeList.add(new AuthorizationScope("write", "access all"));

        List<GrantType> grantTypes = new ArrayList<>();
        String accessTokenUri;
        if (System.getenv("OAUTH_URL") != null) {
        	accessTokenUri=System.getenv("OAUTH_URL");
        }else {
        	accessTokenUri = "http://localhost:8080/oauth/token";
        }
        GrantType passwordCredentialsGrant = new ResourceOwnerPasswordCredentialsGrant(accessTokenUri);
        grantTypes.add(passwordCredentialsGrant);

        return new OAuth(Constants.RESOURCE_ID, authorizationScopeList, grantTypes);
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder().securityReferences(defaultAuth())
                .build();
    }

    private List<SecurityReference> defaultAuth() {

        final AuthorizationScope[] authorizationScopes = new AuthorizationScope[2];
        authorizationScopes[0] = new AuthorizationScope("read", "read all");
        authorizationScopes[1] = new AuthorizationScope("write", "write all");

        return Collections.singletonList(new SecurityReference(Constants.RESOURCE_ID, authorizationScopes));
    }

    @Bean
    public SecurityConfiguration security() {
    	 return SecurityConfigurationBuilder.builder()
    	            .clientId(Constants.OAUTH_CLIENT_ID)
    	            .clientSecret(oauthClientSecret)
    	            .build();
    }
}