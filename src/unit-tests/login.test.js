import { login } from "../js/api/auth/login.js";

//MOCK: headers
// global.Headers = () => {};

//MOCK: location/window
const location = new URL("http://127.0.0.1:5500/");
// location.assign = jest.fn();
// location.replace = jest.fn();
// location.reload = jest.fn();

// delete window.location;
// window.location = location;
global.location = location;

//MOCK: successful fetch request
const mockFetchSuccess = jest.fn().mockResolvedValue({
  ok: true,
  status: 200,
  json: async () => ({
    data: {
      accessToken: "accessToken",
      name: "username",
      email: "email",
    },
  }),
});

//MOCK: failed fetch request 401
const mockFetchFailure = jest.fn().mockResolvedValue({
  ok: false,
  status: 401,
});

// //MOCK: localStorage
const localStorageMock = {
  setItem: jest.fn(),
  getItem: jest.fn(),
};
global.localStorage = localStorageMock;

describe("login function", () => {
  it("stores a token when provided with valid credentials", async () => {
    global.fetch = mockFetchSuccess;
    await login("validEmail", "validPassword");

    // Assertions
    expect(fetch).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith("token", JSON.stringify("accessToken"));
    expect(localStorage.getItem).toHaveBeenCalledWith("token");
  });
  it("throws an error when calling login with invalid credentials", async () => {
    global.fetch = mockFetchFailure;

    // Assertions
    await expect(login("invalidEmail", "invalidPassword")).rejects.toThrow("Email and/or password does not match.");
  });
});

//OLD
// it("calls the API and throws an error", async () => {
//   const mockFetchFailure = jest.fn().mockResolvedValue({
//     ok: false,
//     status: 401,
//     // statusText: "Email and/or password does not match.",
//   });

//   //Mock
//   global.fetch = mockFetchFailure;

//   expect.assertions(2);
//   try {
//     await login("invalidEmail", "invalidPassword");
//   } catch (error) {
//     expect(error.name).toEqual("Error");
//     expect(error).toEqual("Email and/or password does not match.");
//     // expect(fetch.status).toEqual(401);
//   }
// });
