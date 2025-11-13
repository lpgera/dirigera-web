/**
 * Converts HSV color values to RGB hex string
 * @param hue - Hue value in degrees (0-360)
 * @param saturation - Saturation value (0-1)
 * @returns RGB color as hex string (e.g., "#ff0000")
 */
export function hsvToRgb(hue: number, saturation: number): string {
  const hNorm = hue / 360;
  const sNorm = saturation;
  const v = 1;

  const c = v * sNorm;
  const x = c * (1 - Math.abs(((hNorm * 6) % 2) - 1));
  const m = v - c;

  let r = 0,
    g = 0,
    b = 0;
  if (hNorm < 1 / 6) {
    [r, g, b] = [c, x, 0];
  } else if (hNorm < 2 / 6) {
    [r, g, b] = [x, c, 0];
  } else if (hNorm < 3 / 6) {
    [r, g, b] = [0, c, x];
  } else if (hNorm < 4 / 6) {
    [r, g, b] = [0, x, c];
  } else if (hNorm < 5 / 6) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  const toHex = (n: number) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Calculates the device color based on available color attributes.
 * Prioritizes colorHue/colorSaturation over colorTemperature.
 *
 * @param colorHue - Optional hue value (0-360)
 * @param colorSaturation - Optional saturation value (0-1)
 * @param colorTemperature - Optional temperature value in Kelvin (2202-4000)
 * @returns RGB color as hex string, or undefined if no color attributes are available
 */
export function calculateDeviceColor(
  colorHue?: number,
  colorSaturation?: number,
  colorTemperature?: number
): string | undefined {
  // Prefer HSV color if both hue and saturation are available
  if (colorHue !== undefined && colorSaturation !== undefined) {
    return hsvToRgb(colorHue, colorSaturation);
  }

  // Fall back to color temperature approximation
  if (colorTemperature !== undefined) {
    // Map temperature to a warm-to-cool gradient
    // 2202K = warm orange, 4000K = cool blue
    const normalized = (colorTemperature - 2202) / (4000 - 2202);

    // Warm (orange) to neutral (white) to cool (blue)
    if (normalized < 0.5) {
      // Warm: orange to white
      const factor = normalized * 2;
      const r = 255;
      const g = Math.round(165 + (255 - 165) * factor);
      const b = Math.round(0 + 255 * factor);
      return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    } else {
      // Cool: white to blue
      const factor = (normalized - 0.5) * 2;
      const r = Math.round(255 - (255 - 135) * factor);
      const g = Math.round(255 - (255 - 206) * factor);
      const b = 255;
      return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    }
  }

  return undefined;
}
