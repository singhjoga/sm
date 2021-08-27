package com.spydermama.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
@ComponentScan(basePackages = {"com.spydermama.api","com.technovator.api"})
@EnableJpaRepositories(basePackages = {"com.spydermama.api","com.technovator.api"})
@EntityScan(basePackages= {"com.spydermama.api","com.technovator.api"})
@Configuration
public class SmApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmApiApplication.class, args);
	}

}
