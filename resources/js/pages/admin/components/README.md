# Admin Page Header Component

A reusable header component for all admin pages that provides consistent styling and layout.

## Usage

### Basic Usage

```tsx
import AdminPageHeader from '../components/AdminPageHeader';
import { Users } from 'lucide-react';

// In your component
<AdminPageHeader
    icon={Users}
    title="Participants Management"
    description="Manage and track participant progress"
/>
```

### With Actions

```tsx
import AdminPageHeader from '../components/AdminPageHeader';
import { Button } from '@/components/ui/button';
import { Download, Plus } from 'lucide-react';

<AdminPageHeader
    icon={Users}
    title="Participants Management"
    description="Manage and track participant progress"
    actions={
        <>
            <Button className="bg-[#fee819] text-[#212529] hover:bg-[#212529] hover:text-[#fee819]">
                <Download className="mr-2 h-4 w-4" />
                Export Data
            </Button>
            <Button className="bg-[#fee819] text-[#212529] hover:bg-[#212529] hover:text-[#fee819]">
                <Plus className="mr-2 h-4 w-4" />
                Add New
            </Button>
        </>
    }
/>
```

### Using Predefined Data

```tsx
import AdminPageHeader from '../components/AdminPageHeader';
import { getAdminPageHeader } from '../components/AdminPageHeaderData';

// Get predefined header data
const headerData = getAdminPageHeader('participants');

<AdminPageHeader
    icon={headerData.icon}
    title={headerData.title}
    description={headerData.description}
    actions={headerData.actions}
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `icon` | `LucideIcon` | Yes | The icon component to display |
| `title` | `string` | Yes | The main title text |
| `description` | `string` | Yes | The description text below the title |
| `actions` | `ReactNode` | No | Action buttons or elements to display on the right |
| `className` | `string` | No | Additional CSS classes |

## Available Predefined Headers

The `AdminPageHeaderData.ts` file contains predefined header configurations for common admin pages:

- `participants` - Participants Management
- `blogs` - Blogs
- `events` - Events Management
- `newsletter` - Newsletter Management
- `coworking` - Coworking
- `gallery` - Gallery
- `press` - Press
- `infosessions` - Info Sessions
- `contact` - Contact Us
- `projects` - Projects
- `settings` - Settings
- `dashboard` - Dashboard

## Styling

The component uses the following design system:
- Dark background: `bg-[#212529]`
- Yellow accent: `bg-[#fee819]`
- Responsive design with mobile-first approach
- Consistent spacing and typography

## Migration

To migrate existing admin pages:

1. Import the component:
   ```tsx
   import AdminPageHeader from '../components/AdminPageHeader';
   ```

2. Replace the existing header div with the component:
   ```tsx
   // Before
   <div className="bg-[#212529] py-8 text-white">
       <div className="mx-auto max-w-7xl px-6">
           <div className="flex items-center justify-between">
               {/* ... header content ... */}
           </div>
       </div>
   </div>

   // After
   <AdminPageHeader
       icon={YourIcon}
       title="Your Title"
       description="Your description"
       actions={yourActions}
   />
   ```

3. Remove the old header code and clean up any unused imports.
