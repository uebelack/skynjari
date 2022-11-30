package io.skynjari.backend.sensor;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import io.skynjari.backend.NotFoundException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@SpringBootTest
public class SensorResolverTest {

  @Mock
  private SensorService sensorService;

  @InjectMocks
  private SensorResolver sensorResolver;

  @Test
  void shouldReturnSensorForKey() {
    Sensor sensor = new Sensor();
    when(sensorService.getSensor("test")).thenReturn(sensor);
    assertEquals(sensor, sensorResolver.getSensor("test"));
  }

  @Test
  void shouldThrowNotFoundException() {
    when(sensorService.getSensor("test")).thenReturn(null);
    assertThrows(NotFoundException.class, () -> sensorResolver.getSensor("test"));
  }
}
