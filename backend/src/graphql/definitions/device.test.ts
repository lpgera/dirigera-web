import { before, describe, it } from "node:test";
import assert from "node:assert";
import type { Device } from "dirigera";

let device: typeof import("./device.ts");

describe("definitions/device", () => {
  before(async () => {
    device = await import("./device.ts");
  });

  describe("getAttributeIfCanReceive", () => {
    it("returns the attribute value if it is present in canReceive capabilities", () => {
      const d = {
        capabilities: {
          canReceive: ["isOn"],
          canSend: [],
        },
        attributes: {
          isOn: false,
          isReachable: true,
        },
      };
      // @ts-ignore
      const attributeValue = device.getAttributeIfCanReceive(d, "isOn");
      assert.strictEqual(attributeValue, false);
    });

    it("returns null if the attribute is not present in canReceive capabilities", () => {
      const d = {
        capabilities: {
          canReceive: ["isOn"],
          canSend: [],
        },
        attributes: {
          isOn: false,
          isReachable: true,
        },
      };
      // @ts-ignore
      const attributeValue = device.getAttributeIfCanReceive(d, "isReachable");
      assert.strictEqual(attributeValue, null);
    });
  });

  describe("getDevicesNotInSet", () => {
    it("returns an empty array if the device list is empty", () => {
      const devicesArray: Device[] = [];
      const devicesNotInSet = device.getDevicesNotInSet(devicesArray);
      assert.strictEqual(devicesNotInSet.length, 0);
    });

    it("returns a device object if the device is not in a set", () => {
      const devicesArray = [
        {
          id: "1",
          deviceSet: [],
          capabilities: {
            canReceive: [],
            canSend: [],
          },
          attributes: {
            playbackAudio: {},
          },
        },
      ];
      // @ts-ignore
      const devicesNotInSet = device.getDevicesNotInSet(devicesArray);
      assert.strictEqual(devicesNotInSet.length, 1);
      assert.strictEqual(devicesNotInSet[0].id, "1");
    });

    it("does not return a device object if the device is in a set", () => {
      const devicesArray = [
        {
          id: "1",
          deviceSet: [
            {
              id: "set1",
            },
          ],
          capabilities: {
            canReceive: [],
            canSend: [],
          },
          attributes: {
            playbackAudio: {},
          },
        },
        {
          id: "2",
          deviceSet: [],
          capabilities: {
            canReceive: [],
            canSend: [],
          },
          attributes: {
            playbackAudio: {},
          },
        },
      ];
      // @ts-ignore
      const devicesNotInSet = device.getDevicesNotInSet(devicesArray);
      assert.strictEqual(devicesNotInSet.length, 1);
      assert.strictEqual(devicesNotInSet[0].id, "2");
    });
  });

  describe("getDeviceSets", () => {
    it("returns an empty array if the device list is empty", () => {
      const devicesArray: Device[] = [];
      const deviceSets = device.getDeviceSets(devicesArray);
      assert.strictEqual(deviceSets.length, 0);
    });

    it("returns a device set object if the device is in a set", () => {
      const devicesArray = [
        {
          id: "1",
          deviceSet: [
            {
              id: "set1",
            },
          ],
          capabilities: {
            canReceive: [],
            canSend: [],
          },
          attributes: {
            playbackAudio: {},
          },
        },
        {
          id: "2",
          deviceSet: [
            {
              id: "set1",
            },
          ],
          capabilities: {
            canReceive: [],
            canSend: [],
          },
          attributes: {
            playbackAudio: {},
          },
        },
      ];
      // @ts-ignore
      const deviceSets = device.getDeviceSets(devicesArray);
      assert.strictEqual(deviceSets.length, 1);
      assert.strictEqual(deviceSets[0].id, "set1");
    });

    it("does not return a device set object if the device is not in a set", () => {
      const devicesArray = [
        {
          id: "1",
          deviceSet: [],
          capabilities: {
            canReceive: [],
            canSend: [],
          },
          attributes: {
            playbackAudio: {},
          },
        },
        {
          id: "2",
          deviceSet: [],
          capabilities: {
            canReceive: [],
            canSend: [],
          },
          attributes: {
            playbackAudio: {},
          },
        },
      ];
      // @ts-ignore
      const deviceSets = device.getDeviceSets(devicesArray);
      assert.strictEqual(deviceSets.length, 0);
    });
  });
});
