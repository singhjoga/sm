package com.spydermama.api.context;

import java.util.HashSet;
import java.util.Locale.LanguageRange;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.oauth2.provider.OAuth2Authentication;
//import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class Context {
	private static final String CONTENT_LANGUAGE="Content-Language";
	private static final String ACCEPT_LANGUAGE="Accept-Language";
	private static final String PARAM_LANGUAGE="lang";
	private String username;
	private String clientId;
	private String accessToken;
	private String credentialsKey;
	private Set<String> roles;
	private Set<String> allowedEnvironments = new HashSet<>();
	private Set<String> allowedComponentTypes = new HashSet<>();
	private String resource;
	private String action;
	private boolean isAuthenticated;
	private String userLanguage;
	private HttpServletRequest currentRequest;
	private static ThreadLocal<Context> instance = new ThreadLocal<Context>() {
		@Override
		protected Context initialValue() {
			return new Context();
		}

	};

	public Context() {

	}

	public void init() {
		// it gets called from ContextHandler, just to make sure to re-init the pooled
		// object
		username = null;
		clientId = null;
		accessToken = null;
		isAuthenticated = false;
		userLanguage=null;
		roles = new HashSet<>();
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth == null) {
			return;
		}
		isAuthenticated = auth.isAuthenticated() && !auth.getName().toLowerCase().equals("anonymoususer");
		this.username = auth.getName();
		for (GrantedAuthority role : auth.getAuthorities()) {
			String roleStr = role.getAuthority();
			if (roleStr.startsWith("ROLE_")) {
				// It happens for the in memory authentication, which is used for testing
				// purposes
				roleStr = roleStr.replace("ROLE_", "");
			}
			roles.add(roleStr);
		}
		/*
		if (auth instanceof OAuth2Authentication) {
			OAuth2Authentication o2auth = (OAuth2Authentication) auth;
			this.clientId = o2auth.getOAuth2Request().getClientId();
		}

		if (auth.getDetails() instanceof OAuth2AuthenticationDetails) {
			OAuth2AuthenticationDetails oauth = (OAuth2AuthenticationDetails) auth.getDetails();
			this.accessToken = oauth.getTokenValue();
		}
		 */
		RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
		currentRequest = ((ServletRequestAttributes) requestAttributes).getRequest();
	}

	public boolean isAuthenticated() {
		return isAuthenticated;
	}

	public static Context getInstance() {
		return instance.get();

	}

	public HttpServletRequest getCurrentRequest() {
		return currentRequest;
	}

	public boolean hasAnyRole(String... roleAry) {
		for (String role : roleAry) {
			if (roles.contains(role)) {
				return true;
			}
		}
		return false;
	}

	public boolean hasAnyRole(Set<String> roleSet) {
		for (String role : roleSet) {
			if (roles.contains(role)) {
				return true;
			}
		}
		return false;
	}

	public String getUserLanguage() {
		if (userLanguage==null) {
			initUserLanguage();
		}
		return userLanguage;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getClientId() {
		return clientId;
	}

	void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getAccessToken() {
		return accessToken;
	}

	void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public Set<String> getRoles() {
		return roles;
	}

	public Set<String> getAllowedEnvironments() {
		return allowedEnvironments;
	}

	public void setAllowedEnvironments(Set<String> allowedEnvironments) {
		this.allowedEnvironments = allowedEnvironments;
	}

	public Set<String> getAllowedComponentTypes() {
		return allowedComponentTypes;
	}

	public void setAllowedComponentTypes(Set<String> allowedComponentTypes) {
		this.allowedComponentTypes = allowedComponentTypes;
	}

	public String getResource() {
		return resource;
	}

	public void setResource(String resource) {
		this.resource = resource;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getCredentialsKey() {
		return credentialsKey;
	}

	public void setCredentialsKey(String credentialsKey) {
		this.credentialsKey = credentialsKey;
	}
	private void initUserLanguage() {
		if (currentRequest==null) {
			return;
		}
		//first get it from the query string
		String langStr = currentRequest.getParameter(PARAM_LANGUAGE);
		if (langStr != null) {
			userLanguage=langStr.toLowerCase();
			return;
		}
		langStr = currentRequest.getHeader(CONTENT_LANGUAGE);
		if (langStr != null) {
			userLanguage=langStr.toLowerCase();
			return;
		}
		langStr = currentRequest.getHeader(ACCEPT_LANGUAGE);
		if (langStr != null) {
			userLanguage=LanguageRange.parse(langStr).get(0).getRange().toLowerCase();
			return;
		}
		
	}
}
