import ResourceService, { Organizer } from './resource-service';

export default class OrganizerService {
  resourceService = new ResourceService();

  getOrganizers = async () => {
    const events = await this.resourceService.getResource(`/organizers`);
    return events.data;
  };

  addNewOrganizer = async (organizerData: Organizer) => {
    const url = `/organizer`;
    await this.resourceService.postResource(url, organizerData);
  };

  getOrganizerById = async (id: string) => {
    const url = `/organizer/${id}`;
    const event = await this.resourceService.getResource(url);
    return event;
  };

  updateOrganizer = async (organizerData: Organizer) => {
    const id = organizerData.id;
    const url = `/organizer/${id}`;
    await this.resourceService.putResource(url, organizerData);
  };

  deleteOrganizer = async (id: string) => {
    const url = `/organizer/${id}`;
    await this.resourceService.deleteResource(url);
  };
}
