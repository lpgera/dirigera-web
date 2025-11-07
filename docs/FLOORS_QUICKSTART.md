# Floor Grouping - Quick Start

## ✅ What Was Implemented

A runtime configuration system to group rooms by floors (Ground Floor, First Floor, etc.) on the Rooms overview page.

## 📁 Files Created/Modified

### New Files

- ✅ `frontend/src/useFloors.ts` - React hook to load and manage floor configuration
- ✅ `frontend/public/floors.config.json` - Configuration file for floor groupings
- ✅ `FLOORS_CONFIGURATION.md` - Comprehensive documentation
- ✅ `FLOORS_QUICKSTART.md` - This file

### Modified Files

- ✅ `frontend/src/components/Rooms.tsx` - Updated to support floor grouping

## 🚀 How to Use

### Step 1: Get Your Room IDs

Run this GraphQL query at `http://localhost:4000/graphql`:

```graphql
query {
  rooms {
    id
    name
  }
}
```

Copy the room IDs you want to group.

### Step 2: Edit Configuration

Open `frontend/public/floors.config.json` and add your floors:

```json
{
  "floors": [
    {
      "id": "ground-floor",
      "name": "Ground Floor",
      "order": 1,
      "rooms": ["your-room-id-1", "your-room-id-2"]
    },
    {
      "id": "first-floor",
      "name": "First Floor",
      "order": 2,
      "rooms": ["your-room-id-3", "your-room-id-4"]
    }
  ]
}
```

### Step 3: Reload Browser

Just refresh the page - no rebuild needed! 🎉

## 📊 Visual Changes

### Before (No Floor Grouping)

```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Living Room │ │ Kitchen     │ │ Bedroom     │
└─────────────┘ └─────────────┘ └─────────────┘
```

### After (With Floor Grouping)

```
Ground Floor
┌─────────────┐ ┌─────────────┐
│ Living Room │ │ Kitchen     │
└─────────────┘ └─────────────┘

First Floor
┌─────────────┐
│ Bedroom     │
└─────────────┘
```

## 🎯 Features

✅ **Runtime Configuration** - Edit JSON, reload browser (no rebuild)
✅ **Multiple Floors** - Support any number of floors
✅ **Custom Names** - Use any floor names (Ground Floor, Level 1, Erdgeschoss, etc.)
✅ **Custom Order** - Control display order with `order` field
✅ **Unassigned Rooms** - Rooms not in any floor appear in "Other" section
✅ **Graceful Fallback** - Works without config file (shows all rooms normally)
✅ **Type-Safe** - Full TypeScript support
✅ **Error Handling** - Missing/invalid config handled gracefully

## 🔧 Configuration Schema

### Floor Object

```typescript
{
  "id": string,        // Unique identifier (kebab-case recommended)
  "name": string,      // Display name in UI
  "order": number,     // Sort order (lower = shown first)
  "rooms": string[]    // Array of room IDs
}
```

### Example: 3 Floors

```json
{
  "floors": [
    {
      "id": "basement",
      "name": "Basement",
      "order": 0,
      "rooms": ["basement-storage-id", "basement-gym-id"]
    },
    {
      "id": "ground-floor",
      "name": "Ground Floor",
      "order": 1,
      "rooms": ["living-room-id", "kitchen-id"]
    },
    {
      "id": "first-floor",
      "name": "First Floor",
      "order": 2,
      "rooms": ["bedroom-id", "bathroom-id"]
    }
  ]
}
```

## 📝 Usage Scenarios

### Scenario 1: No Configuration File

- **Result:** All rooms shown in single grid (original behavior)
- **Use Case:** Single-floor homes or users who prefer no grouping

### Scenario 2: Empty Floors Array

```json
{
  "floors": []
}
```

- **Result:** All rooms under "Other" section
- **Use Case:** Temporarily disable grouping

### Scenario 3: Partial Room Assignment

```json
{
  "floors": [
    {
      "id": "main-house",
      "name": "Main House",
      "order": 1,
      "rooms": ["living-room-id", "kitchen-id"]
    }
  ]
}
```

- **Result:** Assigned rooms under "Main House", others under "Other"
- **Use Case:** Separate main house from garage/shed/etc.

## 🧪 Testing Checklist

- [ ] Config file loads without errors
- [ ] Floors display in correct order
- [ ] Floor headings show correct names
- [ ] Rooms appear under correct floors
- [ ] Unassigned rooms appear in "Other" section
- [ ] Works without config file (fallback to ungrouped)
- [ ] Room cards still display all controls correctly
- [ ] Device images still work
- [ ] Battery status still shows
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] No TypeScript errors

## 🐛 Common Issues

### Issue: Floors Not Showing

**Solution:**

1. Check file is at `frontend/public/floors.config.json`
2. Validate JSON syntax
3. Hard refresh browser (Ctrl+Shift+R)

### Issue: Room in Wrong Floor

**Solution:**

1. Verify room ID is correct (exact match)
2. Check room isn't in multiple floors
3. Re-run GraphQL query to get current room IDs

### Issue: Floor Order Wrong

**Solution:**

- Check `order` field values (lower numbers show first)
- Ensure each floor has unique order value

## 💡 Pro Tips

1. **Use Descriptive IDs:** `ground-floor` not `floor1`
2. **Start Order at 1:** Easier to add floors later (use 0 for basement)
3. **Keep IDs in kebab-case:** `first-floor` not `First Floor`
4. **Document Your IDs:** Keep a separate note mapping room names to IDs
5. **Backup Config:** Version control your `floors.config.json`

## 🔗 Integration with Other Features

### Works With Device Images

```
Ground Floor
┌──────────────────────────────┐
│ Living Room                  │
├──────────────────────────────┤
│ [📷] Sofa Light  [●] [≡≡≡]  │
│ [💡] Wall Light  [●] [≡≡≡]  │
└──────────────────────────────┘
```

### Works With Device Controls

All existing controls (on/off, brightness, color) work within floor groupings.

### Works With Quick Controls

Scene buttons and quick controls display correctly within grouped rooms.

### Works With Battery Status

Battery indicators still show in the battery section of each room card.

## 🚢 Deployment

### Development

```bash
# Just reload browser after editing floors.config.json
# No rebuild needed!
```

### Production

```bash
# Config is included in build automatically
npm run build
npm start
```

### Docker

```bash
# Mount custom config
docker run -v ./my-floors.json:/app/frontend/build/floors.config.json ...
```

## 📚 Full Documentation

See `FLOORS_CONFIGURATION.md` for complete documentation including:

- Detailed configuration options
- All methods to find room IDs
- Troubleshooting guide
- Advanced examples
- Type definitions
- API reference

## 🎉 Summary

You can now organize your rooms by floors with a simple JSON configuration file. The system:

- ✅ Loads configuration at runtime (no rebuild)
- ✅ Groups rooms under floor headings
- ✅ Maintains all existing functionality
- ✅ Falls back gracefully if no config
- ✅ Supports any number of floors
- ✅ Works with device images and controls

**Next Step:** Edit `frontend/public/floors.config.json` with your room IDs and reload the browser!
