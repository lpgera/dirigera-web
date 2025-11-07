# Device Images Feature - Quick Start Guide

## ✅ What Was Implemented

The device image feature allows you to associate custom images with your IKEA Dirigera devices. Images are displayed on:

1. **Rooms overview page** - Small thumbnails (60x60px) with device names
2. **Individual device detail cards** - Larger cover images (150px height)

## 📁 Files Created/Modified

### New Files

- ✅ `frontend/src/useDeviceImages.ts` - Custom hook to load device image config
- ✅ `frontend/public/device-images.config.json` - Configuration file for device-to-image mappings
- ✅ `frontend/public/DEVICE_IMAGES_README.md` - Detailed documentation
- ✅ `DEVICE_IMAGES_QUICKSTART.md` - This file

### Modified Files

- ✅ `frontend/src/components/Rooms.tsx` - Added device image thumbnails section
- ✅ `frontend/src/components/Device.tsx` - Added cover image to device cards

## 🚀 How to Use

### Step 1: Find Your Device IDs

Run the app and open the GraphQL playground at `http://localhost:4000/graphql`, then run:

```graphql
query {
  rooms {
    name
    devices {
      id
      name
      type
    }
  }
}
```

Copy the device IDs you want to configure.

### Step 2: Edit the Configuration File

Open `frontend/public/device-images.config.json` and add your mappings:

```json
{
  "_comment": "Map device IDs to image filenames in the /devices folder",

  "your-device-id-here": "stue_sofa.png",
  "another-device-id": "havestue.png"
}
```

### Step 3: Ensure Images Exist

Your images should be in: `frontend/public/devices/`

Current available images:

- hall_loft.png
- havestue.png
- stue_reol.png
- stue_sofa.png
- stue_spisebord.png
- stue_vaeg.png

### Step 4: Restart/Reload

**Development mode:**

```bash
npm run watch -w frontend
```

Then reload your browser (Ctrl+R or Cmd+R)

**Production mode:**

```bash
npm run build
npm start
```

Then reload your browser

## 🧪 Testing Checklist

Before marking this complete, please test:

- [ ] Run `npm run build` to ensure no TypeScript errors
- [ ] Start the app and verify it loads without console errors
- [ ] Navigate to the Rooms overview page
- [ ] Add a device ID mapping to the config file
- [ ] Reload the page and verify the image appears
- [ ] Test with a missing/invalid image filename (should gracefully hide)
- [ ] Test with a device ID not in the config (should not show image)
- [ ] Click through to a room detail page and verify cover images appear
- [ ] Test responsive behavior on mobile viewport

## 🔧 Configuration Features

### Runtime Configuration

✅ No rebuild required - just edit the JSON and reload the browser

### Error Handling

✅ Gracefully handles:

- Missing config file
- Invalid JSON
- Missing images (404)
- Unreachable devices (shows with 50% opacity)

### Comment Support

✅ JSON keys starting with `_` are treated as comments:

```json
{
  "_comment": "This is a comment",
  "_note": "Add your device mappings below",
  "actual-device-id": "image.png"
}
```

## 📝 Example Configuration

```json
{
  "_comment": "Device image mappings - Edit this file to customize",
  "_instructions": "1. Find device ID from GraphQL API",
  "_instructions2": "2. Place image in frontend/public/devices/",
  "_instructions3": "3. Add mapping below",

  "00000000-0000-0000-0000-livingroom-lamp": "stue_sofa.png",
  "00000000-0000-0000-0000-bedroom-light": "hall_loft.png",
  "00000000-0000-0000-0000-kitchen-ceiling": "havestue.png"
}
```

## 🐛 Troubleshooting

### Images not showing?

1. Check browser console for errors (F12)
2. Verify device ID is correct (exact match)
3. Verify filename is correct (case-sensitive)
4. Verify image exists in `frontend/public/devices/`
5. Try hard refresh (Ctrl+Shift+R)

### TypeScript errors?

Run: `cd frontend && npx tsc --noEmit`

### Config not loading?

1. Check JSON syntax with a validator
2. Verify file is at `frontend/public/device-images.config.json`
3. Check browser network tab for 404 errors

## 🎨 Adding New Images

1. Place image in `frontend/public/devices/`
2. Recommended: 500x500px, PNG or JPG, under 500KB
3. Add mapping to config file
4. Reload browser

## 📦 Production Deployment

The config file is copied during build:

```bash
npm run build
# Config is automatically included in build/device-images.config.json
```

For Docker, you can mount a custom config:

```bash
docker run -v ./my-config.json:/app/frontend/build/device-images.config.json ...
```

## ✨ Features Implemented

- ✅ Runtime configuration (no rebuild needed)
- ✅ Simple JSON format
- ✅ Comment support in JSON
- ✅ Graceful error handling
- ✅ Image load error handling
- ✅ Responsive design (60x60 thumbnails on overview)
- ✅ Larger images on detail view (150px cover)
- ✅ Device name labels
- ✅ Unreachable device indication (50% opacity)
- ✅ TypeScript typed
- ✅ React hooks pattern
- ✅ Documented with examples

## 🎯 Next Steps

1. **Test the implementation** using the checklist above
2. **Find your device IDs** using the GraphQL query
3. **Configure your first device image** in the config file
4. **Verify it displays correctly** on both overview and detail pages
5. **Add more devices** as needed

If everything works, update the main README.md with a link to the device images documentation!
