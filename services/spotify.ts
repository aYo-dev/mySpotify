import {Artist} from 'mocks/artistsMock';

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
  console.log('search begin, uri =', uri, 'token =', token);
  const res = await fetch(uri, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  console.log('search got json', json);

  if (!res.ok) {
    return [];
  }

  const {
    tracks: {items},
  } = json;

  return items.map(
    (item: {id: any; name: any; album: {images: {url: any}[]}}) => ({
    id: item.id,
    title: item.name,
      imageUri: item.album.images ? item.album.images[0].url : undefined,
    }),
  );
};


export const getAlbums = async (
  artistId: string,
  token: string,
): Promise<any> => {
  const uri = `${apiPrefix}/artists/${artistId}/albums`;
  console.log('get albums request');

  try {
    const res = await fetch(uri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    console.log('get albums success', json);
    return json;
  } catch (e) {
    console.log('get albums failure', e);
    throw e;
  }
};

export const getTopTracks = async (
  artistId: string,
  token: string,
): Promise<any> => {
  const uri = `${apiPrefix}/artists/${artistId}/top-tracks`;
  console.log('get top tracks request');

  try {
    const res = await fetch(uri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    console.log('get top tracks success', json);
    return json;
  } catch (e) {
    console.log('get top tracks failure', e);
    throw e;
  }
};

export const getToken = async (): Promise<string> => {
  try {
    console.log('get token request');
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
    console.log('get token success', res);
    return newToken;
  } catch (e) {
    console.log('get token failure', e);
    throw e;
  }
};
