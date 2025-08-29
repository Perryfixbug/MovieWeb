interface MovieType {
    "id": number,
    "slug": string,
    "name": string,
    "description": string,
    "userRate": number,
    "imdbRate": number,
    "rottenRate": number,
    "length": number,
    "publishYear": number,
    "director": string,
    "production": string,
    "country": string,
    "label": string,
    "fact": string,
    "type": string,
    "categories": [string],
    "status": string,
    "actor": string,
    "linkTrailer": string,
    "linkVideo": string,
    "linkSub": string,
    "thumbnail": string,
    "poster": string,
    "userId": number,
    "createAt": Date
}

interface CategoryType{
    "id": number,
    "value": string,
    "order": number,
    "isDisplay": boolean,
    "thumbnail": string,
    "movies": MovieType[]
}