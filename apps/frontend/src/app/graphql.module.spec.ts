import { TestBed } from '@angular/core/testing';
import { HttpLink } from 'apollo-angular/http';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Operation } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import GraphQLModule, { createApollo } from './graphql.module';

jest.mock('@apollo/client/utilities', () => ({ ...jest.requireActual('@apollo/client/utilities'), getMainDefinition: jest.fn() }));

describe('GraphQLModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GraphQLModule],
    });
  });

  it('should initialize', () => {
    const module = TestBed.inject(GraphQLModule);
    expect(module).toBeTruthy();
  });

  it('should create apollo', () => {
    (getMainDefinition as jest.Mock).mockImplementation(() => ({ kind: 'OperationDefinition', operation: 'subscription' }));
    const link = new HttpLink(new HttpClient({} as HttpHandler));
    const apollo = createApollo(link);
    apollo.link?.request({} as Operation);
  });
});
