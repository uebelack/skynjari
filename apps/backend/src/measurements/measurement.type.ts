/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Field, ObjectType, ID,
} from '@nestjs/graphql';
import MeasurementConversion from './measurement-conversion.enum';

@ObjectType({ description: 'measurement' })
class Measurement {
  @Field(/* istanbul ignore next */ type => ID)
    key!: string;

  @Field()
    name!: string;

  @Field()
    unit!: string;

  base_measurement?: string;

  conversion?: MeasurementConversion;

  multiplier?: number;

  @Field({ nullable: true })
    value?: number;
}

export default Measurement;
