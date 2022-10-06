/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Field, ObjectType, ID,
} from '@nestjs/graphql';

@ObjectType({ description: 'measurement' })
class Measurement {
  @Field(/* istanbul ignore next */ type => ID)
    key!: string;

  @Field()
    name!: string;

  @Field()
    unit!: string;

  @Field({ nullable: true })
    value?: number;
}

export default Measurement;
