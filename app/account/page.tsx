import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <form className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" defaultValue="Acme Inc." />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </TabsContent>
        <TabsContent value="security">
          <form className="space-y-4 mt-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button type="submit">Update Password</Button>
          </form>
        </TabsContent>
        <TabsContent value="notifications">
          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <Input type="checkbox" className="toggle" />
            </div>
            <div className="flex items-center justify-between">
              <span>SMS Notifications</span>
              <Input type="checkbox" className="toggle" />
            </div>
            <div className="flex items-center justify-between">
              <span>Push Notifications</span>
              <Input type="checkbox" className="toggle" />
            </div>
            <Button>Save Preferences</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

