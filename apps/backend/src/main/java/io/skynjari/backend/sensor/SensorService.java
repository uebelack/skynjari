package io.skynjari.backend.sensor;

import io.skynjari.backend.BackendConfiguration;
import jakarta.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.nio.file.Path;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.Yaml;
import org.yaml.snakeyaml.constructor.Constructor;

@Service
public class SensorService {

  private static final Logger LOG = LoggerFactory.getLogger(SensorService.class);

  @Autowired private BackendConfiguration backendConfiguration;

  private Map<String, Sensor> sensors;

  public Sensor getSensor(String key) {
    return sensors.get(key);
  }

  public Collection<Sensor> getSensors() {
    return sensors.values();
  }

  @PostConstruct
  private void init() throws FileNotFoundException {
    this.sensors = new HashMap<String, Sensor>();
    String sensorsConfigurationPath =
        Path.of(backendConfiguration.getSensorsConfigurationPath()).toAbsolutePath().toString();

    LOG.info("Loading sensors configuration from {}", sensorsConfigurationPath);

    Constructor constructor = new Constructor(SensorsConfiguration.class);

    Yaml yaml = new Yaml(constructor);

    SensorsConfiguration sensorsConfiguration =
        yaml.load(new FileInputStream(sensorsConfigurationPath));

    for (Sensor sensor : sensorsConfiguration.getSensors()) {
      this.sensors.put(sensor.getKey(), sensor);
    }
  }
}
