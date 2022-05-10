import { expect } from "chai";
import { exampleHello } from "../src/alchemy";
describe("example func", (): void => {
  it("logs 'Ciao, $name' into the console", (): void => {
    const result = exampleHello("fabrizio");
    expect(result).is.equal("Ciao! fabrizio")
  })
})