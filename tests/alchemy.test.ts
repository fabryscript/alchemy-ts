import { transformKeys } from "../src/alchemy";

test("should return a new object with transformed keys", () => {
  let obj = {
    nome: "Fabrizio",
    anni: 17,
  };
  let result = transformKeys(obj, (k) => {
    if (k === "nome") k = "name";
    if (k === "anni") k = "age";

    return k;
  });
  expect(result).toStrictEqual({
    name: "Fabrizio",
    age: 17,
  });
});

test("sould return the same object", () => {
  let obj = {
    name: "Zhongli",
    element: "Geo"
  }
  let result = transformKeys(obj, (k => k))
  expect(result).toEqual(obj)
})

test("should return a new obj with transformed keys starting from stringed keys", () => {
  let obj = {
    "name": "Raiden Shogun",
    "element": "Electro",
    "musouNoHitotachi": () => {
      console.log("Inazuma Shines Eternal!")
    }
  }
  let res = transformKeys(obj, (k => {
    if(k === "name") k = "nome"
    if(k === "element") k = "elemento"
    if(k === "musouNoHitotachi") k = "burstLine"
    return k;
  }))

  expect(Object.getOwnPropertyNames(res)).toEqual(["nome", "elemento", "burstLine"])
})