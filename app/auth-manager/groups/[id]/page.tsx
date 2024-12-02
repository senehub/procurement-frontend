import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GroupDetailPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the group details based on the ID
  const group = {
    id: params.id,
    name: "Sample Group",
    description: "This is a sample group description.",
    members: 10,
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Group Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>{group.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4"><strong>ID:</strong> {group.id}</p>
          <p className="mb-4"><strong>Description:</strong> {group.description}</p>
          <p className="mb-4"><strong>Members:</strong> {group.members}</p>
          <div className="flex space-x-4">
            <Button>Edit Group</Button>
            <Button variant="destructive">Delete Group</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

