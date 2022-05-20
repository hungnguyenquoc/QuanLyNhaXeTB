import { environment } from 'src/environments/environment';

export class ConstantValue {
  // public static UrlApi = 'https://itel-api-test.techable.vn/api/';
  // public static UrlCdn = 'https://itel-cdn-test.techable.vn/UploadTemp/';
  // public static UrlApi = 'http://42.117.228.37:5002/api/';
  // public static UrlCdn = 'http://42.117.228.37:5000/UploadTemp/';
  // public static UrlApi = 'https://localhost:44341/api/';
  // public static UrlCdn = 'http://localhost:53708/UploadTemp/';
  public static UrlApi = environment.urlApi;
  public static KeyLanguageCookie = 'key-language-itel';
  public static KeyLanguageEnglish = 'en';
  public static KeyLanguageVie = 'vi';
  public static AuthorizationDataKey = '__auth_storage__';
  public static AppStorageDataKey = '__app_storage__'; // state
  public static DefaultPasswordPrefix = 'iTel';
  public static AuthorizationFullName = 'authorization-fullname';
  public static Token = 'token';
  public static DataServicePageKey = 'data-service-page-itel';
  public static DataSimExchangeKey = 'data-sim-exchange-itel';
  public static DataPhysicSimExchangeKey = 'data-physic-sim-exchange-itel';
  public static DataOrderCookie = 'data-order-itel';
  public static DataIsEsim = 'data-is-esim';
  public static DataOrderCodeCookie = 'data-order-code-itel';
  public static ShipFee = 25000;
  public static StaticPageId = 'StaticPageId';
  public static KeyMessageChangePopup = 'ChangePopup';
  public static ConfirmNumber = 'ConfirmNumber';
  public static UpdateDataPackage = 'UpdateDataPackage';
  public static UpdateOrder = 'UpdateOrder';
  public static UpdateDataPackageType = 'UpdateDataPackageType';
  public static UpdateDataPackagePrice = 'UpdateDataPackagePrice';
  public static UpdateCookieOrderModel = 'UpdateCookieOrderModel';
  public static CheckExpireCart = 'CheckExpireCart';
  public static CookieCartExpire = 'CookieCartExpire';
  public static CookieVerifyOtp = 'CookieVerifyOtp';
  public static GetConfigInfo = 'GetConfigInfo';
  public static GetLastConfigInfo = 'GetLastConfigInfo';
  public static GetLastSimPageKeySlug = 'GetLastSimPageKeySlug';
  public static GetUploadImgType = 'GetUploadImgType';
  public static GetReturnedImg = 'GetReturnedImg';
  public static GetCameraError = 'GetCameraError';
  public static LoginRequired = 'LoginRequired';
  public static ShowSuccessPopUp = 'ShowSuccessPopUp';
  public static DataResponseSubscriptionExchange = 'data-subs-ex-res';

  public static LanguageKey = {
    Vietnamese: 1,
    English: 2
  };
  public static ListPopup = {
    PickPackage: 1,
    PickPackageResult: 2,
    ConfirmRegister: 3,
    MessageBox: 4,
    PopupSuccess: 5,
    PopupCamera: 6
  };

  public static TypeImageUploadEkyc = {
    IdentityCardFront: 0,
    IdentityCardBack: 1,
    NewIdentityCardFront: 2,
    NewIdentityCardBack: 3,
    Orther: 4,
    Passport: 5
  };

  public static ValidateTypeCard = {
    IdentityCard: 1,
    NewIdentityCard: 2,
    Passport: 3
  };

  public static getDataByCardType = {
    IdentityCard: -1,
    Passport: 5
  };
}
