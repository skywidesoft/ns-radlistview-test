import { ImageSource } from 'image-source';

export class Item {
    id: number;
    name: string;
    role: string;
    image_source?: ImageSource;
}

export class ItemImgSrc {
    id: number;
    image_source: ImageSource;
}
