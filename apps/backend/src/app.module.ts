import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import MeasurementsModule from './measurements/measurements.module';
import InfluxDBModule from './influxdb/influxdb.module';
import SensorModule from './sensors/sensors.module';
import MqttModule from './mqtt/mqtt.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
    }),
    EventEmitterModule.forRoot(),
    SensorModule,
    MqttModule,
    InfluxDBModule,
    MeasurementsModule,
  ],
})
class AppModule {}

export default AppModule;
