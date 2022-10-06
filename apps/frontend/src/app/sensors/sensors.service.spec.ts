import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';

import { Apollo } from 'apollo-angular';
import sensors from './sensors.fixture';

import SensorsService from './sensors.service';

const graphqlSensors = require('./fixtures/graphql.sensors.json');
const graphqlSensorUpdated = require('./fixtures/graphql.sensor.updated.json');

describe('SensorsService', () => {
  let service: SensorsService;
  const store = { dispatch: jest.fn(), select: jest.fn() };
  const apollo = { watchQuery: jest.fn(), subscribe: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        MockProvider(Store, store),
        MockProvider(Apollo, apollo),
      ],
    });
    service = TestBed.inject(SensorsService);
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize load data and subscribe for updates', () => {
    store.select.mockImplementation(() => ({ subscribe: (callback: Function) => callback(sensors) }));
    apollo.watchQuery.mockImplementation(() => ({ valueChanges: of(graphqlSensors) }));
    apollo.subscribe.mockImplementation(() => of(graphqlSensorUpdated));
    service.init();

    expect(store.dispatch.mock.calls[0][0].sensors[0].updated).toEqual(new Date('2022-10-06T06:45:07.532Z'));
    expect(store.dispatch.mock.calls[0][0].sensors[0].measurements[0].value).toEqual(236.53);

    expect(store.dispatch.mock.calls[1][0].sensors[0].updated).toEqual(new Date('2022-10-06T06:45:38.953Z'));
    expect(store.dispatch.mock.calls[1][0].sensors[0].measurements[0].value).toEqual(226.12);
  });

  it('should not crash with empty data', () => {
    store.select.mockImplementation(() => ({ subscribe: (callback: Function) => callback(sensors) }));
    apollo.watchQuery.mockImplementation(() => ({ valueChanges: of({ data: null }) }));
    apollo.subscribe.mockImplementation(() => of({ data: null }));
    service.init();

    expect(store.dispatch).toBeCalledTimes(3);
  });
});
