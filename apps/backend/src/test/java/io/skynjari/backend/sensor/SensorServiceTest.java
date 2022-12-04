package io.skynjari.backend.sensor;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SensorServiceTest {

  @Autowired
  private SensorService sensorService;

  @Test
  void shouldReturnSensorForKey() {
    assertEquals("power-meter", sensorService.getSensor("power-meter").getKey());
  }

  void shouldReturnNullIfSensorNotFound() {
    assertEquals(null, sensorService.getSensor("not-found"));
  }

  @Test
  void testGetSensors() {
    assertEquals(5, sensorService.getSensors().size());
  }
}
