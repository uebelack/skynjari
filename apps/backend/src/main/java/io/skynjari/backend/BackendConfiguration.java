package io.skynjari.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class BackendConfiguration {
  @Value("${sensorsConfigurationPath}")
  private String sensorsConfigurationPath;

  @Bean
  public String getSensorsConfigurationPath() {
    return sensorsConfigurationPath;
  }
}
