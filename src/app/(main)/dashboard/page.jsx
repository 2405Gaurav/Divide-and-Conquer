"use client";

import React from "react";
import Link from "next/link";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "../../../../convex/_generated/api";
import { motion } from "framer-motion"; // 1. Import motion
import { 
  PlusCircle, 
  ChevronRight, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Wallet,
  ArrowRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { ExpenseSummary } from "./_components/expense-summary";
import { BalanceSummary } from "../dashboard/_components/balance-summary";
import { GroupList } from "./_components/group-list";

const DashboardPage = () => {
  const { data: balances, isLoading: balanceLoading } = useConvexQuery(api.dashboard.getUserBalances);
  const { data: groups, isLoading: groupsLoading } = useConvexQuery(api.dashboard.getUserGroups);
  const { data: totalSpent, isLoading: totalSpentLoading } = useConvexQuery(api.dashboard.getTotalSpent);
  const { data: monthlySpending, isLoading: monthlySpendingLoading } = useConvexQuery(api.dashboard.getMonthlySpending);

  const isLoading = balanceLoading || groupsLoading || totalSpentLoading || monthlySpendingLoading;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const formatMoney = (amount) => {
    return Math.abs(amount || 0).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  // 2. Define Animation Variants
  // This controls the orchestration (staggering)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Delay between each item loading
      }
    }
  };

  // This controls how each individual section appears (fade up)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 3. Wrap main container in motion.div */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-10"
      >
        
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Your financial overview at a glance.
            </p>
          </div>
          <Button asChild size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-black text-white px-8">
            <Link href="/expenses/new">
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Expense
            </Link>
          </Button>
        </motion.div>

        {/* Balance Overview Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Balance */}
          <Card className="border-none shadow-md ring-1 ring-black/5 relative overflow-hidden bg-white group hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Wallet className="w-24 h-24 text-primary" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Wallet className="h-4 w-4 text-primary" />
                </div>
                Total Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">
                {balances?.totalBalance > 0 ? (
                  <span className="text-emerald-600 flex items-center">
                    +{formatMoney(balances?.totalBalance)}
                  </span>
                ) : balances?.totalBalance < 0 ? (
                  <span className="text-rose-600 flex items-center">
                    -{formatMoney(balances?.totalBalance)}
                  </span>
                ) : (
                  <span className="text-gray-900">$0.00</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2 font-medium">
                {balances?.totalBalance > 0
                  ? "Overall, you are owed money."
                  : balances?.totalBalance < 0
                    ? "Overall, you owe money."
                    : "All debts are settled."}
              </p>
            </CardContent>
          </Card>

          {/* You Are Owed */}
          <Card className="border-none shadow-sm ring-1 ring-black/5 bg-white hover:bg-gray-50/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                </div>
                You are owed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600 tracking-tight">
                {formatMoney(balances?.youAreOwed)}
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <Users className="mr-1.5 h-3.5 w-3.5" />
                <span>from {balances?.oweDetails?.youAreOwedBy?.length || 0} people</span>
              </div>
            </CardContent>
          </Card>

          {/* You Owe */}
          <Card className="border-none shadow-sm ring-1 ring-black/5 bg-white hover:bg-gray-50/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <div className="p-2 bg-rose-100 rounded-full">
                  <TrendingDown className="h-4 w-4 text-rose-600" />
                </div>
                You owe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-rose-600 tracking-tight">
                {formatMoney(balances?.youOwe)}
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <Users className="mr-1.5 h-3.5 w-3.5" />
                <span>to {balances?.oweDetails?.youOwe?.length || 0} people</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-6">
            <Card className="border-none shadow-sm ring-1 ring-black/5 h-full">
               <CardHeader>
                 <CardTitle>Spending Analysis</CardTitle>
               </CardHeader>
               <CardContent>
                 <ExpenseSummary
                    monthlySpending={monthlySpending}
                    totalSpent={totalSpent}
                 />
               </CardContent>
            </Card>
          </motion.div>

          {/* Right Column */}
          <motion.div variants={itemVariants} className="space-y-8">
            
            {/* Balance Details */}
            <Card className="border-none shadow-sm ring-1 ring-black/5">
              <CardHeader className="pb-4 flex flex-row items-center justify-between border-b border-gray-100">
                <CardTitle className="text-base font-semibold">Detailed Balances</CardTitle>
                <Link href="/contacts" className="text-sm text-muted-foreground hover:text-primary flex items-center transition-colors">
                  View all <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardHeader>
              <CardContent className="pt-4">
                <BalanceSummary balances={balances} />
              </CardContent>
            </Card>

            {/* Groups List */}
            <Card className="border-none shadow-sm ring-1 ring-black/5">
              <CardHeader className="pb-4 flex flex-row items-center justify-between border-b border-gray-100">
                <CardTitle className="text-base font-semibold">Your Groups</CardTitle>
                <Link href="/group" className="text-sm text-muted-foreground hover:text-primary flex items-center transition-colors">
                  View all <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardHeader>
              <CardContent className="pt-4">
                <GroupList groups={groups} />
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="ghost" className="w-full text-muted-foreground hover:text-primary border border-dashed border-gray-200" asChild>
                  <Link href="/contacts?createGroup=true">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Group
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6 space-y-10">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-125 rounded-xl" />
          </div>
          <div className="space-y-8">
            <Skeleton className="h-62.5 rounded-xl" />
            <Skeleton className="h-62.5 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;