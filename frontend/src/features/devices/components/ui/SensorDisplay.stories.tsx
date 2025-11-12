import type { Meta, StoryObj } from "@storybook/react";
import { SensorDisplay } from "./SensorDisplay";

const meta = {
  component: SensorDisplay,
  title: "Features/Devices/UI/SensorDisplay",
  tags: ["autodocs"],
} satisfies Meta<typeof SensorDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSensors: Story = {
  args: {
    temperature: 22.5,
    humidity: 45,
    pm25: 12,
    vocIndex: 150,
  },
};

export const TemperatureOnly: Story = {
  args: {
    temperature: 22.5,
    humidity: null,
    pm25: null,
    vocIndex: null,
  },
};

export const HumidityOnly: Story = {
  args: {
    temperature: null,
    humidity: 45,
    pm25: null,
    vocIndex: null,
  },
};

export const AirQuality: Story = {
  args: {
    temperature: null,
    humidity: null,
    pm25: 12,
    vocIndex: 150,
  },
};

export const TemperatureAndHumidity: Story = {
  args: {
    temperature: 22.5,
    humidity: 45,
    pm25: null,
    vocIndex: null,
  },
};

export const HighValues: Story = {
  args: {
    temperature: 35.8,
    humidity: 95,
    pm25: 250,
    vocIndex: 500,
  },
};

export const LowValues: Story = {
  args: {
    temperature: -5.2,
    humidity: 10,
    pm25: 0,
    vocIndex: 0,
  },
};

export const Empty: Story = {
  args: {
    temperature: null,
    humidity: null,
    pm25: null,
    vocIndex: null,
  },
};
