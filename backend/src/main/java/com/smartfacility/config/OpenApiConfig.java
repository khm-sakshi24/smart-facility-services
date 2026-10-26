package com.smartfacility.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI smartFacilityOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Smart Facility Services REST API")
                        .description("Backend APIs for customer quotation requests, operational maintenance workflows, and administrative management.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Smart Facility Services Operations")
                                .url("https://smartfacilityservices.com"))
                        .license(new License()
                                .name("Proprietary - Smart Facility Services")));
    }
}
