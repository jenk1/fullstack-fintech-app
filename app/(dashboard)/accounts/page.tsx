'use client';

import {useNewAccount} from "@/features/accounts/hooks/use-new-account";

import {
    Card,
    CardContent,
    CardTitle,
    CardHeader
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {columns, Payment} from "@/app/(dashboard)/accounts/columns";
import {DataTable} from "@/components/data-table";

const data: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "7283d52g",
        amount: 200,
        status: "success",
        email: "n@gmail.com"
    }
    // ...
];
const AccountsPage = () => {

    const newAccount = useNewAccount();

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Accounts Page
                    </CardTitle>
                    <Button onClick={newAccount.onOpen} size="sm">
                        <Plus className="size-4 mr-2">
                            Add new
                        </Plus>
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={data} filterKey='email'/>
                </CardContent>
            </Card>
        </div>
    )
}

export default AccountsPage;