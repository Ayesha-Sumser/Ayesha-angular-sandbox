import { UserDetailsComponent } from "../components/user/user-details/user-details.component";

const baseUrl = 'https://test-marketplace-api.labs.techsphere.io/api/';
const baseStarshipUrl = 'https://swapi.py4e.com/api/starships/';


export const endpoints ={
    carList: `${baseUrl}car/list`,
    addCar: `${baseUrl}car/add-car`,
    carDetails: (slug: string) => `${baseUrl}car/${slug}`,
    editCar: (slug: string) => `${baseUrl}car/edit/${slug}`,// endpoint to edit car
    login: `${baseUrl}user/signin`,
    imageUpload: `${baseUrl}car/img-upload`,
    userList: `${baseUrl}user/list`,
    register: `${baseUrl}user/signup`,
    userDetails: (id: string) => `${baseUrl}user/get/${id}`,
    starshipList: `${baseStarshipUrl}`,
}  
export type EndpointKeys = keyof typeof endpoints;
export type Lambda = (param:any) => string;