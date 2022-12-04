package io.skynjari.backend.measurement;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Measurement {
  private String key;
  private String name;
  private String unit;
  private String baseMeasurement;
  private MeasurementConversion conversion;
  private BigDecimal multiplier;
  private BigDecimal value;
}
