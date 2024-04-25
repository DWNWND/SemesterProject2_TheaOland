//The logout function clears the token from browser storage

import { logout } from "../js/api/auth/index.js";

//MOCK: localStorage
const localStorageMock = {
  removeItem: jest.fn(),
};
global.localStorage = localStorageMock;

describe("logout function", () => {
  it("clears the token from browser storage if triggered", () => {
    //Assertion
    logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
  });
});
