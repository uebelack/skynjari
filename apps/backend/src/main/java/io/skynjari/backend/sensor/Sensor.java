package io.skynjari.backend.sensor;

import java.util.Date;
import java.util.List;
import io.skynjari.backend.tag.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import io.skynjari.backend.measurement.Measurement;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Sensor {
  private String key;
  private String name;
  private SensorType type;
  private Date updated;
  private List<Tag> tags;
  private List<Measurement> measurements;
}
