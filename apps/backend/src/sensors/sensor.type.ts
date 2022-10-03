/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Field, ID, ObjectType, registerEnumType,
} from '@nestjs/graphql';

import { SensorType } from '@skynjari/data-model';
import Measurement from '../measurements/measurement.type';

registerEnumType(SensorType, { name: 'SensorType' });

@ObjectType({ description: 'sensor' })
class Sensor {
  @Field(type => ID)
    key!: string;

  @Field()
    name!: string;

  @Field(type => SensorType)
    type!: SensorType;

  @Field({ nullable: true })
    updated?: Date;

  @Field(type => [Measurement])
    measurements!: Measurement[];
}

export default Sensor;
