"use client";

import React from "react";
import Link from "next/link";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "../../../../convex/_generated/api";
import { PlusCircle, ChevronRight, Users, TrendingUp, TrendingDown, Wallet } from "lucide-react";

// Assuming you have these UI components in your project
// If not, standard HTML/Tailwind divs work too
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Importing sub-components
import { ExpenseSummary } from "./_components/expense-summary";
import { BalanceSummary } from "../dashboard/_components/balance-summary";
import { GroupList } from "./_components/group-list";

const DashboardPage = () => {
   const { data: balances, isLoading: balanceLoading } = useConvexQuery(
    api.dashboard.getUserBalances
  );

  const { data: groups, isLoading: groupsLoading } = useConvexQuery(
    api.dashboard.getUserGroups
  );
   const { data: totalSpent, isLoading: totalSpentLoading } = useConvexQuery(
    api.dashboard.getTotalSpent
  );

  const { data: monthlySpending, isLoading: monthlySpendingLoading } =
    useConvexQuery(api.dashboard.getMonthlySpending);

  // These were referenced in your original code but not defined.
  // Setting defaults here to prevent the app from crashing.


  const isLoading = balanceLoading || groupsLoading || totalSpentLoading || monthlySpendingLoading;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // Helper to format currency cleanly (handling negative signs manually for better UI control)
  const formatMoney = (amount) => {
    return Math.abs(amount || 0).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  return (
    <div className="container max-w-7xl mx-auto py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight gradient-title">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Overview of your shared expenses and balances.
          </p>
        </div>
        <Button asChild size="lg" className="shadow-sm">
          <Link href="/expenses/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Expense
          </Link>
        </Button>
      </div>

      {/* Balance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Balance */}
        <Card className="transition-all hover:shadow-md border-l-4 border-l-primary/20">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {balances?.totalBalance > 0 ? (
                <span className="text-emerald-600 flex items-center">
                  +{formatMoney(balances?.totalBalance)}
                </span>
              ) : balances?.totalBalance < 0 ? (
                <span className="text-rose-600 flex items-center">
                  -{formatMoney(balances?.totalBalance)}
                </span>
              ) : (
                <span className="text-foreground">$0.00</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {balances?.totalBalance > 0
                ? "You are owed in total"
                : balances?.totalBalance < 0
                  ? "You owe in total"
                  : "All settled up!"}
            </p>
          </CardContent>
        </Card>

        {/* You Are Owed */}
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              You are owed
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {formatMoney(balances?.youAreOwed)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              From {balances?.oweDetails?.youAreOwedBy?.length || 0} people
            </p>
          </CardContent>
        </Card>

        {/* You Owe */}
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              You owe
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">
              {formatMoney(balances?.youOwe)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              To {balances?.oweDetails?.youOwe?.length || 0} people
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Spending Charts */}
        <div className="lg:col-span-2 space-y-6">
          <ExpenseSummary
            monthlySpending={monthlySpending}
            totalSpent={totalSpent}
          />
        </div>

        {/* Right Column: Lists */}
        <div className="space-y-6">
          
          {/* Balance Details */}
          <Card className="h-fit">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Balance Details</CardTitle>
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                <Link href="/contacts">
                  View all <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <BalanceSummary balances={balances} />
            </CardContent>
          </Card>

          {/* Groups List */}
          <Card className="h-fit">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Your Groups</CardTitle>
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                <Link href="/groups">
                  View all <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="pb-2">
              <GroupList groups={groups} />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-dashed" asChild>
                <Link href="/contacts?createGroup=true">
                  <Users className="mr-2 h-4 w-4" />
                  Create new group
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

// A clean Skeleton Loader component to prevent layout shifts
const DashboardSkeleton = () => {
  return (
    <div className="container max-w-7xl mx-auto py-8 space-y-8">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center pb-6 border-b">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="h-[400px] rounded-xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-[200px] rounded-xl" />
          <Skeleton className="h-[200px] rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;