import { resourceUsage } from "process";
import { asyncTransformKeys } from "../src/alchemy";

test("should return a new object with asynchronously transformed keys", async () => {
  let obj = {
    nome: "Fabrizio",
    anni: 17,
  };
  let result = await asyncTransformKeys(obj, async (k) => {
    if (k === "nome") k = "name";
    if (k === "anni") k = "age";

    return k;
  });
  console.log(result)
  expect(result).toStrictEqual({
    name: "Fabrizio",
    age: 17,
  });
});