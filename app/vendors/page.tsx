import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PageLayout from '@/components/page-layout'

export default function VendorsPage() {
  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-6">Vendors</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Manage vendor invoices</p>
            <Link href="/vendors/invoices">
              <Button>View Invoices</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Manage vendor contracts</p>
            <Link href="/vendors/contracts">
              <Button>View Contracts</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Procurement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Manage procurement activities</p>
            <Link href="/vendors/procurement">
              <Button>View Procurement</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}

