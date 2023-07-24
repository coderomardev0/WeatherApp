package com.bptn.weatherapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import com.bptn.weatherapp.provider.ResourceProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
	
	@Autowired
	ResourceProvider provider;
	
	@Bean
	WebClient webClient(WebClient.Builder builder) {
		return builder.baseUrl(this.provider.getApiBaseUrl()).build();
	}
}
