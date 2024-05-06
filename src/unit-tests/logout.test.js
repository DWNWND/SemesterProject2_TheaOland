//The logout function clears the token from browser storage
import { logout } from "../js/api/auth/logout.js";

//MOCK: localStorage
const localStorageMock = {
  removeItem: jest.fn(),
};
global.localStorage = localStorageMock;

describe("logout function", () => {
  it("tests", () => {});
  it("clears the token from browser storage if triggered", () => {
    expect.assertions(1);
    //Assertion
    logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
  });
});
