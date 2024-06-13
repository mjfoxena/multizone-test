class ResponseError extends Error {
  response: any;
  data: any;
  constructor() {
    super();
  }
}


export default class ApiService {
  private host: string;
  constructor(api: string) {
    this.host = api;
  }
  get getHeaders() {
    let headers: HeadersInit | undefined = {
      credentials: "same-origin",
      accept: "application/json",
    };
    let authData;
    if (typeof window !== "undefined") {
      authData = JSON.parse(localStorage.getItem("authToken") as string);
      if (authData) headers.Authorization = `Bearer ${authData}`;
    }
    return headers;
  }
  get postHeaders() {
    let headers: HeadersInit | undefined = {
      // credentials: "same-origin",
      accept: "application/json",
      "Content-Type": "application/json",
    };
    const authData = JSON.parse(localStorage.getItem("authToken") as string);
    if (authData) {
      headers.Authorization = `Bearer ${authData}`;
    }
    return headers;
  }
  get(url: string) {
    return fetch(this.host + url, {
      headers: this.getHeaders,
      method: "GET",
    })
      .catch((error) => {
        throw error;
      })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            let err = new ResponseError();
            err.response = res;
            err.data = data;
            throw err;
          });
        }
        return res;
      })
      .then((res) => res.json());
  }
  post(url: string, data: any) {
    return fetch(this.host + url, {
      headers: this.postHeaders,
      method: "POST",
      body: JSON.stringify(data || {}),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((data) => {
          let err = new ResponseError();
          err.response = res;
          err.data = data;
          throw err;
        });
      }
      return res.json().then((data) => data);
    });
  }
  put(url: string, data: any) {
    return fetch(this.host + url, {
      headers: this.postHeaders,
      method: "PUT",
      body: JSON.stringify(data || {}),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((data) => {
          let err = new ResponseError();
          err.response = res;
          err.data = data;
          throw err;
        });
      }
      return res.json().then((data) => data);
    });
  }
}
