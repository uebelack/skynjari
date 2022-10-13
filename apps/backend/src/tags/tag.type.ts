/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Field, ObjectType, ID,
} from '@nestjs/graphql';

@ObjectType({ description: 'tag' })
class Tag {
  @Field(/* istanbul ignore next */ type => ID)
    key!: string;

  @Field()
    value!: string;
}

export default Tag;
