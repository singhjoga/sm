package com.spydermama.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class SmApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmApiApplication.class, args);
	}

}
