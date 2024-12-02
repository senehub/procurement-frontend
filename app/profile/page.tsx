import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";
import PageLayout from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  return (
    <PageLayout>
      <PageHeader heading="User Profile" />
      <PageContent>
        <Tabs defaultValue="info" className="w-full">
          <TabsList>
            <TabsTrigger value="info">Personal Information</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" defaultValue="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input id="job-title" defaultValue="Procurement Manager" />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue="Supply Chain" />
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>User Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="language">Preferred Language</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        {["English", "Spanish", "French", "Deutsch"].map(
                          (lang) => (
                            <SelectItem key={lang} value={lang.toLowerCase()}>
                              {lang}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "UTC-5 (Eastern Time)",
                          "UTC-6 (Central Time)",
                          "UTC-7 (Mountain Time)",
                          "UTC-8 (Pacific Time)",
                        ].map((lang) => (
                          <SelectItem key={lang} value={lang.toLowerCase()}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="bg-red-400">
                    <div className="flex items-center gap-2 space-x-2">
                      <div className="">
                        <Input type="checkbox" id="notifications" />
                      </div>
                      <Label htmlFor="notifications">
                        Receive email notifications
                      </Label>
                    </div>
                  </div>
                  <Button type="submit">Save Preferences</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <span>Created new RFQ for office supplies</span>
                    <span className="text-muted-foreground">2 hours ago</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Approved supplier invoice #1234</span>
                    <span className="text-muted-foreground">1 day ago</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Updated contract terms for Supplier XYZ</span>
                    <span className="text-muted-foreground">3 days ago</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Completed supplier performance review</span>
                    <span className="text-muted-foreground">1 week ago</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PageContent>
    </PageLayout>
  );
}
