# Implementation Plan - Fix Announcements Rendering

The goal is to ensure that announcements published by the admin are correctly displayed on the customer-facing pages and to remove the "Previous Updates" section as requested.

## Proposed Changes

### Frontend

#### 1. Update `src/pages/announcements/index.jsx`
- Replace `mockAnnouncements` with data from the Redux store (`announcementSlice`).
- Dispatch `fetchAnnouncements` on mount.
- Remove the "Previous Updates" / "History" grid if that's what the user meant by "remove it".
- Map backend data fields (like `image`) to the component's expected fields (if they differ).

#### 2. Update `src/homepage/components/Announcementpreview.jsx` (if applicable)
- The user mentioned "i dont want the previous updates to be stored and dont want to be updated in the main so remove it". This might refer to this component. I will check if it should be removed or modified.

#### 3. Update `src/pages/admin/AnnouncementsPage.jsx`
- Ensure it's correctly publishing and triggering refreshes. (It seems to be doing this already, but I'll double-check).

#### 4. Check Homepage Hero
- Verify if the homepage hero section uses announcements and ensure it's linked to the backend data.

### Backend
- The backend already seems to have the necessary routes and model.

## Verification Plan

### Automated Tests
- N/A (Manual verification via browser as this is a UI/Data flow issue)

### Manual Verification
1. Log in to Admin Panel.
2. Go to Announcements Page.
3. Publish a new announcement with an image.
4. Navigate to the main Announcements page and Homepage.
5. Verify the new announcement is visible.
6. Verify "Previous Updates" are gone if that was the intent.
