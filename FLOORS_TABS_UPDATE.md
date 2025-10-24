# Floor Tabs Update

## Overview

Updated the Rooms page to use tabs for floor navigation instead of showing all floors at once. House-level scenes remain visible above the tabs.

## What Changed

### Visual Structure

**Before (Stacked Layout):**

```
House Scenes
[Morning] [Away]

Ground Floor
[Ground Scenes]
┌─────────┐ ┌─────────┐
│ Room 1  │ │ Room 2  │
└─────────┘ └─────────┘

First Floor
[First Scenes]
┌─────────┐ ┌─────────┐
│ Room 3  │ │ Room 4  │
└─────────┘ └─────────┘
```

**After (Tabbed Layout):**

```
House Scenes
[Morning] [Away]

[Ground Floor] [First Floor] [Other]
─────────────────────────────────────
[Ground Scenes]
┌─────────┐ ┌─────────┐
│ Room 1  │ │ Room 2  │
└─────────┘ └─────────┘
```

When "First Floor" tab is clicked:

```
House Scenes
[Morning] [Away]

[Ground Floor] [First Floor] [Other]
─────────────────────────────────────
[First Scenes]
┌─────────┐ ┌─────────┐
│ Room 3  │ │ Room 4  │
└─────────┘ └─────────┘
```

## Implementation Details

### File Modified

- **`frontend/src/components/Rooms.tsx`**

### Changes Made

1. **Added Tabs Import**

   ```typescript
   import { Tabs } from "antd";
   ```

2. **Added State for Active Tab**

   ```typescript
   const [activeFloorId, setActiveFloorId] = useState<string | null>(null);
   ```

3. **Auto-select First Floor**

   ```typescript
   React.useEffect(() => {
     if (groupedRooms && groupedRooms.size > 0 && !activeFloorId) {
       const firstFloorId = Array.from(groupedRooms.keys())[0];
       setActiveFloorId(firstFloorId);
     }
   }, [groupedRooms, activeFloorId]);
   ```

4. **Replaced Stacked Layout with Tabs**
   ```typescript
   <Tabs
     activeKey={activeFloorId || undefined}
     onChange={(key) => setActiveFloorId(key)}
     items={Array.from(groupedRooms.entries()).map(
       ([floorId, { floor, rooms: floorRooms }]) => ({
         key: floorId,
         label: floor ? floor.name : 'Other',
         children: (
           <>
             {floor && <Scenes scope="floor" scopeId={floor.id} />}
             <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
               {floorRooms.map((room) => renderRoomCard(room))}
             </Row>
           </>
         ),
       })
     )}
   />
   ```

## Features

✅ **House Scenes Always Visible** - Shown above tabs
✅ **Floor Scenes in Tabs** - Each tab shows its floor's scenes
✅ **One Floor at a Time** - Only active tab content is rendered
✅ **Auto-select First Floor** - First floor automatically selected on load
✅ **Persistent State** - Selected tab stays active during session
✅ **Backward Compatible** - Without floor config, no tabs shown

## Behavior

### With Floor Configuration

- Tabs appear for each floor
- House scenes always visible at top
- Selected tab shows floor scenes and rooms
- Click tab to switch floors

### Without Floor Configuration

- No tabs displayed
- All rooms shown in grid (original behavior)
- House scenes still visible at top

## Benefits

✅ **Cleaner Interface** - Less scrolling, focused view
✅ **Faster Navigation** - Click tab instead of scrolling
✅ **Better Organization** - Clear separation between floors
✅ **Reduced Clutter** - Only see one floor at a time
✅ **Mobile Friendly** - Tabs work well on mobile devices
✅ **Context Awareness** - Floor scenes only show for active floor

## User Experience

### Navigation Flow

1. Page loads showing house scenes
2. First floor tab automatically selected
3. Floor scenes for first floor shown
4. Rooms for first floor displayed
5. Click another tab to switch floors
6. Floor scenes and rooms update accordingly

### Tab Order

Tabs appear in the order defined in `floors.config.json` based on the `order` field:

```json
{
  "floors": [
    {
      "id": "ground-floor",
      "name": "Ground Floor",
      "order": 1 // Shows first
    },
    {
      "id": "first-floor",
      "name": "First Floor",
      "order": 2 // Shows second
    }
  ]
}
```

## Comparison

| Aspect           | Before (Stacked)   | After (Tabbed)      |
| ---------------- | ------------------ | ------------------- |
| **View**         | All floors at once | One floor at a time |
| **Navigation**   | Scroll down        | Click tabs          |
| **House Scenes** | At top             | At top (unchanged)  |
| **Floor Scenes** | With each floor    | In active tab       |
| **Screen Space** | More scrolling     | More compact        |
| **Mobile**       | Long scroll        | Easy tabs           |

## Testing

Test the following scenarios:

- [ ] Floor tabs appear when floor config exists
- [ ] House scenes always visible above tabs
- [ ] First floor auto-selected on load
- [ ] Clicking tabs switches floor content
- [ ] Floor scenes change with active tab
- [ ] Room scenes work within each tab
- [ ] Device controls work in all tabs
- [ ] Quick controls work in all tabs
- [ ] Battery status shows in all tabs
- [ ] No tabs when floor config missing
- [ ] All rooms show when no floor config

## Configuration

No configuration changes needed! Works with existing:

- `floors.config.json` - Controls which floors exist
- `scenes.config.json` - Controls which scenes appear where

## Future Enhancements

Potential improvements:

- Tab icons for floors
- Tab badges (device count, alert indicators)
- Swipe gestures for mobile
- Keyboard shortcuts (Ctrl+1, Ctrl+2, etc.)
- Remember last selected tab in localStorage
- Tab animation effects
