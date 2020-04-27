import Artist from '../interfaces/Artist';
import {IListItem} from '../interfaces/ListItem';

const apiPrefix = 'https://api.spotify.com/v1';
const apiTokenPrefix = 'https://accounts.spotify.com/api';
const base64credentials = 'OGNmNTM4MGY1ODhjNGVhMTg4NDk2ZTI1NGVkNjM3NjA6MjZjZjkxMTg2ZDdlNDBhMWI1ZmVlY2Y0NDlmNzk4MWI=';

export const searchArtists = async (
  offset: number,
  limit: number,
  q: string,
  token: string,
): Promise<Artist[]> => {
  const uri = `${apiPrefix}/search?type=artist&limit=${limit}&offset=${offset}&q=${encodeURIComponent(q)}`;
  const res = await fetch(uri, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();

  if (!res.ok) {
    return [];
  }

  const {
    artists: {items},
  } = json;

  const mapped = items.map((item: IListItem) => ({
    id: item.id,
    title: item.name,
    imageUri: (item.images && item.images[0]?.url) || undefined,
  }));

  return mapped;
};


export const getAlbums = async (
  artistId: string,
  token: string,
): Promise<IListItem[]> => {
  const uri = `${apiPrefix}/artists/${artistId}/albums`;

  try {
    const res = await fetch(uri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();

    const {items} = json;
    const mapped = items.map((item: IListItem) => ({
      id: item.id,
      title: item.name,
      imageUri: (item.images && item.images[0]?.url) || undefined,
    }));

    return mapped;
  } catch (e) {
    throw e;
  }
};

export const getTopTracks = async (
  artistId: string,
  token: string,
): Promise<IListItem[]> => {
  const uri = `${apiPrefix}/artists/${artistId}/top-tracks?country=BG`;

  try {
    const res = await fetch(uri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    const {tracks} = json;

    const mapped = tracks.map((item: IListItem) => ({
      id: item.id,
      title: item.name,
      imageUri: (item.album.images && item.album.images[0]?.url) || undefined,
    }));

    return mapped;
  } catch (e) {
    throw e;
  }
};

export const getToken = async (): Promise<string> => {
  try {
    const res = await fetch(`${apiTokenPrefix}/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const json = await res.json();
    const newToken = json.access_token;
    return newToken;
  } catch (e) {
    throw e;
  }
};
