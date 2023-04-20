
import {
    searchAllEventsService,
    getAllEventsService,
    getEventService,
    createEventService,
    deleteEventService,
    updateEventService
  } from '../src/services/eventsServices';

import { EventBody } from '../src/types/interfaces';
  
  // Set up a mock Event object for testing purposes
  const testEvent: EventBody = {
    _id: 0,
    name: 'Bowling',
    description: 'Fun in Mitte.',
    is_public: true,
    date: new Date("2019-01-16"),
    start_at: new Date("2019-01-16"),
    ends_at: new Date("2019-01-16"),
    entry_fee: 99,
    capacity: 98,
    clubId: 0,
    addressId: 0
  };
  
  // Mock the Event model methods for testing purposes
  jest.mock('./models', () => ({
    Event: {
      findAll: jest.fn(() => [testEvent]),
      find: jest.fn(() => testEvent),
      create: jest.fn(() => testEvent),
      remove: jest.fn(),
      update: jest.fn(() => testEvent)
    }
  }));
  
  // Test the searchAllEventsService function
  describe('searchAllEventsService', () => {
    it('should return all events when no query is provided', async () => {
      const events = await searchAllEventsService({});
      expect(events).toEqual([testEvent]);
    });
  
    it('should return events matching the provided query', async () => {
      const query = { title: 'Test Event' };
      const events = await searchAllEventsService(query);
      expect(events).toEqual([testEvent]);
    });
  });
  
  // Test the getAllEventsService function
  describe('getAllEventsService', () => {
    it('should return all events', async () => {
      const events = await getAllEventsService();
      expect(events).toEqual([testEvent]);
    });
  });
  
  // Test the getEventService function
  describe('getEventService', () => {
    it('should return the event with the provided ID', async () => {
      const event = await getEventService('1');
      expect(event).toEqual(testEvent);
    });
  });
  
  // Test the createEventService function
  describe('createEventService', () => {
    it('should create a new event', async () => {
      const newEvent = await createEventService(testEvent);
      expect(newEvent).toEqual(testEvent);
    });
  });
  
  // Test the deleteEventService function
  describe('deleteEventService', () => {
    it('should delete the event with the provided ID', async () => {
      const id = '1';
      const deletedEvent = await deleteEventService(id);
      expect(deletedEvent).toEqual(id);
    });
  });
  
  // Test the updateEventService function
  describe('updateEventService', () => {
    it('should update the event with the provided ID', async () => {
      const id = '1';
      const updatedEvent = await updateEventService(id, testEvent);
      expect(updatedEvent).toEqual(testEvent);
    })
  });