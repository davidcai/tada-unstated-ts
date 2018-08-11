import { idify } from ".";

describe("idify()", () => {
  it("should convert an array into map with keys being IDs from each item in the array and values being items", () => {
    const items = [
      { id: "1", name: "item 1" },
      { id: "2", name: "item 2" },
      { id: "3", name: "item 3" }
    ];
    const map = idify(items);

    expect(map).toMatchObject({
      "1": {
        id: "1",
        name: "item 1"
      },
      "2": {
        id: "2",
        name: "item 2"
      },
      "3": {
        id: "3",
        name: "item 3"
      }
    });
  });

  it("should return an empty map if input is empty", () => {
    const map = idify();

    expect(map).toEqual({});
  });
});
