import PageContent from "@/components/page-content"
import PageHeader from "@/components/page-header"
import PageLayout from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RequisitionDetailPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the requisition details based on the ID
  const requisition = {
    id: params.id,
    title: "Office Supplies Requisition",
    status: "Pending Approval",
    requestedBy: "John Doe",
    department: "Marketing",
    date: "2023-07-01",
    items: [
      { name: "Printer Paper", quantity: 10, unitPrice: 5 },
      { name: "Ink Cartridges", quantity: 5, unitPrice: 25 },
    ],
  }

  const total = requisition.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)

  return (
    <PageLayout>
      <PageHeader heading="Requisition Details"/>
      <PageContent>

        <Card>
          <CardHeader>
            <CardTitle>{requisition.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2"><strong>ID:</strong> {requisition.id}</p>
            <p className="mb-2"><strong>Status:</strong> {requisition.status}</p>
            <p className="mb-2"><strong>Requested By:</strong> {requisition.requestedBy}</p>
            <p className="mb-2"><strong>Department:</strong> {requisition.department}</p>
            <p className="mb-4"><strong>Date:</strong> {requisition.date}</p>
            <h3 className="text-xl font-semibold mb-2">Items</h3>
            <ul className="list-disc pl-5 mb-4">
              {requisition.items.map((item, index) => (
                <li key={index}>
                  {item.name} - Quantity: {item.quantity}, Unit Price: ${item.unitPrice}
                </li>
              ))}
            </ul>
            <p className="font-bold mb-4">Total: ${total}</p>
            <div className="flex space-x-4">
              <Button>Approve</Button>
              <Button variant="outline">Reject</Button>
              <Button variant="outline">Edit</Button>
            </div>
          </CardContent>
        </Card>
      </PageContent>
    </PageLayout>
  )
}

