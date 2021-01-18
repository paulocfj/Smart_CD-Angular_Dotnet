export interface cdFormEditModel{
    UserId: string,
    CdId: string,
    cd : {
        name: string,
        artist: string,
        year: string,
        genre: string,
        duration: string,
        Id: string
   }
}