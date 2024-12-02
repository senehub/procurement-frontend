import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PageLayout from '@/components/page-layout'
import PageContent from '@/components/page-content'

export default function SuppliersPage() {
  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-6">Suppliers</h1>
      <PageContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Manage supplier certificates</p>
            <Link href="/suppliers/certificates">
              <Button>View Certificates</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Manage supplier registrations</p>
            <Link href="/suppliers/registrations">
              <Button>View Registrations</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contact Persons</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Manage supplier contact persons</p>
            <Link href="/suppliers/contact_persons">
              <Button>View Contact Persons</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      </PageContent>
    </PageLayout>
  )
}

