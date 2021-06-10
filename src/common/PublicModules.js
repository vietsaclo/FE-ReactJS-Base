import { LocalStorageKeys, NotificationKeys } from "./utils/keys";
import { UserLoginEntity, DataResponse, GaurdEntity } from "./entities";
import axios from "axios";
import { Apis } from "./utils/Apis";
import { CoreUI } from "./CoreUI";

export class PublicModules {
  static IMAGE_NOT_FOUND = 'https://ipfs.io/ipfs/Qma3gY2kzX25NZUVvEN3DBfCqbqPkvnmRnc6S1ALx2mRzK';

  static fun_log = (value, file, line) => {
    if (String(process.env.REACT_APP_DEBUG_MODE) === 'TRUE') {
      const logHeader = `======== DEBUG LOG MODE [ File: ${file || 'NULL'} ; Line: ${line || 'NULL'} ] ========`;
      console.log(logHeader);
      console.log(value);
      let logFooter = '';
      const mid = logHeader.length / 2;
      for (let i in logHeader) {
        if (i < mid - 5 || i > mid + 5)
          logFooter += '='
        else
          logFooter += '-'
      }
      console.log(logFooter);
    }
  }

  static fun_trimAddress = (address) => {
    if (!address)
      return 'Load Address Failure!';
    if (address.length > 12)
      return address.substring(0, 6) + '...' + address.substring(address.length - 9, address.length);
    return address;
  }

  static fun_setUserLoginLocalStorage = (userLoginEntity) => {
    const user = new UserLoginEntity(userLoginEntity);
    localStorage.setItem(LocalStorageKeys.ISLOGIN, user.isLogin);
    localStorage.setItem(LocalStorageKeys.USERNAME, user.userName);
    localStorage.setItem(LocalStorageKeys.ADDRESS, user.address);
  }

  static fun_setTokenAndRefreshTokenLocalStorage = (gaurd) => {
    localStorage.setItem(LocalStorageKeys.TOKEN, gaurd.token);
    localStorage.setItem(LocalStorageKeys.TOKEN_REFRESH, gaurd.refresh);
  }

  static fun_removeUserLoginLocalStorage = () => {
    localStorage.removeItem(LocalStorageKeys.ISLOGIN);
    localStorage.removeItem(LocalStorageKeys.USERNAME);
    localStorage.removeItem(LocalStorageKeys.ADDRESS);
  }

  static fun_removeTokenAndRefreshTokenLocalStorage = () => {
    localStorage.removeItem(LocalStorageKeys.TOKEN);
    localStorage.removeItem(LocalStorageKeys.TOKEN_REFRESH);
  }

  static fun_getUserLoginLocalStorage = () => {
    const isLogin = localStorage.getItem(LocalStorageKeys.ISLOGIN);
    if (!isLogin || String(isLogin) !== 'true')
      return null;
    const userName = localStorage.getItem(LocalStorageKeys.USERNAME);
    const address = localStorage.getItem(LocalStorageKeys.ADDRESS);
    const user = new UserLoginEntity({
      isLogin: isLogin,
      userName: userName,
      address: address,
    });

    return user;
  }

  static fun_getTokenAndRefreshTokenLocalStorage = () => {
    const token = localStorage.getItem(LocalStorageKeys.TOKEN);
    const refresh = localStorage.getItem(LocalStorageKeys.TOKEN_REFRESH);
    if (!token || !refresh)
      return null;
    const result = new GaurdEntity();
    result.token = token;
    result.refresh = refresh;
    return result;
  }

  static fun_getConfigBearerDefault({
    isRefresh = false,
  }) {
    const gaurd = PublicModules.fun_getTokenAndRefreshTokenLocalStorage();
    if (!gaurd)
      return null;
    let token = gaurd.token;
    if (isRefresh)
      token = gaurd.refresh;
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  }

  static fun_updateTokenAndRefreshTokenWhenSessionUserExpired = async () => {
    const dataRefreshToken = await PublicModules.fun_post(
      Apis.API_HOST + Apis.API_TAILER.ME,
      null,
      PublicModules.fun_getConfigBearerDefault({ isRefresh: true }),
    );

    // error : [ user needed login again ]
    if (!dataRefreshToken.success) {
      const ok = await CoreUI.fun_showConfirm({
        title: 'Your Session Expired',
        message: 'You need login again to use this application',
      });
      if (!ok) return;
      PublicModules.fun_removeTokenAndRefreshTokenLocalStorage();
      PublicModules.fun_removeUserLoginLocalStorage();
      window.location.replace('/');
    }

    const gaurd = dataRefreshToken.data.gaurd;
    // remove old token
    PublicModules.fun_removeTokenAndRefreshTokenLocalStorage()
    // add new token
    PublicModules.fun_setTokenAndRefreshTokenLocalStorage(gaurd);
  }

  static fun_get = async (url, conf) => {
    const dataRes = new DataResponse();
    await axios.get(url, conf)
      .catch(async (e) => {
        dataRes.success = false;
        dataRes.message = "ERROR_FETCH_URL";
        PublicModules.fun_log(e, 'PublicModule', 64);
        // started update token & refresh token.
        await PublicModules.fun_updateTokenAndRefreshTokenWhenSessionUserExpired();
      })
      .then((dataServer) => {
        if (dataServer) {
          dataServer = dataServer.data;
          dataRes.success = dataServer.success;
          dataRes.data = dataServer.result;
          dataRes.message = dataServer.message;
        } else {
          dataRes.success = false;
          dataRes.message = "ERROR_SERVER_500";
        }
      });
    return dataRes;
  }

  static fun_post = async (url, data, conf) => {
    const dataRes = new DataResponse();
    await axios.post(url, data, conf)
      .catch(async (e) => {
        dataRes.success = false;
        dataRes.message = "ERROR_FETCH_URL";
        PublicModules.fun_log(e, 'PublicModule', 87);
        // started update token & refresh token.
        try {
          const dataRefreshToken = await axios.post(
            Apis.API_HOST + Apis.API_TAILER.ME,
            null,
            PublicModules.fun_getConfigBearerDefault({ isRefresh: true }),
          );
          // error : [ user needed login again ]
          if (!dataRefreshToken.data.success) {
            const ok = await CoreUI.fun_showConfirm({
              title: 'Your Session Expired',
              message: 'You need login again to use this application',
            });
            if (!ok) return;
            PublicModules.fun_removeTokenAndRefreshTokenLocalStorage();
            PublicModules.fun_removeUserLoginLocalStorage();
            window.location.replace('/');
          }

          const gaurd = dataRefreshToken.data.result.gaurd;
          // remove old token
          PublicModules.fun_removeTokenAndRefreshTokenLocalStorage()
          // add new token
          PublicModules.fun_setTokenAndRefreshTokenLocalStorage(gaurd);
        } catch (e) {
          PublicModules.fun_log(e, 'PublicModule', 180);
          const ok = await CoreUI.fun_showConfirm({
            title: 'Your Session Expired',
            message: 'You need login again to use this application',
          });
          if (!ok) return;
          PublicModules.fun_removeTokenAndRefreshTokenLocalStorage();
          PublicModules.fun_removeUserLoginLocalStorage();
          window.location.replace('/');
        }
      })
      .then((dataServer) => {
        if (dataServer) {
          dataServer = dataServer.data;
          dataRes.success = dataServer.success;
          dataRes.data = dataServer.result;
          dataRes.message = dataServer.message;
        } else {
          dataRes.success = false;
          dataRes.message = "ERROR_SERVER_500";
        }
      });
    return dataRes;
  }

  static fun_put = async (url, data, conf) => {
    const dataRes = new DataResponse();
    await axios.put(url, data, conf)
      .catch(async (e) => {
        dataRes.success = false;
        dataRes.message = "ERROR_FETCH_URL";
        PublicModules.fun_log(e, 'PublicModule', 110);
        // started update token & refresh token.
        // await PublicModules.fun_updateTokenAndRefreshTokenWhenSessionUserExpired();
        const dataRefreshToken = await PublicModules.fun_post(
          Apis.API_HOST + Apis.API_TAILER.ME,
          null,
          PublicModules.fun_getConfigBearerDefault({ isRefresh: true }),
        );

        // error : [ user needed login again ]
        if (!dataRefreshToken.success) {
          const ok = await CoreUI.fun_showConfirm({
            title: 'Your Session Expired',
            message: 'You need login again to use this application',
          });
          if (!ok) return;
          PublicModules.fun_removeTokenAndRefreshTokenLocalStorage();
          PublicModules.fun_removeUserLoginLocalStorage();
          window.location.replace('/');
        }

        const gaurd = dataRefreshToken.data.gaurd;
        // remove old token
        PublicModules.fun_removeTokenAndRefreshTokenLocalStorage()
        // add new token
        PublicModules.fun_setTokenAndRefreshTokenLocalStorage(gaurd);
      })
      .then((dataServer) => {
        if (dataServer) {
          dataServer = dataServer.data;
          dataRes.success = dataServer.success;
          dataRes.data = dataServer.result;
          dataRes.message = dataServer.message;
        } else {
          dataRes.success = false;
          dataRes.message = "ERROR_SERVER_500";
        }
      });
    return dataRes;
  }

  static fun_delete = async (url, conf) => {
    const dataRes = new DataResponse();
    await axios.delete(url, conf)
      .catch(async (e) => {
        dataRes.success = false;
        dataRes.message = "ERROR_FETCH_URL";
        PublicModules.fun_log(e, 'PublicModule', 137);
        // started update token & refresh token.
        await PublicModules.fun_updateTokenAndRefreshTokenWhenSessionUserExpired();
      })
      .then((dataServer) => {
        if (dataServer) {
          dataServer = dataServer.data;
          dataRes.success = dataServer.success;
          dataRes.data = dataServer.result;
          dataRes.message = dataServer.message;
        } else {
          dataRes.success = false;
          dataRes.message = "ERROR_SERVER_500";
        }
      });
    return dataRes;
  }

  static fun_getTimeStamp = () => {
    return new Date().getTime().toString();
  }

  static fun_requireLogin = ({
    isRedirectToHome= true,
  }) => {
    const user = PublicModules.fun_getUserLoginLocalStorage();
    const gaurd = PublicModules.fun_getTokenAndRefreshTokenLocalStorage();
    if ((!user || !gaurd) && isRedirectToHome)
      window.location.replace('/');

    return {
      user: user,
      gaurd: gaurd,
    }
  }
}