import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ContractsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contracts</h1>
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Contracts</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="archive">Archive</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Office Supplies Contract</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Supplier: ABC Office Supplies</p>
                <p className="mb-4">Expires: December 31, 2023</p>
                <Button>View Details</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>IT Support Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Supplier: TechPro Solutions</p>
                <p className="mb-4">Expires: March 15, 2024</p>
                <Button>View Details</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Contract</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="contract-title">Contract Title</Label>
                  <Input id="contract-title" placeholder="Enter contract title" />
                </div>
                <div>
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input id="supplier" placeholder="Enter supplier name" />
                </div>
                <div>
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div>
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
                <div>
                  <Label htmlFor="contract-value">Contract Value</Label>
                  <Input id="contract-value" type="number" placeholder="Enter contract value" />
                </div>
                <Button type="submit">Create Contract</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="archive">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cleaning Services Contract</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Supplier: CleanCo</p>
                <p className="mb-4">Expired: May 31, 2023</p>
                <Button>View Details</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Marketing Campaign Contract</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Supplier: AdGenius Inc.</p>
                <p className="mb-4">Expired: February 28, 2023</p>
                <Button>View Details</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

