import Artist from '../interfaces/Artist';

const timeout = (ms: number) => new Promise((res) => setTimeout(res, ms));

const imageUri =
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.indungi.ro%2Fforum%2Fuploads%2Fgallery%2Fcategory_3%2Fgallery_296432_3_1659.png&f=1&nofb=1';

export default async ({offset, limit, q}): Promise<Artist[]> => {
  await timeout(300);
  console.log('q', q);
  const items = [...Array(limit).keys()].map(
    (i) => new Artist(i + offset, `Artist ${q} ${i + offset}`, imageUri),
  );
  return items;
};
