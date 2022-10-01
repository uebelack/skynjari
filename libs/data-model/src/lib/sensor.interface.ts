import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import SensorType from './sensor-type.enum';
import Measurement from './measurement.interface';

@ObjectType({ description: 'sensor' })
export class Sensor {
  @Field(type => ID)
  key!: string;

  name!: string

  type!: SensorType

  @Field({ nullable: true })
  updated?: Date

  measurements!: Record<string, Measurement>
}

export default Sensor;
