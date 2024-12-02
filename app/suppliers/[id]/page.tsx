import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupplierDetailPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the supplier details based on the ID
  const supplier = {
    id: params.id,
    name: "Sample Supplier",
    email: "contact@samplesupplier.com",
    phone: "+1 234 567 8900",
    address: "123 Sample St, Sample City, SA 12345",
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Supplier Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>{supplier.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2"><strong>ID:</strong> {supplier.id}</p>
          <p className="mb-2"><strong>Email:</strong> {supplier.email}</p>
          <p className="mb-2"><strong>Phone:</strong> {supplier.phone}</p>
          <p className="mb-4"><strong>Address:</strong> {supplier.address}</p>
          <div className="flex space-x-4">
            <Button>Edit Supplier</Button>
            <Button variant="outline">View Certificates</Button>
            <Button variant="outline">View Contracts</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

