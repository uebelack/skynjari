/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Field, ID, ObjectType, registerEnumType,
} from '@nestjs/graphql';

import { SensorType } from '@skynjari/data-model';
import Measurement from '../measurements/measurement.type';
import Tag from '../tags/tag.type';

registerEnumType(SensorType, { name: 'SensorType' });

@ObjectType({ description: 'sensor' })
class Sensor {
  @Field(/* istanbul ignore next */ type => ID)
    key!: string;

  @Field()
    name!: string;

  @Field(/* istanbul ignore next */ type => SensorType)
    type!: SensorType;

  @Field({ nullable: true })
    updated?: Date;

  @Field(/* istanbul ignore next */ type => [Tag])
    tags?: Tag[];

  @Field(/* istanbul ignore next */ type => [Measurement])
    measurements!: Measurement[];
}

export default Sensor;
