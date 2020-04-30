export interface IProfile {
    displayName: string;
    username: string;
    bio: string;
    image: string;
    photos: IPhoto[];
}

export interface IProfileForm {
    displayName: string;
    bio: string;
}

export interface IProfileFormValues extends Partial<IProfileForm> {}

export interface IPhoto {
    id: string;
    url: string;
    isMain: boolean;
}
