package io.skynjari.backend.sensor;

import java.util.Collection;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SensorsConfiguration {
  Collection<Sensor> sensors;
}
