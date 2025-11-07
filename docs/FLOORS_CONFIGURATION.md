# Floor Configuration Guide

## Overview

The floor configuration feature allows you to group rooms by floors (e.g., Ground Floor, First Floor, Basement) for better organization in the Rooms overview page.

## Configuration File

### Location

```
frontend/public/floors.config.json
```

### Format

```json
{
  "_comment": "Configure floor groupings for rooms",
  "_instructions": "Add room IDs to floor arrays. Rooms not listed will appear in 'Other' section.",

  "floors": [
    {
      "id": "ground-floor",
      "name": "Ground Floor",
      "order": 1,
      "rooms": ["room-id-1", "room-id-2", "room-id-3"]
    },
    {
      "id": "first-floor",
      "name": "First Floor",
      "order": 2,
      "rooms": ["room-id-4", "room-id-5"]
    }
  ]
}
```

### Field Descriptions

- **`id`** (string, required): Unique identifier for the floor (use kebab-case)
- **`name`** (string, required): Display name shown in the UI (e.g., "Ground Floor")
- **`order`** (number, required): Sort order (lower numbers appear first)
- **`rooms`** (array, required): Array of room IDs belonging to this floor

## How to Find Room IDs

### Method 1: GraphQL Query

1. Navigate to `http://your-server:4000/graphql`
2. Run this query:

```graphql
query {
  rooms {
    id
    name
  }
}
```

3. Copy the room IDs from the response

### Method 2: Browser DevTools

1. Open the web app
2. Open DevTools (F12)
3. Go to Console tab
4. Type: `localStorage.getItem('apollo-cache-persist')`
5. Search for room IDs in the output

### Method 3: Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Reload the rooms page
4. Find the GraphQL request
5. Inspect the response for room IDs

## Setup Instructions

### Step 1: Create Configuration File

Create or edit `frontend/public/floors.config.json`:

```json
{
  "floors": [
    {
      "id": "ground-floor",
      "name": "Ground Floor",
      "order": 1,
      "rooms": []
    }
  ]
}
```

### Step 2: Get Your Room IDs

Use one of the methods above to find your room IDs.

### Step 3: Add Room IDs to Floors

```json
{
  "floors": [
    {
      "id": "ground-floor",
      "name": "Ground Floor",
      "order": 1,
      "rooms": [
        "12345678-1234-1234-1234-123456789abc",
        "87654321-4321-4321-4321-cba987654321"
      ]
    },
    {
      "id": "first-floor",
      "name": "First Floor",
      "order": 2,
      "rooms": ["abcdef12-3456-7890-abcd-ef1234567890"]
    }
  ]
}
```

### Step 4: Reload the Application

Simply refresh your browser - no rebuild required! The configuration is loaded at runtime.

## Visual Example

### Without Floor Grouping

```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Living Room │ │ Kitchen     │ │ Bedroom     │
└─────────────┘ └─────────────┘ └─────────────┘
┌─────────────┐ ┌─────────────┐
│ Bathroom    │ │ Office      │
└─────────────┘ └─────────────┘
```

### With Floor Grouping

```
Ground Floor
┌─────────────┐ ┌─────────────┐
│ Living Room │ │ Kitchen     │
└─────────────┘ └─────────────┘

First Floor
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Bedroom     │ │ Bathroom    │ │ Office      │
└─────────────┘ └─────────────┘ └─────────────┘
```

## Advanced Configuration

### Multiple Floors Example

```json
{
  "floors": [
    {
      "id": "basement",
      "name": "Basement",
      "order": 0,
      "rooms": ["basement-storage", "basement-gym"]
    },
    {
      "id": "ground-floor",
      "name": "Ground Floor",
      "order": 1,
      "rooms": ["living-room", "kitchen", "dining-room"]
    },
    {
      "id": "first-floor",
      "name": "First Floor",
      "order": 2,
      "rooms": ["master-bedroom", "bedroom-2", "bathroom"]
    },
    {
      "id": "attic",
      "name": "Attic",
      "order": 3,
      "rooms": ["attic-storage"]
    }
  ]
}
```

### Custom Floor Names

You can use any naming convention:

```json
{
  "floors": [
    {
      "id": "level-1",
      "name": "Level 1",
      "order": 1,
      "rooms": [...]
    },
    {
      "id": "level-2",
      "name": "Level 2",
      "order": 2,
      "rooms": [...]
    }
  ]
}
```

Or localized names:

```json
{
  "floors": [
    {
      "id": "erdgeschoss",
      "name": "Erdgeschoss",
      "order": 1,
      "rooms": [...]
    },
    {
      "id": "obergeschoss",
      "name": "Obergeschoss",
      "order": 2,
      "rooms": [...]
    }
  ]
}
```

### Unassigned Rooms

Rooms not listed in any floor will appear under an "Other" section at the end.

```json
{
  "floors": [
    {
      "id": "main-house",
      "name": "Main House",
      "order": 1,
      "rooms": ["living-room", "kitchen"]
    }
  ]
}
```

If you have a "Garage" room not listed, it will appear under "Other".

## Behavior

### With Configuration File

- ✅ Rooms grouped by floor
- ✅ Floors sorted by `order` field
- ✅ Floor names shown as headings
- ✅ Unassigned rooms in "Other" section

### Without Configuration File

- ✅ All rooms shown in a single grid (no grouping)
- ✅ No floor headings displayed
- ✅ Original layout behavior

### Empty Configuration

If `floors.config.json` exists but `floors` array is empty:

- ✅ All rooms shown in "Other" section

## Troubleshooting

### Floors Not Showing

1. **Check file location**: Must be in `frontend/public/floors.config.json`
2. **Check JSON syntax**: Use a JSON validator
3. **Check browser console**: Look for loading errors
4. **Hard refresh**: Ctrl+Shift+R (or Cmd+Shift+R on Mac)

### Room Appears in Wrong Floor

1. **Check room ID**: Ensure exact match (case-sensitive)
2. **Check for duplicates**: Room can only be in one floor
3. **View current room IDs**: Use GraphQL query to verify

### Floor Order Wrong

- Check the `order` field - lower numbers appear first
- Ensure all floors have different order values

### "Other" Section Always Shows

- This is expected if you have rooms not assigned to any floor
- To hide it, assign all rooms to floors

## Integration with Device Images

Floor grouping works seamlessly with device images:

```
Ground Floor

┌──────────────────────────────┐
│ Living Room                  │
├──────────────────────────────┤
│ [📷] Sofa Light  [●] [≡≡≡]  │
│ [📷] Table Light [○] [≡≡≡]  │
└──────────────────────────────┘

First Floor

┌──────────────────────────────┐
│ Bedroom                      │
├──────────────────────────────┤
│ [💡] Ceiling Light [●] [≡≡≡] │
└──────────────────────────────┘
```

## Production Deployment

### Docker

Mount your custom configuration:

```bash
docker run -v ./my-floors.json:/app/frontend/build/floors.config.json ...
```

### Build Process

The config file is automatically copied during build:

```bash
npm run build
# floors.config.json is included in build output
```

## Implementation Details

### Files Created

- **`frontend/src/useFloors.ts`** - React hook for loading floor config
- **`frontend/public/floors.config.json`** - Configuration file

### Files Modified

- **`frontend/src/components/Rooms.tsx`** - Updated to group rooms by floor

### Hook API

```typescript
const {
  floors, // Array of floor configurations
  isLoading, // Loading state
  error, // Error if loading fails
  hasFloors, // Boolean - true if floors configured
  getFloorForRoom, // Function to get floor for room ID
  groupRoomsByFloor, // Function to group array of rooms
} = useFloors();
```

### Type Definitions

```typescript
interface Floor {
  id: string;
  name: string;
  order: number;
  rooms: string[];
}
```

## Benefits

✅ **Better Organization** - Group related rooms together
✅ **Visual Hierarchy** - Clear floor headings
✅ **Runtime Configuration** - No rebuild needed
✅ **Flexible** - Any number of floors, any names
✅ **Graceful Fallback** - Works without config file
✅ **Type-Safe** - Full TypeScript support

## Future Enhancements

Potential improvements:

- Collapsible floor sections
- Floor icons or images
- Drag-and-drop room reordering
- Import/export configuration
- Visual floor editor
