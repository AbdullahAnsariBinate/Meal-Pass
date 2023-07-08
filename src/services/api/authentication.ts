// import {stores} from '../../stores';
import axios from 'axios'
import {CounterGetResponse} from '../../utils/types/api';

export class AuthenticationApi {
  get = async (): Promise<CounterGetResponse> => {
    const resp = await fetch('https://cli-rn.batyr.io/api/counter');
    const json: CounterGetResponse = await resp.json();
    return json;
  };
  signin= async (data:any): Promise<any> => {
    const response  =await axios.post('https://api.myprojectstaging.com/mealpass/api/user/login',{...data,is_social:0});
    return response;
  };


  signup= async (data:any): Promise<any> => {
    console.log("params sent for signup", {...data,is_social:0,avatar:'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png'});
    
    const response  =await axios.post('https://api.myprojectstaging.com/mealpass/api/user/register',{...data,is_social:0,avatar:'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png'});
    return response;
  };
}
