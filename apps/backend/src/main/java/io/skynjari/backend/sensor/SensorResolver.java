package io.skynjari.backend.sensor;

import io.skynjari.backend.NotFoundException;
import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class SensorResolver {

  @Autowired
  private SensorService sensorService;

  @QueryMapping("sensor")
  public Sensor getSensor(@Argument String key) {
    Sensor sensor = sensorService.getSensor(key);
    if (sensor == null) {
      throw new NotFoundException("Sensor not found");
    }

    return sensor;
  }

  @QueryMapping("sensors")
  public Collection<Sensor> getSensors() {
    return sensorService.getSensors();
  }
}

// @Query(/* istanbul ignore next */returns => [Sensor])
// sensors(): Promise<Sensor[]> {
// return this.sensorsService.findAll();
// }

// @Subscription(/* istanbul ignore next */ returns => Sensor)
// sensorUpdated() {
// const result = this.pubSub.asyncIterator('sensorUpdated');
// return result;
// }
