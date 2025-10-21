# Scene Scopes - Quick Start

## ✅ What Was Implemented

A runtime configuration system to organize scenes by scope:

- **House level** - Scenes for entire house (top of page)
- **Floor level** - Scenes for specific floors (under floor heading)
- **Room level** - Scenes for specific rooms (in room cards)

## 📁 Files Created/Modified

### New Files

- ✅ `frontend/src/useSceneScopes.ts` - Hook for scene scope management
- ✅ `frontend/public/scenes.config.json` - Configuration file
- ✅ `SCENES_CONFIGURATION.md` - Complete documentation
- ✅ `SCENES_QUICKSTART.md` - This file

### Modified Files

- ✅ `frontend/src/components/Scenes.tsx` - Updated to accept scope props
- ✅ `frontend/src/components/Rooms.tsx` - Added scenes at house/floor/room levels

## 🚀 How to Use

### Step 1: Get Scene IDs

Run this GraphQL query at `http://localhost:4000/graphql`:

```graphql
query {
  scenes {
    id
    name
  }
}
```

### Step 2: Edit Configuration

Open `frontend/public/scenes.config.json`:

```json
{
  "house": ["morning-scene-id", "away-scene-id"],

  "floors": {
    "ground-floor": ["ground-bright-scene-id"],
    "first-floor": ["first-night-scene-id"]
  },

  "rooms": {
    "living-room-id": ["cozy-scene-id", "party-scene-id"],
    "bedroom-id": ["sleep-scene-id"]
  }
}
```

### Step 3: Reload Browser

Just refresh - no rebuild needed! 🎉

## 📊 Visual Layout

### Without Configuration (Original)

```
[All Scenes Show Everywhere]

┌─────────────┐
│ Living Room │
└─────────────┘
```

### With Configuration (New)

```
House Scenes
[Morning] [Away]
                      ← Affects entire house

Ground Floor
[Ground Bright]       ← Affects ground floor
┌──────────────────────────┐
│ Living Room              │
├──────────────────────────┤
│ [Cozy] [Party]           │  ← Living room only
│ [Devices...]             │
└──────────────────────────┘

First Floor
[First Night]         ← Affects first floor
┌──────────────────────────┐
│ Bedroom                  │
├──────────────────────────┤
│ [Sleep]                  │  ← Bedroom only
│ [Devices...]             │
└──────────────────────────┘
```

## 🎯 Features

✅ **Three Scope Levels** - House, floor, room
✅ **Runtime Configuration** - Edit JSON, reload browser
✅ **Multi-scope Scenes** - Same scene can appear at multiple levels
✅ **Custom Order** - Scenes display in config array order
✅ **Auto-hide Empty** - Sections without scenes are hidden
✅ **Explicit Control** - Empty array `[]` means "show nothing"
✅ **Backward Compatible** - Without config, shows all scenes
✅ **Type-Safe** - Full TypeScript support
✅ **Graceful Fallback** - Missing/invalid config = show all scenes

## 🔧 Configuration Behavior

### No Configuration File

**Result:** All scenes show everywhere (backward compatible)

### Configuration File Exists

**Important:** Once config file exists, only configured scenes show:

- **Empty array `[]`** → Show NO scenes
- **Missing key** → Show NO scenes
- **Array with IDs** → Show ONLY those scenes

### Examples

**Example 1: Hide all scenes**

```json
{
  "house": [],
  "floors": {},
  "rooms": {}
}
```

Result: No scenes anywhere

**Example 2: House only**

```json
{
  "house": ["scene-1"],
  "floors": {},
  "rooms": {}
}
```

Result: Only house scenes show

**Example 3: Explicit empty room**

```json
{
  "house": ["scene-1"],
  "floors": {},
  "rooms": {
    "living-room-id": [] // Explicitly NO scenes
  }
}
```

Result:

- House shows "scene-1"
- Living room shows NO scenes (explicit)
- Other rooms show NO scenes (not configured)

## 🔧 Configuration Schema

```typescript
{
  "house": string[],              // Scene IDs for entire house
  "floors": {
    [floorId: string]: string[]   // Floor ID → Scene IDs
  },
  "rooms": {
    [roomId: string]: string[]    // Room ID → Scene IDs
  }
}
```

## 💡 Common Scenarios

### Scenario 1: House-wide Scenes Only

```json
{
  "house": ["morning", "evening", "away"],
  "floors": {},
  "rooms": {}
}
```

**Result:** Scenes appear at top only. Floors and rooms show NO scenes.

### Scenario 2: Room-specific Only

```json
{
  "house": [],
  "floors": {},
  "rooms": {
    "living-room-id": ["cozy", "bright"],
    "bedroom-id": ["sleep", "reading"]
  }
}
```

**Result:**

- House shows NO scenes
- Living room shows "cozy" and "bright"
- Bedroom shows "sleep" and "reading"
- Other rooms show NO scenes

### Scenario 3: Multi-level Scene

```json
{
  "house": ["party-mode"],
  "floors": {
    "ground-floor": ["party-mode"]
  },
  "rooms": {
    "living-room-id": ["party-mode"]
  }
}
```

**Result:** "Party Mode" appears at house level, ground floor, and living room. Other floors/rooms show NO scenes.

### Scenario 4: No Configuration

No `scenes.config.json` file exists.

**Result:** All scenes show everywhere (original behavior - backward compatible)

### Scenario 5: Hide Scenes for Specific Room

```json
{
  "house": ["morning"],
  "floors": {},
  "rooms": {
    "bathroom-id": [] // Explicitly empty = no scenes
  }
}
```

**Result:**

- House shows "morning"
- Bathroom shows NO scenes (explicit)
- Other rooms show NO scenes (not configured)

## 🧩 How Scopes Work

### House Scope

- **Location:** Top of the page
- **Purpose:** Scenes affecting entire house
- **Examples:** "Good Morning", "Away Mode", "Movie Time"
- **Visibility:** Always visible when configured

### Floor Scope

- **Location:** Under floor heading
- **Purpose:** Scenes affecting entire floor
- **Examples:** "Ground Floor Bright", "Upstairs Dim"
- **Visibility:** Only when floor grouping is enabled

### Room Scope

- **Location:** Inside room card
- **Purpose:** Scenes affecting single room
- **Examples:** "Living Room Cozy", "Bedroom Sleep"
- **Visibility:** Always visible in room cards

## 📝 Finding IDs

### Scene IDs

```graphql
query {
  scenes {
    id
    name
  }
}
```

### Room IDs

```graphql
query {
  rooms {
    id
    name
  }
}
```

### Floor IDs

Check your `floors.config.json` - use the `id` field values.

## 🧪 Testing Checklist

- [ ] Config file loads without errors
- [ ] House scenes appear at top
- [ ] Floor scenes appear under floor headings
- [ ] Room scenes appear in room cards
- [ ] Empty sections are hidden
- [ ] Works without config file
- [ ] Multi-scope scenes work correctly
- [ ] Scene buttons activate correctly
- [ ] No console errors
- [ ] Responsive on mobile

## 🐛 Troubleshooting

### Issue: All Scenes Everywhere

**Cause:** No config file or empty configuration
**Solution:** Create `scenes.config.json` with your scene mappings

### Issue: Scenes Not Showing

**Solutions:**

1. Check file location: `frontend/public/scenes.config.json`
2. Validate JSON syntax
3. Verify scene IDs are correct (exact match)
4. Hard refresh: Ctrl+Shift+R

### Issue: Wrong Scenes in Room

**Solution:**

1. Verify room ID matches GraphQL query
2. Check `rooms` object in config
3. Ensure scene IDs are in correct array

### Issue: Floor Scenes Not Showing

**Solution:**

1. Ensure floor grouping is enabled (`floors.config.json`)
2. Verify floor IDs match
3. Check `floors` object in config

## 💡 Pro Tips

1. **Start Simple:** Configure house scenes first, then add floor/room
2. **Use Descriptive Names:** Name scenes clearly (e.g., "Morning Routine" not "Scene1")
3. **Order Matters:** Arrange scenes by frequency of use or time of day
4. **Test Incrementally:** Add one scope at a time and test
5. **Document IDs:** Keep a note mapping scene names to IDs
6. **Backup Config:** Version control your config files
7. **Multi-scope Strategic:** Use for scenes that affect multiple areas
8. **Logical Grouping:** Keep related scenes together in the array

## 🎨 Example Configurations

### Example 1: Simple Home

```json
{
  "house": ["morning-routine-id", "away-mode-id", "goodnight-id"],
  "floors": {},
  "rooms": {
    "living-room-id": ["movie-time-id"],
    "bedroom-id": ["sleep-mode-id", "reading-light-id"]
  }
}
```

### Example 2: Multi-story House

```json
{
  "house": ["all-off-id", "all-on-id"],
  "floors": {
    "ground-floor": ["ground-evening-id"],
    "first-floor": ["first-night-id"],
    "basement": ["basement-dim-id"]
  },
  "rooms": {}
}
```

### Example 3: Detailed Setup

```json
{
  "house": [
    "morning-id", // First (most used in morning)
    "day-id", // Second
    "evening-id", // Third
    "night-id", // Fourth
    "away-id" // Last (less frequent)
  ],
  "floors": {
    "ground-floor": [
      "ground-bright-id", // First
      "ground-dim-id" // Second
    ],
    "first-floor": [
      "upstairs-active-id", // First
      "upstairs-sleep-id" // Second
    ]
  },
  "rooms": {
    "living-room-id": [
      "living-relax-id", // First (most common)
      "living-party-id", // Second
      "living-movie-id" // Third
    ],
    "kitchen-id": [
      "kitchen-cooking-id", // First
      "kitchen-dining-id" // Second
    ],
    "bedroom-id": [
      "bedroom-wake-id", // First (morning)
      "bedroom-reading-id", // Second (evening)
      "bedroom-sleep-id" // Third (night)
    ],
    "office-id": [
      "office-focus-id", // First
      "office-break-id" // Second
    ]
  }
}
```

**Note:** Scenes display in the order specified in the arrays.

## 🔗 Integration

### Works With Floor Grouping

Floor scenes appear under floor headings when floor grouping is configured.

### Works Without Floor Grouping

House and room scenes work even without floor configuration.

### Works With Device Images

Scenes appear above device controls in room cards.

### Works With Quick Controls

Scene buttons use same style as quick control buttons.

## 🚢 Deployment

### Development

```bash
# Edit scenes.config.json
# Reload browser - done!
```

### Production

```bash
npm run build
npm start
# Config is included automatically
```

### Docker

```bash
docker run -v ./my-scenes.json:/app/frontend/build/scenes.config.json ...
```

## 📚 Full Documentation

See `SCENES_CONFIGURATION.md` for:

- Detailed configuration options
- All methods to find IDs
- Advanced examples
- Troubleshooting guide
- Type definitions
- Complete API reference

## 🎉 Summary

You can now organize scenes by scope with a simple JSON configuration:

- ✅ House-level scenes at the top
- ✅ Floor-level scenes under floor headings
- ✅ Room-level scenes in room cards
- ✅ Runtime configuration (no rebuild)
- ✅ Backward compatible
- ✅ Scenes can be in multiple scopes

**Next Step:** Get your scene IDs, edit `scenes.config.json`, and reload!
