package io.skynjari.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BackendConfiguration {
  @Value("${sensorsConfigurationPath}")
  private String sensorsConfigurationPath;

  @Bean
  public String getSensorsConfigurationPath() {
    return sensorsConfigurationPath;
  }
}
