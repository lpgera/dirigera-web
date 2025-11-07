# Scene Scopes Configuration Guide

## Overview

The scene scopes feature allows you to configure which scenes appear at different levels of your home:

- **House level** - Scenes that affect the entire house (e.g., "Good Morning", "Movie Time")
- **Floor level** - Scenes specific to a floor (e.g., "Ground Floor Bright", "Upstairs Night")
- **Room level** - Scenes specific to a room (e.g., "Living Room Cozy", "Bedroom Sleep")

## Configuration File

### Location

```
frontend/public/scenes.config.json
```

### Format

```json
{
  "_comment": "Configure which scenes are associated with the house, floors, or rooms",

  "house": ["scene-id-1", "scene-id-2"],

  "floors": {
    "floor-id-1": ["scene-id-3", "scene-id-4"],
    "floor-id-2": ["scene-id-5"]
  },

  "rooms": {
    "room-id-1": ["scene-id-6", "scene-id-7"],
    "room-id-2": ["scene-id-8"]
  }
}
```

### Field Descriptions

- **`house`** (array): Scene IDs that appear at the top of the home page (entire house)
- **`floors`** (object): Floor ID → array of scene IDs for that floor
- **`rooms`** (object): Room ID → array of scene IDs for that room

**Important Notes:**

- Scenes can appear in multiple scopes
- **Scene order matters** - Scenes are displayed in the order they appear in the config array
- Empty array `[]` explicitly means "show no scenes"

## How to Find Scene IDs

### Method 1: GraphQL Query

Navigate to `http://your-server:4000/graphql` and run:

```graphql
query {
  scenes {
    id
    name
  }
}
```

Copy the scene IDs from the response.

### Method 2: Browser Console

1. Open the web app
2. Open DevTools (F12)
3. Go to Console tab
4. Type: `localStorage.getItem('apollo-cache-persist')`
5. Search for scene IDs in the output

### Method 3: Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Reload the page
4. Find the GraphQL `Scenes` query
5. Inspect the response for scene IDs

## How to Find Floor and Room IDs

Use the same GraphQL query as before:

```graphql
query {
  rooms {
    id
    name
  }
}
```

For floor IDs, check your `floors.config.json` file - use the `id` field values.

## Setup Instructions

### Step 1: Get Scene IDs

Run the GraphQL query above to get all your scene IDs.

### Step 2: Categorize Your Scenes

Decide which scenes should appear where:

- **House-wide scenes**: Affect multiple rooms/entire house
- **Floor-specific scenes**: Only relevant to one floor
- **Room-specific scenes**: Only affect a single room

### Step 3: Create Configuration

Create or edit `frontend/public/scenes.config.json`:

```json
{
  "house": [
    "morning-routine-scene-id",
    "movie-time-scene-id",
    "away-mode-scene-id"
  ],

  "floors": {
    "ground-floor": [
      "ground-floor-bright-scene-id",
      "ground-floor-dim-scene-id"
    ],
    "first-floor": ["first-floor-night-scene-id"]
  },

  "rooms": {
    "living-room-id": [
      "living-room-cozy-scene-id",
      "living-room-party-scene-id"
    ],
    "bedroom-id": ["bedroom-sleep-scene-id", "bedroom-reading-scene-id"]
  }
}
```

### Step 4: Reload Browser

Simply refresh - no rebuild needed! The configuration is loaded at runtime.

## Visual Examples

### Without Configuration

All scenes show everywhere (original behavior):

```
[Scene 1] [Scene 2] [Scene 3] [Scene 4]

Ground Floor
┌─────────────┐ ┌─────────────┐
│ Living Room │ │ Kitchen     │
└─────────────┘ └─────────────┘
```

### With Configuration

Scenes appear at appropriate levels:

```
House Scenes
[Morning] [Movie Time] [Away]

Ground Floor
[Ground Bright] [Ground Dim]

┌───────────────────────────────┐
│ Living Room                   │
├───────────────────────────────┤
│ [Cozy] [Party]                │  ← Room scenes
│ [Sofa Light] [Table Light]    │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Kitchen                       │
├───────────────────────────────┤
│ [Devices...]                  │
└───────────────────────────────┘

First Floor
[Night Mode]

┌───────────────────────────────┐
│ Bedroom                       │
├───────────────────────────────┤
│ [Sleep] [Reading]             │  ← Room scenes
│ [Devices...]                  │
└───────────────────────────────┘
```

## Advanced Examples

### Example 1: Multi-level Scene

A scene can appear at multiple levels:

```json
{
  "house": ["relax-scene-id"],
  "rooms": {
    "living-room-id": ["relax-scene-id"],
    "bedroom-id": ["relax-scene-id"]
  }
}
```

The "Relax" scene will appear:

- At the top (house level)
- In the Living Room card
- In the Bedroom card

### Example 2: Floor-wide and Room-specific

```json
{
  "floors": {
    "ground-floor": ["ground-all-off-scene-id", "ground-all-on-scene-id"]
  },
  "rooms": {
    "living-room-id": ["living-cozy-scene-id", "living-bright-scene-id"],
    "kitchen-id": ["kitchen-cooking-scene-id"]
  }
}
```

Result:

- Ground Floor section shows "All Off" and "All On" scenes
- Living Room card shows "Cozy" and "Bright" scenes
- Kitchen card shows "Cooking" scene

### Example 3: Empty Configuration

```json
{
  "house": [],
  "floors": {},
  "rooms": {}
}
```

Result: No scenes will be displayed anywhere. Useful if you want to hide all scenes temporarily.

### Example 4: House-only Scenes

```json
{
  "house": ["morning-scene-id", "evening-scene-id", "night-scene-id"],
  "floors": {},
  "rooms": {}
}
```

Result: Scenes only appear at the top (house level), not in floor or room sections.

## Behavior

### With Configuration File

- ✅ Scenes filtered by scope
- ✅ House scenes at top
- ✅ Floor scenes under floor headings
- ✅ Room scenes in room cards
- ✅ Empty sections hidden automatically

**Important:** Once a configuration file exists:

- Empty array `[]` = Show NO scenes for that scope
- Missing key = Show NO scenes for that scope
- Array with IDs = Show ONLY those scenes

### Without Configuration File

- ✅ All scenes show everywhere (original behavior)
- ✅ Backward compatible with existing setups

### Empty Arrays/Objects Examples

```json
{
  "house": [], // NO house scenes (explicitly empty)
  "floors": {}, // NO floor scenes for any floor
  "rooms": {} // NO room scenes for any room
}
```

Result: No scenes displayed anywhere

```json
{
  "house": ["scene-1"],
  "floors": {},
  "rooms": {
    "room-1": [] // NO scenes for room-1 (explicitly empty)
  }
}
```

Result:

- House shows "scene-1"
- No floor scenes
- Room-1 shows NO scenes (even though it's in config)
- Other rooms show NO scenes (not in config)

## Placement

### House Level

- Appears at the very top of the page
- Above all floor sections
- Affects entire house

### Floor Level

- Appears below the floor heading
- Above room cards in that floor
- Only when floors are configured

### Room Level

- Appears inside the room card
- Above device controls and quick controls
- Specific to that room

## Integration with Other Features

### Works with Floor Grouping

```
House Scenes
[Morning] [Away]

Ground Floor
[Ground Bright] [Ground Dim]

┌─────────────┐ ┌─────────────┐
│ Room 1      │ │ Room 2      │
│ [Scene A]   │ │ [Scene B]   │
└─────────────┘ └─────────────┘
```

### Works Without Floor Grouping

```
House Scenes
[Morning] [Away]

┌─────────────┐ ┌─────────────┐
│ Room 1      │ │ Room 2      │
│ [Scene A]   │ │ [Scene B]   │
└─────────────┘ └─────────────┘
```

### Works with Device Images & Controls

Room scenes appear above device controls in each room card.

## Troubleshooting

### Scenes Not Showing

1. **Check file location**: Must be `frontend/public/scenes.config.json`
2. **Check JSON syntax**: Use a JSON validator
3. **Check scene IDs**: Must match exactly (case-sensitive)
4. **Check browser console**: Look for loading errors
5. **Hard refresh**: Ctrl+Shift+R (or Cmd+Shift+R on Mac)

### Scene in Wrong Place

1. **Verify scene ID**: Use GraphQL query to confirm
2. **Check scope**: Ensure scene ID is in correct array/object
3. **Check spelling**: IDs are case-sensitive

### All Scenes Showing Everywhere

- This is expected if no `scenes.config.json` file exists
- To filter scenes, create the config file with your desired scopes

### Floor/Room Scenes Not Showing

1. **Check floor/room IDs**: Must match IDs from `floors.config.json` or GraphQL
2. **Ensure floor grouping is enabled**: Floor scenes only show with floor grouping
3. **Check empty arrays**: Empty array = no scenes

## Best Practices

### Organization Tips

1. **House scenes**: General modes (morning, night, away, party)
2. **Floor scenes**: Floor-wide lighting/climate control
3. **Room scenes**: Room-specific ambiance and activities

### Scene Ordering

**The order in the config file determines display order:**

```json
{
  "house": [
    "morning-id", // Shows first
    "day-id", // Shows second
    "evening-id", // Shows third
    "night-id" // Shows fourth
  ]
}
```

Arrange scenes by:

- **Frequency of use** (most used first)
- **Time of day** (morning → evening → night)
- **Priority** (important scenes first)
- **Logical flow** (related scenes together)

### Naming Conventions

Use clear, descriptive scene names:

- ✅ "Morning Routine", "Movie Time", "Bedtime"
- ❌ "Scene 1", "Test", "Lights"

### Configuration Management

1. **Document your IDs**: Keep a separate note mapping names to IDs
2. **Version control**: Commit `scenes.config.json` to git
3. **Backup**: Keep a backup copy before making changes
4. **Test changes**: Reload and verify after editing

### Performance

- Scene configuration is loaded once at app start
- Minimal performance impact
- No additional GraphQL queries

## Production Deployment

### Docker

Mount custom configuration:

```bash
docker run -v ./my-scenes.json:/app/frontend/build/scenes.config.json ...
```

### Build Process

The config file is automatically included in the build:

```bash
npm run build
# scenes.config.json is copied to build output
```

## Implementation Details

### Files Created

- **`frontend/src/useSceneScopes.ts`** - Hook for scene scope management
- **`frontend/public/scenes.config.json`** - Configuration file

### Files Modified

- **`frontend/src/components/Scenes.tsx`** - Updated to accept scope props
- **`frontend/src/components/Rooms.tsx`** - Added scene components at different levels

### Props API

```typescript
<Scenes
  scope="house" | "floor" | "room"
  scopeId="floor-id-or-room-id"  // Required for floor/room scope
  title="Optional Title"
/>
```

### Hook API

```typescript
const {
  config, // Raw configuration object
  isLoading, // Loading state
  error, // Error if loading fails
  hasAnyScenes, // Boolean - true if any scenes configured
  getHouseScenes, // () => string[]
  getFloorScenes, // (floorId) => string[]
  getRoomScenes, // (roomId) => string[]
  filterScenes, // (scenes, allowedIds) => filtered scenes
} = useSceneScopes();
```

## Benefits

✅ **Better Organization** - Scenes appear where relevant
✅ **Reduced Clutter** - Only show applicable scenes
✅ **Better UX** - Users find scenes faster
✅ **Runtime Config** - No rebuild needed
✅ **Flexible** - Scenes can be in multiple scopes
✅ **Backward Compatible** - Works without config file
✅ **Type-Safe** - Full TypeScript support

## Future Enhancements

Potential improvements:

- Scene icons
- Scene categories/groups
- Favorite scenes
- Recent scenes
- Scene scheduling
- Scene activation history
