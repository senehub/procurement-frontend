import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PageLayout from '@/components/page-layout'
import PageContent from '@/components/page-content'

export default function AuthManagerPage() {
  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-6">Auth Manager</h1>
      <PageContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Manage user groups and permissions</p>
              <Link href="/auth-manager/groups">
                <Button>View Groups</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Manage user accounts and access</p>
              <Link href="/auth-manager/users">
                <Button>View Users</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">View authentication and authorization logs</p>
              <Link href="/auth-manager/logs">
                <Button>View Logs</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </PageLayout>
  )
}

