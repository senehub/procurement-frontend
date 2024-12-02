import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function VendorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Vendor Portal</h1>
      <Tabs defaultValue="opportunities" className="w-full">
        <TabsList>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="bids">My Bids</TabsTrigger>
          <TabsTrigger value="profile">Company Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="opportunities">
          <div className="space-y-4">
            <Input placeholder="Search opportunities..." className="mb-4" />
            <Card>
              <CardHeader>
                <CardTitle>Office Supplies RFQ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Due: July 15, 2023</p>
                <p className="mb-4">Estimated value: $10,000 - $15,000</p>
                <Button>View Details</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>IT Equipment Tender</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Due: August 1, 2023</p>
                <p className="mb-4">Estimated value: $50,000 - $75,000</p>
                <Button>View Details</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="bids">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Office Supplies RFQ Bid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Submitted: June 30, 2023</p>
                <p className="mb-4">Status: Under Review</p>
                <Button>View Bid Details</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Marketing Services Proposal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Submitted: June 15, 2023</p>
                <p className="mb-4">Status: Accepted</p>
                <Button>View Proposal Details</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="ABC Supplies Inc." />
                </div>
                <div>
                  <Label htmlFor="contact-person">Contact Person</Label>
                  <Input id="contact-person" defaultValue="Jane Smith" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="jane@abcsupplies.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="categories">Product/Service Categories</Label>
                  <Input id="categories" defaultValue="Office Supplies, IT Equipment" />
                </div>
                <Button type="submit">Update Profile</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

