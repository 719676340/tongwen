import {get,post} from'./ajax'
import axios from 'axios';

export const api_get_Temperature=(TargetWater,EndTime)=>post('/get_Temperature',{TargetWater,EndTime});