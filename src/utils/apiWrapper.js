import axiosInterceptor from "./axiosInterceptor";
import DOMAIN_BASE_URL from "./config";

export const GET_METHOD = "GET";
export const POST_METHOD = "POST";
export const DELETE_METHOD = "DELETE";
export const PUT_METHOD = "PUT";
export const PATCH_METHOD = "PATCH";

export const API = async (completeAxiosOptions) => {
  const { method, formData, body, apiUrl, customHeaders, queryParams } =
    completeAxiosOptions;
  let jwtToken;
  try {
    try {
      jwtToken = localStorage.getItem("token");
    } catch (e) {
      jwtToken = "";
    }
    let finalApiURL = DOMAIN_BASE_URL + apiUrl;
    let requestHeaders = customHeaders || {};
    requestHeaders.Accept = "application/json";

    requestHeaders["x-auth-token"] = jwtToken;

    const apiData = await axiosInterceptor.request({
      method: method || GET_METHOD,
      url: finalApiURL,
      data: body || formData,
      params: queryParams || {},
      headers: requestHeaders,
    });

    if (apiData.status === 200 || apiData.status === 201) {
      return apiData.data;
    } else {
      throw new Error(apiData.data);
    }
  } catch (exception) {
    let message = "Something went wrong...";
    if (exception["response"]) {
      console.log('exception', exception)
      throw new Error(exception["response"].data);
    } else {
      throw new Error(message);
    }
  }
};

API.getData = (apiUrl, options) =>
  API({ ...options, method: GET_METHOD, apiUrl });

API.postData = async (apiUrl, options) =>
  API({ ...options, method: POST_METHOD, apiUrl });

API.deleteData = (apiUrl, options) =>
  API({ ...options, method: DELETE_METHOD, apiUrl });

API.putData = (apiUrl, options) =>
  API({ ...options, method: PUT_METHOD, apiUrl });

API.patchData = (apiUrl, options) =>
  API({ ...options, method: PATCH_METHOD, apiUrl });
