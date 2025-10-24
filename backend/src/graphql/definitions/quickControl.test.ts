import { before, describe, it } from "node:test";
import assert from "node:assert";
import type { Device } from "dirigera";

let quickControl: typeof import("./quickControl.ts");

describe("definitions/quickControl", () => {
  before(async () => {
    quickControl = await import("./quickControl.ts");
  });

  describe("getDeviceQuickControls", () => {
    it("returns an empty array if the device list is empty", () => {
      const devicesArray: Device[] = [];
      const deviceQuickControls = quickControl.getDeviceQuickControls(
        devicesArray,
        "1"
      );
      assert.strictEqual(deviceQuickControls.length, 0);
    });

    it("returns an empty array if there is no device in the room", () => {
      const devicesArray = [
        {
          id: "1",
          room: {
            id: "2",
          },
          deviceSet: [],
          capabilities: {
            canReceive: ["isOn"],
          },
          attributes: {
            isOn: false,
          },
        },
      ];
      const deviceQuickControls = quickControl.getDeviceQuickControls(
        // @ts-ignore
        devicesArray,
        "1"
      );
      assert.strictEqual(deviceQuickControls.length, 0);
    });

    it("returns an empty array if there is a device in the room, but cannot receive isOn or playback", () => {
      const devicesArray = [
        {
          id: "1",
          room: {
            id: "1",
          },
          deviceSet: [],
          capabilities: {
            canReceive: [],
          },
          attributes: {},
        },
      ];
      const deviceQuickControls = quickControl.getDeviceQuickControls(
        // @ts-ignore
        devicesArray,
        "1"
      );
      assert.strictEqual(deviceQuickControls.length, 0);
    });

    it("returns an empty array if there is a device in the room, but it is in a set", () => {
      const devicesArray = [
        {
          id: "1",
          room: {
            id: "1",
          },
          deviceSet: [
            {
              id: "set1",
            },
          ],
          capabilities: {
            canReceive: ["isOn"],
          },
          attributes: {
            isOn: true,
          },
        },
      ];
      const deviceQuickControls = quickControl.getDeviceQuickControls(
        // @ts-ignore
        devicesArray,
        "1"
      );
      assert.strictEqual(deviceQuickControls.length, 0);
    });

    it("returns the device quick controls if the device is in the room and can receive isOn", () => {
      const devicesArray = [
        {
          id: "1",
          room: {
            id: "1",
          },
          deviceSet: [],
          capabilities: {
            canReceive: ["isOn"],
          },
          attributes: {
            isOn: false,
          },
        },
      ];
      const deviceQuickControls = quickControl.getDeviceQuickControls(
        // @ts-ignore
        devicesArray,
        "1"
      );
      assert.strictEqual(deviceQuickControls.length, 1);
      assert.strictEqual(deviceQuickControls[0].id, "1");
    });

    it("returns the device quick controls if the device is in the room and can receive playback", () => {
      const devicesArray = [
        {
          id: "1",
          room: {
            id: "1",
          },
          deviceSet: [],
          capabilities: {
            canReceive: ["playback"],
          },
          attributes: {
            playback: "playbackIdle",
          },
        },
      ];
      const deviceQuickControls = quickControl.getDeviceQuickControls(
        // @ts-ignore
        devicesArray,
        "1"
      );
      assert.strictEqual(deviceQuickControls.length, 1);
      assert.strictEqual(deviceQuickControls[0].id, "1");
    });
  });

  describe("getDeviceSetQuickControls", () => {
    it("returns an empty array if the device list is empty", () => {
      const devicesArray: Device[] = [];
      const deviceSetQuickControls = quickControl.getDeviceSetQuickControls(
        devicesArray,
        "1"
      );
      assert.strictEqual(deviceSetQuickControls.length, 0);
    });

    it("returns an empty array if there is no device in the room", () => {
      const devicesArray = [
        {
          id: "1",
          room: {
            id: "2",
          },
          deviceSet: [
            {
              id: "set1",
            },
          ],
          capabilities: {
            canReceive: ["isOn"],
          },
          attributes: {
            isOn: false,
          },
        },
      ];
      const deviceQuickControls = quickControl.getDeviceSetQuickControls(
        // @ts-ignore
        devicesArray,
        "1"
      );
      assert.strictEqual(deviceQuickControls.length, 0);
    });

    it("returns an empty array if there is a device in the room, but cannot receive isOn or playback", () => {
      const devicesArray = [
        {
          id: "1",
          room: {
            id: "1",
          },
          deviceSet: [
            {
              id: "set1",
            },
          ],
          capabilities: {
            canReceive: [],
          },
          attributes: {},
        },
      ];
      const deviceQuickControls = quickControl.getDeviceSetQuickControls(
        // @ts-ignore
        devicesArray,
        "1"
      );
      assert.strictEqual(deviceQuickControls.length, 0);
    });

    it("returns an empty array if there is a device in the room, but it is in not in a set", () => {
      const devicesArray = [
        {
          id: "1",
          room: {
            id: "1",
          },
          deviceSet: [],
          capabilities: {
            canReceive: ["isOn"],
          },
          attributes: {
            isOn: true,
          },
        },
      ];
      const deviceQuickControls = quickControl.getDeviceSetQuickControls(
        // @ts-ignore
        devicesArray,
        "1"
      );
      assert.strictEqual(deviceQuickControls.length, 0);
    });

    it("returns the device quick controls if the device is in the room and can receive isOn", () => {
      const devicesArray = [
        {
          id: "1",
          room: {
            id: "1",
          },
          deviceSet: [
            {
              id: "set1",
            },
          ],
          capabilities: {
            canReceive: ["isOn"],
          },
          attributes: {
            isOn: false,
          },
        },
      ];
      const deviceQuickControls = quickControl.getDeviceSetQuickControls(
        // @ts-ignore
        devicesArray,
        "1"
      );
      assert.strictEqual(deviceQuickControls.length, 1);
      assert.strictEqual(deviceQuickControls[0].id, "set1");
    });

    it("returns the device quick controls if the device is in the room and can receive playback", () => {
      const devicesArray = [
        {
          id: "1",
          room: {
            id: "1",
          },
          deviceSet: [
            {
              id: "set1",
            },
          ],
          capabilities: {
            canReceive: ["playback"],
          },
          attributes: {
            playback: "playbackIdle",
          },
        },
      ];
      const deviceQuickControls = quickControl.getDeviceSetQuickControls(
        // @ts-ignore
        devicesArray,
        "1"
      );
      assert.strictEqual(deviceQuickControls.length, 1);
      assert.strictEqual(deviceQuickControls[0].id, "set1");
    });
  });
});
