import AppConfig from '../configs/AppConfig'
import Utils from '../common/util/Utils';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

const RESOURCE = AppConfig.base_url;

const GET = async (body, baseUrl, endpoint) => {
  const res = await NetInfo.fetch();
  const user_token = body.token ? body.token : '';
  if (res.isConnected) {
    Utils.log("Get Call Log Type ===> init", `${baseUrl}${endpoint}`)
    return fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: user_token,
        'Content-Type': 'application/json',
      }),
    }).then(Utils.verifyResponse);
  }
  Alert.alert(
    "No internet connection.",
    "",
    [
      {
        text: 'Got it!'
      }
    ]
  )
  // Alert.alert('No internet connection.',"", [{ text: 'OK' }], { cancelable: false });
  return new Promise((resolve, rejects) =>
    rejects({
      [STATUS]: ERROR,
    }),
  );
};


export const GetBreakingBadCharactersApi = (body) =>
  GET(body, RESOURCE, `/characters`)
    .then(response => response.json())
    .catch(Utils.handleError);



export const GetBreakingBadSearchCharactersApi = (body) =>
  GET(body, RESOURCE, `/characters?name=${body.searchTxt}`)
    .then(response => response.json())
    .catch(Utils.handleError);

