import ResourceService, { Event } from './resource-service';

export default class EventsService {
  resourceService = new ResourceService();

  getEvents = async () => {
    const events = await this.resourceService.getResource(`/events`);
    return events.data.sort((a: any, b: any) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
  };

  addNewEvent = async (eventData: Event) => {
    const url = `/event`;
    await this.resourceService.postResource(url, eventData);
  };

  getEventById = async (id: string) => {
    const url = `/event/${id}`;
    const event = await this.resourceService.getResource(url);
    return event;
  };

  updateEvent = async (eventData: Event) => {
    const id = eventData.id;
    const url = `/event/${id}`;
    await this.resourceService.putResource(url, eventData);
  };

  deleteEvent = async (id: string) => {
    const url = `/event/${id}`;
    await this.resourceService.deleteResource(url);
  };
}
