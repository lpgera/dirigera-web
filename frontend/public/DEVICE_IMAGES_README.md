# Device Images Configuration

This guide explains how to associate custom images with your IKEA Dirigera devices.

## Overview

Device images are displayed on:

- **Rooms overview page** - Small thumbnails showing all devices with configured images
- **Individual device cards** - Larger cover images in the detailed room view

## Configuration File

Edit the `device-images.config.json` file in this folder to map device IDs to image filenames.

### File Location

```
frontend/public/device-images.config.json
```

### Format

Simple JSON object mapping device IDs to image filenames:

```json
{
  "_comment": "Map device IDs to image filenames in the /devices folder",

  "device-id-here": "image-filename.png",
  "another-device-id": "another-image.png"
}
```

**Note:** Lines starting with underscore (`_`) are treated as comments and ignored.

## How to Find Device IDs

### Method 1: Browser Console

1. Open the web app and navigate to a room
2. Open browser DevTools (F12)
3. Go to the Console tab
4. Type: `localStorage.getItem('apollo-cache-persist')`
5. Look for device IDs in the cached data

### Method 2: GraphQL Query

1. Open the GraphQL endpoint at `http://your-server:4000/graphql`
2. Run this query:

```graphql
query {
  rooms {
    name
    devices {
      id
      name
    }
  }
}
```

3. Copy the device IDs from the response

### Method 3: Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Reload the rooms page
4. Look for the GraphQL request
5. Check the response for device IDs

## Adding Images

### Step 1: Place Image in devices/ Folder

Add your device image to the `frontend/public/devices/` folder.

**Supported formats:** PNG, JPG, JPEG, GIF, WebP

**Recommended specifications:**

- Size: 500x500 pixels or similar square aspect ratio
- Format: PNG or JPG
- File size: Under 500KB for optimal performance

### Step 2: Update Configuration

Edit `device-images.config.json` and add your mapping:

```json
{
  "_comment": "Device image mappings",

  "00000000-0000-0000-0000-000000000001": "living_room_lamp.png",
  "00000000-0000-0000-0000-000000000002": "bedroom_light.png"
}
```

### Step 3: Reload the App

The configuration is loaded at runtime, so simply refresh your browser to see the changes.

**No rebuild required!** 🎉

## Example Configuration

```json
{
  "_comment": "Map device IDs to image filenames in the /devices folder",
  "_example": "To find device IDs, check the GraphQL API or browser console logs",

  "hall-loft-device-id": "hall_loft.png",
  "living-room-shelf-id": "stue_reol.png",
  "living-room-sofa-id": "stue_sofa.png",
  "living-room-table-id": "stue_spisebord.png",
  "living-room-wall-id": "stue_vaeg.png",
  "garden-room-id": "havestue.png"
}
```

## Troubleshooting

### Image Not Showing

1. **Check the device ID** - Make sure you're using the exact ID from the GraphQL API
2. **Check the filename** - Ensure the filename matches exactly (case-sensitive)
3. **Check the file exists** - Verify the image is in `frontend/public/devices/`
4. **Check browser console** - Look for 404 errors or other issues
5. **Clear browser cache** - Hard refresh with Ctrl+Shift+R (or Cmd+Shift+R on Mac)

### Image Shows as Broken

1. **Check image format** - Ensure it's a valid image file
2. **Check file permissions** - Make sure the file is readable
3. **Check image size** - Very large images may cause issues

### Configuration Not Loading

1. **Check JSON syntax** - Use a JSON validator to ensure valid JSON
2. **Check file location** - Must be in `frontend/public/`
3. **Check browser console** - Look for parsing errors

## Tips

- **Use descriptive filenames** like `kitchen_ceiling_light.png` instead of `img1.png`
- **Keep images optimized** - Compress images to reduce load times
- **Use consistent aspect ratios** - Square images (1:1) work best
- **Test on mobile** - Ensure images look good on smaller screens
- **Document your mappings** - Keep a separate note of which device is which

## Docker Deployment

When running in Docker, you can mount a custom configuration:

```bash
docker run -v ./my-device-images.config.json:/app/frontend/build/device-images.config.json ...
```

Or use a volume for the entire devices folder:

```bash
docker run -v ./my-devices:/app/frontend/build/devices ...
```
