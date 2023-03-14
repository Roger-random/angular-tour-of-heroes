import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('start with empty message list', () => {
    expect(service.messages).toEqual([]);
  });

  it('add messages then clear', () => {
    expect(service.messages).withContext('start empty').toEqual([]);
    service.add('test1');
    expect(service.messages).withContext('first added entry').toEqual(['test1']);
    service.add('test2');
    expect(service.messages).withContext('second added entry').toEqual(['test1', 'test2']);
    service.clear();
    expect(service.messages).withContext('cleared list').toEqual([]);
  });
});
