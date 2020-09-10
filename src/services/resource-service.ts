import ServiceError from './service-error';

export interface Event {
  id: string;
  name: string;
  description: string;
  descriptionUrl: string;
  type: string;
  timeZone: string;
  dateTime: string;
  place: string;
  comment: string;
  [propName: string]: any;
}

export interface Organizer {
  id: string;
  name: string;
}

export default class ResourceService {
  _teamId = `group66612`;
  _baseUrl = `https://rs-react-schedule.firebaseapp.com/api/team/${this._teamId}`;

  getResource = async (url: string) => {
    const res = await fetch(`${this._baseUrl}${url}`, {
      method: 'GET'
    });

    if (res.ok) {
      const body = await res.json();
      return body;
    }

    if (res.status === 404) {
      throw new ServiceError('Resource not found', res.status);
    }

    const errorText = await res.text();
    throw new ServiceError(errorText, res.status);
  };

  postResource = async (url: string, data: Event | Organizer) => {
    const res = await fetch(`${this._baseUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      }
    });

    if (res.ok) {
      const body = await res.json();
      return body;
    }

    if (res.status === 400) {
      throw new ServiceError('Bad request', res.status);
    }

    const errorText = await res.text();
    throw new ServiceError(errorText, res.status);
  };

  putResource = async (url: string, data: Event | Organizer) => {
    const res = await fetch(`${this._baseUrl}${url}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      }
    });

    if (res.ok) {
      const body = await res.json();
      return body;
    }

    if (res.status === 400) {
      throw new ServiceError('Bad request', res.status);
    }

    const errorText = await res.text();
    throw new ServiceError(errorText, res.status);
  };

  deleteResource = async (url: string) => {
    const res = await fetch(`${this._baseUrl}${url}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json'
      }
    });

    if (res.ok) {
      return true;
    }

    const errorText = await res.text();
    throw new ServiceError(errorText, res.status);
  };
}
